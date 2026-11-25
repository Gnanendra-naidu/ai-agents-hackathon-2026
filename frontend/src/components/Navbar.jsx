import { Sparkles, RotateCcw, Cpu } from 'lucide-react';

export default function Navbar({
  agentStatus = 'idle',
  backendStatus = { online: false },
  onResetWorkspace,
  onOpenArchitecture,
}) {
  const getStatusDisplay = () => {
    if (!backendStatus.online) {
      return {
        label: 'Offline',
        dot: 'bg-rose-400',
        badge: 'bg-rose-950/60 text-rose-300 border-rose-800/60',
      };
    }
    if (agentStatus === 'searching') {
      return {
        label: 'Researching...',
        dot: 'bg-cyan-400 animate-pulse',
        badge: 'bg-cyan-950/70 text-cyan-300 border-cyan-700/70',
      };
    }
    if (agentStatus === 'awaiting_approval') {
      return {
        label: 'Needs Approval',
        dot: 'bg-amber-400 animate-bounce',
        badge: 'bg-amber-950/70 text-amber-300 border-amber-600/70',
      };
    }
    return {
      label: 'Ready',
      dot: 'bg-emerald-400 shadow-sm shadow-emerald-400/50',
      badge: 'bg-emerald-950/60 text-emerald-300 border-emerald-700/60',
    };
  };

  const status = getStatusDisplay();

  return (
    <header className="sticky top-0 z-40 bg-[#090D16]/90 backdrop-blur-xl border-b border-white/[0.08] anim-slide-down">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Brand & Plain-English Subtitle */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-teal-500 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 ring-1 ring-white/20 transition-transform hover:scale-105 duration-200 flex-shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold tracking-tight text-white leading-none">
              Agentic <span className="text-cyan-400 font-semibold">Mode-AI</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1 font-normal">
              AI Research &amp; Fact-Checking Assistant
            </p>
          </div>
        </div>

        {/* Center / Right Hybrid Architecture Badge & Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Clickable Hybrid Architecture Badge */}
          <button
            type="button"
            onClick={onOpenArchitecture}
            className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-violet-950/40 hover:bg-violet-900/50 text-violet-300 border border-violet-700/50 hover:border-violet-500/70 transition-all active:scale-95 shadow-sm group"
            title="Click to view Custom Code vs AI Breakdown"
          >
            <Cpu className="w-3.5 h-3.5 text-violet-400 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Hybrid System:</span>
            <span>Deterministic Retrieval + Gemini</span>
          </button>

          {/* Simple Clean Status Pill */}
          <div
            className={`hidden xs:inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full border shadow-sm ${status.badge}`}
          >
            <span className={`w-2 h-2 rounded-full ${status.dot}`} />
            <span>{status.label}</span>
          </div>

          {/* New Research Button */}
          <button
            type="button"
            onClick={onResetWorkspace}
            className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-xl bg-[#161F33] hover:bg-[#1E293B] text-slate-200 hover:text-white border border-white/[0.08] hover:border-cyan-500/30 transition-all active:scale-95 shadow-sm"
            title="Start a fresh research topic"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden md:inline">New Research</span>
          </button>
        </div>
      </div>
    </header>
  );
}
