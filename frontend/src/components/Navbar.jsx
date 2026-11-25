import { Sparkles, RotateCcw, Cpu } from 'lucide-react';
import { getProfessionById } from '../constants/professions';

export default function Navbar({
  agentStatus = 'idle',
  backendStatus = { online: false },
  onResetWorkspace,
  onOpenArchitecture,
  selectedProfession = 'Students',
}) {
  const activeProf = getProfessionById(selectedProfession);

  const getStatusDisplay = () => {
    if (!backendStatus.online) {
      return {
        label: 'Offline',
        dot: 'bg-rose-500',
        badge: 'bg-rose-50 text-rose-700 border-rose-200',
      };
    }
    if (agentStatus === 'searching') {
      return {
        label: 'Researching...',
        dot: 'bg-cyan-500 animate-pulse',
        badge: 'bg-cyan-50 text-cyan-800 border-cyan-200',
      };
    }
    if (agentStatus === 'awaiting_approval') {
      return {
        label: 'Needs Approval',
        dot: 'bg-amber-500 animate-bounce',
        badge: 'bg-amber-50 text-amber-800 border-amber-200',
      };
    }
    return {
      label: 'Ready',
      dot: 'bg-emerald-500 shadow-sm shadow-emerald-500/50',
      badge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    };
  };

  const status = getStatusDisplay();

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 anim-slide-down transition-colors duration-300 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Brand & Plain-English Subtitle */}
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${activeProf.theme.accentGradient} flex items-center justify-center text-white shadow-md ring-1 ring-black/5 transition-all duration-300 hover:scale-105 flex-shrink-0`}
          >
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 leading-none">
              Agentic <span className={`${activeProf.theme.textAccent} font-semibold transition-colors duration-300`}>Mode-AI</span>
            </h1>
            <p className="text-xs text-slate-500 mt-1 font-normal">
              AI Research &amp; Fact-Checking Assistant
            </p>
          </div>
        </div>

        {/* Dynamic Role Badge in Header */}
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-300 ${activeProf.theme.badgeBg}`}
          >
            <span>{activeProf.icon}</span>
            <span>Mode: {activeProf.label}</span>
          </span>
        </div>

        {/* Center / Right Header Badges & Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Clickable Hybrid Architecture Badge */}
          <button
            type="button"
            onClick={onOpenArchitecture}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-violet-50 hover:bg-violet-100 text-violet-700 border border-violet-200 hover:border-violet-300 transition-all active:scale-95 shadow-xs group cursor-pointer"
            title="Click to view Custom Code vs AI Breakdown"
          >
            <Cpu className="w-3.5 h-3.5 text-violet-600 group-hover:scale-110 transition-transform" />
            <span className="hidden md:inline">Hybrid System:</span>
            <span>Deterministic + Gemini</span>
          </button>

          {/* Simple Clean Status Pill */}
          <div
            className={`hidden xs:inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full border shadow-xs ${status.badge}`}
          >
            <span className={`w-2 h-2 rounded-full ${status.dot}`} />
            <span>{status.label}</span>
          </div>

          {/* New Research Button */}
          <button
            type="button"
            onClick={onResetWorkspace}
            className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200 transition-all active:scale-95 shadow-xs cursor-pointer"
            title="Start a fresh research topic"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden md:inline">New Research</span>
          </button>
        </div>
      </div>
    </header>
  );
}
