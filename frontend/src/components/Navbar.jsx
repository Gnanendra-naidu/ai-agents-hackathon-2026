import { BookOpen, RotateCcw, Server, Cpu } from 'lucide-react';

export default function Navbar({
  agentStatus = 'idle',
  backendStatus = { online: false, persistenceMode: 'memory', geminiConfigured: false, activeModel: 'gemini-3.8-flash' },
  onResetWorkspace,
}) {
  const statusStyles = {
    idle: { label: 'Standby / Ready', badge: 'bg-slate-900/90 text-slate-300 border-slate-700/80', dot: 'bg-slate-400' },
    decomposing: { label: 'Decomposing Sub-Questions', badge: 'bg-violet-950/70 text-violet-300 border-violet-700', dot: 'bg-violet-400 animate-pulse' },
    searching: { label: 'Querying Knowledge Sources', badge: 'bg-cyan-950/80 text-cyan-300 border-cyan-600', dot: 'bg-cyan-400 animate-ping' },
    conflict_detected: { label: 'Conflicting Claims Detected', badge: 'bg-amber-950/80 text-amber-300 border-amber-500', dot: 'bg-amber-400 animate-bounce' },
    awaiting_approval: { label: 'Awaiting Publishing Approval', badge: 'bg-orange-950/80 text-orange-300 border-orange-500', dot: 'bg-orange-400 animate-bounce' },
    completed: { label: 'Research Report Synthesized', badge: 'bg-emerald-950/80 text-emerald-300 border-emerald-600', dot: 'bg-emerald-400' },
    error: { label: 'Source Retrieval Error', badge: 'bg-rose-950/80 text-rose-300 border-rose-600', dot: 'bg-rose-400' },
  }[agentStatus] || { label: 'Standby', badge: 'bg-slate-900 text-slate-300 border-slate-700', dot: 'bg-slate-400' };

  return (
    <header className="sticky top-0 z-40 bg-[#090D16]/90 backdrop-blur-xl border-b border-white/[0.08] anim-slide-down">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand & Theme Badge */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-teal-600 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 ring-1 ring-white/20 transition-transform hover:scale-105 duration-200">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-base font-bold tracking-tight text-white flex items-center gap-1.5">
                AgentFlow <span className="text-cyan-400 font-medium">Studio</span>
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-950/90 text-cyan-300 border border-cyan-700/80 shadow-sm shadow-cyan-950/50">
                Theme 4: Research & Knowledge Agent
              </span>

              {/* Live Backend Connection Indicator */}
              <span
                className={`inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                  backendStatus.online
                    ? 'bg-emerald-950/70 text-emerald-300 border-emerald-700/80'
                    : 'bg-amber-950/60 text-amber-300 border-amber-700/70'
                }`}
                title={`Backend URL: ${import.meta.env.VITE_API_URL || 'http://localhost:5000'}`}
              >
                <Server className="w-3 h-3" />
                <span>{backendStatus.online ? 'Backend Online' : 'Backend Standby (Local)'}</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">Deep Multi-Source Synthesis, Citation Tracking & Conflict Resolution</p>
          </div>
        </div>

        {/* Right Status & Reset Action */}
        <div className="flex items-center gap-3">
          {backendStatus.online && (
            <div className="hidden lg:flex items-center gap-2 text-[11px] font-mono text-slate-400 bg-[#111827] px-2.5 py-1 rounded-lg border border-white/[0.06]">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>Storage: <strong className="text-slate-200 capitalize">{backendStatus.persistenceMode}</strong></span>
            </div>
          )}

          <div className={`hidden sm:flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border shadow-sm ${statusStyles.badge}`}>
            <span className={`w-2 h-2 rounded-full ${statusStyles.dot} anim-radar`} />
            <span className="tracking-wide">{statusStyles.label}</span>
          </div>

          <button
            type="button"
            onClick={onResetWorkspace}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#111827] hover:bg-[#161F33] text-slate-300 hover:text-white border border-white/[0.08] hover:border-cyan-500/40 transition-all active:scale-95 shadow-sm"
            title="Reset research session and clear state"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Session</span>
          </button>
        </div>
      </div>
    </header>
  );
}
