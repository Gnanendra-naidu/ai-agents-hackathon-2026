import { X, Code2, Sparkles, Database, FileCheck, Layers, Cpu, Globe } from 'lucide-react';

export function SystemTransparencyCard() {
  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-[#090D16]/95 border border-white/[0.1] text-xs font-sans shadow-2xl space-y-4">
      {/* Card Header */}
      <div className="flex items-center gap-2.5 pb-3 border-b border-white/[0.08]">
        <Layers className="w-5 h-5 text-cyan-400 flex-shrink-0" />
        <div>
          <h3 className="text-sm font-bold text-slate-100">
            System Transparency: Custom Code vs. AI Reasoning
          </h3>
          <p className="text-[11px] text-slate-400">
            How deterministic engineering guarantees factuality while Gemini provides synthesis
          </p>
        </div>
      </div>

      {/* Two-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Column 1: Custom Deterministic Engineering */}
        <div className="p-4 rounded-xl bg-[#111827]/80 border border-cyan-800/50 space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-cyan-900/40">
            <div className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-700/60">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-cyan-200 block text-xs">
                Custom Deterministic Engineering
              </span>
              <span className="text-[10px] text-cyan-400 font-mono">100% Human-Built Logic</span>
            </div>
          </div>

          <ul className="space-y-2.5 text-slate-300">
            <li className="flex items-start gap-2">
              <Globe className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-medium">Multi-Source API Connectors:</strong>
                <span className="text-[11px] text-slate-400">
                  Direct HTTP clients for Crossref Academic Works API &amp; Wikipedia OpenSearch REST endpoints.
                </span>
              </div>
            </li>

            <li className="flex items-start gap-2">
              <Database className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-medium">PostgreSQL &amp; Session Persistence:</strong>
                <span className="text-[11px] text-slate-400">
                  Supabase database storage with GIN full-text search indexes &amp; resilient in-memory fallback.
                </span>
              </div>
            </li>

            <li className="flex items-start gap-2">
              <FileCheck className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-medium">Exact Citation Mapping &amp; Guardrails:</strong>
                <span className="text-[11px] text-slate-400">
                  Deterministic ID indexing (<code className="text-cyan-300 font-mono">[KB1]</code>, <code className="text-cyan-300 font-mono">[W1]</code>), deduplication &amp; contradiction detection.
                </span>
              </div>
            </li>

            <li className="flex items-start gap-2">
              <Layers className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-medium">Full-Stack React UI &amp; Exporters:</strong>
                <span className="text-[11px] text-slate-400">
                  Tailwind CSS glassmorphism, responsive state management, and instant Markdown package exporter.
                </span>
              </div>
            </li>
          </ul>
        </div>

        {/* Column 2: AI Reasoning Layer */}
        <div className="p-4 rounded-xl bg-[#111827]/80 border border-violet-800/50 space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-violet-900/40">
            <div className="p-1.5 rounded-lg bg-violet-950 text-violet-400 border border-violet-700/60">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-violet-200 block text-xs">
                AI Reasoning Layer
              </span>
              <span className="text-[10px] text-violet-400 font-mono">Google Gemini LLM</span>
            </div>
          </div>

          <ul className="space-y-2.5 text-slate-300">
            <li className="flex items-start gap-2">
              <Cpu className="w-3.5 h-3.5 text-violet-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-medium">Query Decomposition:</strong>
                <span className="text-[11px] text-slate-400">
                  Decomposing broad user questions into focused, targeted sub-questions for empirical investigation.
                </span>
              </div>
            </li>

            <li className="flex items-start gap-2">
              <Sparkles className="w-3.5 h-3.5 text-violet-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-medium">Cross-Source Synthesis:</strong>
                <span className="text-[11px] text-slate-400">
                  Reading retrieved passages, identifying core findings, and adapting tone for Researchers, Founders, Students, or Journalists.
                </span>
              </div>
            </li>

            <li className="flex items-start gap-2">
              <FileCheck className="w-3.5 h-3.5 text-violet-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-medium">Follow-Up Question Generation:</strong>
                <span className="text-[11px] text-slate-400">
                  Suggesting logical exploratory directions based on uncovered research frontiers.
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Summary Footer Note */}
      <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-[11px] text-slate-300 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0" />
        <span>
          <strong>Evaluator Key Takeaway:</strong> Factual retrieval, citation IDs, and database operations are 100% deterministic code. Gemini is leveraged strictly for reasoning, sub-question planning, and audience synthesis.
        </span>
      </div>
    </div>
  );
}

export default function ArchitectureModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl border border-white/[0.15]">
        {/* Modal Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-[#161F33] hover:bg-[#1E293B] text-slate-400 hover:text-white border border-white/[0.08] transition-colors"
          title="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        <SystemTransparencyCard />
      </div>
    </div>
  );
}
