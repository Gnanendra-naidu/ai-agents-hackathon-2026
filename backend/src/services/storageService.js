import { createClient } from '@supabase/supabase-js';
import { config } from '../config/env.js';

// In-memory fallback stores
const memorySessions = new Map();
const memoryTraces = new Map();

let supabaseClient = null;
if (config.isSupabaseConfigured) {
  try {
    supabaseClient = createClient(config.supabaseUrl, config.supabaseKey);
  } catch (err) {
    supabaseClient = null;
  }
}

export const storageService = {
  getPersistenceMode() {
    return supabaseClient ? 'supabase' : 'memory';
  },

  async saveSession(session) {
    const mode = this.getPersistenceMode();
    const normalized = {
      ...session,
      updated_at: new Date().toISOString(),
    };

    if (mode === 'supabase') {
      try {
        const { error } = await supabaseClient.from('research_sessions').upsert({
          id: normalized.id,
          question: normalized.question,
          audience: normalized.audience,
          status: normalized.status,
          enabled_sources: normalized.enabledSources,
          sub_questions: normalized.subQuestions,
          conflict_flag: normalized.conflictFlag,
          pending_approval: normalized.pendingApproval,
          approval_status: normalized.approvalStatus || 'none',
          approval_notes: normalized.approvalNotes || null,
          report: normalized.report,
          metrics: normalized.metrics,
          updated_at: normalized.updated_at,
        });

        if (!error) return normalized;
      } catch (err) {
        // Fall back to memory on failure
      }
    }

    memorySessions.set(normalized.id, normalized);
    return normalized;
  },

  async getSession(sessionId) {
    const mode = this.getPersistenceMode();

    if (mode === 'supabase') {
      try {
        const { data, error } = await supabaseClient
          .from('research_sessions')
          .select('*')
          .eq('id', sessionId)
          .single();

        if (!error && data) {
          const traces = await this.getTraces(sessionId);
          return {
            id: data.id,
            question: data.question,
            audience: data.audience,
            status: data.status,
            enabledSources: data.enabled_sources,
            subQuestions: data.sub_questions,
            conflictFlag: data.conflict_flag,
            pendingApproval: data.pending_approval,
            approvalStatus: data.approval_status,
            approvalNotes: data.approval_notes,
            report: data.report,
            metrics: data.metrics,
            traces,
            persistenceMode: 'supabase',
          };
        }
      } catch {
        // Fall back to memory
      }
    }

    const session = memorySessions.get(sessionId);
    if (!session) return null;

    const traces = memoryTraces.get(sessionId) || [];
    return {
      ...session,
      traces,
      persistenceMode: 'memory',
    };
  },

  async saveTraces(sessionId, traces) {
    const mode = this.getPersistenceMode();
    memoryTraces.set(sessionId, traces);

    if (mode === 'supabase') {
      try {
        const rows = traces.map((t, idx) => ({
          id: t.id || `tr-${sessionId}-${idx + 1}`,
          session_id: sessionId,
          step_number: idx + 1,
          trace_type: t.type,
          content: t.content || null,
          tool_name: t.toolName || null,
          tool_input: t.params || null,
          observation: t.observation || null,
          duration_ms: t.latencyMs || null,
          citations: t.citations || [],
        }));

        await supabaseClient.from('agent_traces').upsert(rows);
      } catch {
        // Continue with memory store
      }
    }

    return traces;
  },

  async getTraces(sessionId) {
    const mode = this.getPersistenceMode();

    if (mode === 'supabase') {
      try {
        const { data, error } = await supabaseClient
          .from('agent_traces')
          .select('*')
          .eq('session_id', sessionId)
          .order('step_number', { ascending: true });

        if (!error && data && data.length > 0) {
          return data.map((d) => ({
            id: d.id,
            type: d.trace_type,
            content: d.content,
            toolName: d.tool_name,
            params: d.tool_input,
            observation: d.observation,
            latencyMs: d.duration_ms,
            citations: d.citations,
            timestamp: new Date(d.created_at).toLocaleTimeString(),
          }));
        }
      } catch {
        // Fall back
      }
    }

    return memoryTraces.get(sessionId) || [];
  },

  async updateApproval(sessionId, { decision, notes }) {
    const session = await this.getSession(sessionId);
    if (!session) return null;

    const updated = {
      ...session,
      approvalStatus: decision === 'approve' ? 'approved' : 'rejected',
      approvalNotes: notes || '',
      pendingApproval: null,
      status: decision === 'approve' ? 'completed' : 'rejected_halted',
    };

    return await this.saveSession(updated);
  },
};
