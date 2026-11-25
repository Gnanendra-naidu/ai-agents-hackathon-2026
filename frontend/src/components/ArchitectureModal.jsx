import { X, Code2, Sparkles, Database, FileCheck, Layers, Cpu, Globe } from 'lucide-react';

export function SystemTransparencyCard() {
  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 text-xs font-sans shadow-md space-y-4">
      {/* Card Header */}
      <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
        <Layers className="w-5 h-5 text-cyan-600 flex-shrink-0" />
        <div>
          <h3 className="text-sm font-bold text-slate-900">
            System Transparency: Custom Code vs. AI Reasoning
          </h3>
          <p className="text-[11px] text-slate-500">
            How deterministic engineering guarantees factuality while Gemini provides synthesis
          </p>
        </div>
      </div>

      {/* Two-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Column 1: Custom Deterministic Engineering */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
            <div className="p-1.5 rounded-lg bg-cyan-50 text-cyan-700 border border-cyan-200">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-slate-900 block text-xs">
                Custom Deterministic Engineering
              </span>
              <span className="text-[10px] text-cyan-700 font-mono font-semibold">100% Human-Built Logic</span>
            </div>
          </div>

          <ul className="space-y-2.5 text-slate-700">
            <li className="flex items-start gap-2">
              <Globe className="w-3.5 h-3.5 text-cyan-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block font-medium">Multi-Source API Connectors:</strong>
                <span className="text-[11px] text-slate-500">
                  Direct HTTP clients for Crossref Academic Works API &amp; Wikipedia OpenSearch REST endpoints.
                </span>
              </div>
            </li>

            <li className="flex items-start gap-2">
              <Database className="w-3.5 h-3.5 text-cyan-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block font-medium">PostgreSQL &amp; Session Persistence:</strong>
                <span className="text-[11px] text-slate-500">
                  Supabase database storage with GIN full-text search indexes &amp; resilient in-memory fallback.
                </span>
              </div>
            </li>

            <li className="flex items-start gap-2">
              <FileCheck className="w-3.5 h-3.5 text-cyan-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block font-medium">Exact Citation Mapping &amp; Guardrails:</strong>
                <span className="text-[11px] text-slate-500">
                  Deterministic ID indexing (<code className="text-cyan-800 font-mono">[KB1]</code>, <code className="text-cyan-800 font-mono">[W1]</code>), deduplication &amp; contradiction detection.
                </span>
              </div>
            </li>

            <li className="flex items-start gap-2">
              <Layers className="w-3.5 h-3.5 text-cyan-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block font-medium">Full-Stack React UI &amp; Exporters:</strong>
                <span className="text-[11px] text-slate-500">
                  Clean light design, responsive state management, and instant Markdown package exporter.
                </span>
              </div>
            </li>
          </ul>
        </div>

        {/* Column 2: AI Reasoning Layer */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
            <div className="p-1.5 rounded-lg bg-violet-50 text-violet-700 border border-violet-200">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-slate-900 block text-xs">
                AI Reasoning Layer
              </span>
              <span className="text-[10px] text-violet-700 font-mono font-semibold">Google Gemini LLM</span>
            </div>
          </div>

          <ul className="space-y-2.5 text-slate-700">
            <li className="flex items-start gap-2">
              <Cpu className="w-3.5 h-3.5 text-violet-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block font-medium">Query Decomposition:</strong>
                <span className="text-[11px] text-slate-500">
                  Decomposing broad user questions into focused, targeted sub-questions for empirical investigation.
                </span>
              </div>
            </li>

            <li className="flex items-start gap-2">
              <Sparkles className="w-3.5 h-3.5 text-violet-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block font-medium">Cross-Source Synthesis &amp; Tone:</strong>
                <span className="text-[11px] text-slate-500">
                  Aggregating observations from multiple sources into a coherent synthesis matching the target audience.
                </span>
              </div>
            </li>

            <li className="flex items-start gap-2">
              <FileCheck className="w-3.5 h-3.5 text-violet-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block font-medium">Follow-Up Question Formulation:</strong>
                <span className="text-[11px] text-slate-500">
                  Identifying remaining open questions and proposing relevant next-step research inquiries.
                </span>
              </div>
            </li>

            <li className="flex items-start gap-2">
              <Code2 className="w-3.5 h-3.5 text-violet-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block font-medium">Context-Aware Summarization:</strong>
                <span className="text-[11px] text-slate-500">
                  Drafting executive-ready summaries grounded directly in verified citations without hallucination.
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function ArchitectureModal({ isOpen = false, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 sm:p-7 max-h-[90vh] overflow-y-auto space-y-5">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-violet-50 text-violet-700 border border-violet-200">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                System Architecture &amp; Engineering Transparency
              </h2>
              <p className="text-xs text-slate-500">
                Evaluating Human-Engineered Code vs. AI-Assisted Reasoning
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Breakdown Card */}
        <SystemTransparencyCard />

        {/* Modal Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Agentic Mode-AI • Theme 4: Research &amp; Knowledge Agent</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
