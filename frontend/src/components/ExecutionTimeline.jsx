import { Activity, Brain, Wrench, Terminal, AlertTriangle, Clock, RefreshCw, AlertOctagon, Bookmark } from 'lucide-react';

export default function ExecutionTimeline({
  traces = [],
  conflictFlag = null,
  onSimulateRetry,
  liveEngine = true,
}) {
  return (
    <div className="bg-[#111827]/85 border border-white/[0.08] hover:border-white/[0.12] rounded-2xl p-5 shadow-2xl backdrop-blur-xl transition-all space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-cyan-400" />
          <h3 className="text-sm font-semibold text-slate-100">Live Research Trace & Citations</h3>
          {liveEngine && (
            <span className="text-[10px] uppercase font-mono text-cyan-300 bg-cyan-950/70 border border-cyan-700/70 px-2 py-0.5 rounded-full">
              Live Tool Execution
            </span>
          )}
        </div>
        <span className="text-[11px] font-mono text-slate-400">
          {traces.length} investigative events recorded
        </span>
      </div>

      {/* Dedicated Conflicting Information Alert Box */}
      {conflictFlag && (
        <div className="p-4 rounded-xl bg-amber-950/35 border-2 border-amber-500/80 text-amber-200 text-xs shadow-xl animate-in fade-in duration-200">
          <div className="flex items-center gap-2 mb-2">
            <AlertOctagon className="w-4 h-4 text-amber-400" />
            <h4 className="font-bold text-amber-300 text-sm">
              Conflicting Information Detected Across Sources
            </h4>
          </div>
          <p className="text-amber-200/90 leading-relaxed mb-3">
            {conflictFlag.description || 'Contradictory empirical data was identified between verified primary sources. Agent initiated comparative cross-validation.'}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] font-mono">
            <div className="p-2.5 rounded-lg bg-amber-950/70 border border-amber-600/70">
              <span className="font-bold text-amber-300 block mb-1">Source A ({conflictFlag.sourceA?.name || 'ArXiv Paper'}):</span>
              <p className="text-amber-100 italic">"{conflictFlag.sourceA?.claim}"</p>
            </div>
            <div className="p-2.5 rounded-lg bg-amber-950/70 border border-amber-600/70">
              <span className="font-bold text-amber-300 block mb-1">Source B ({conflictFlag.sourceB?.name || 'Industry Report'}):</span>
              <p className="text-amber-100 italic">"{conflictFlag.sourceB?.claim}"</p>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-amber-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px]">
            <span className="text-amber-300/80">Reconciliation Strategy: {conflictFlag.resolutionStrategy || 'Highlighting divergence in Key Findings for operator evaluation'}</span>
            <span className="px-2.5 py-0.5 rounded bg-amber-900/80 text-amber-300 font-bold uppercase text-[10px] self-start sm:self-auto border border-amber-600/80">
              Flagged for Report
            </span>
          </div>
        </div>
      )}

      {/* Traces Timeline Feed */}
      {traces.length === 0 ? (
        <div className="py-10 text-center text-xs text-slate-500 border border-dashed border-white/[0.08] rounded-xl bg-[#090D16]/50">
          Execution trace is idle. Launch research agent to stream live retrieval, citations, and observations.
        </div>
      ) : (
        <div className="space-y-4 max-h-[540px] overflow-y-auto pr-1">
          {traces.map((trace, idx) => (
            <div key={trace.id || idx} className="relative pl-6 border-l border-white/[0.1] pb-2">
              {/* Timeline Indicator */}
              <div className="absolute -left-[13px] top-1 p-1 rounded-full bg-[#090D16] border border-white/[0.15] shadow-md">
                {trace.type === 'thought' && <Brain className="w-3.5 h-3.5 text-violet-400" />}
                {trace.type === 'tool_call' && <Wrench className="w-3.5 h-3.5 text-cyan-400" />}
                {trace.type === 'observation' && <Terminal className="w-3.5 h-3.5 text-emerald-400" />}
                {trace.type === 'error' && <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />}
              </div>

              {/* Timestamp & Type Header */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                <span className="font-semibold uppercase tracking-wider text-slate-300">
                  {trace.type.replace('_', ' ')}
                </span>
                <span className="font-mono flex items-center gap-1 text-slate-400">
                  <Clock className="w-3 h-3" />
                  {trace.timestamp || '00:00:00'}
                </span>
              </div>

              {/* 1. Thought / Reasoning Card (Violet) */}
              {trace.type === 'thought' && (
                <div className="p-3.5 rounded-xl bg-violet-950/25 border border-violet-800/50 text-violet-200 text-xs leading-relaxed shadow-sm">
                  <span className="font-semibold block text-[11px] text-violet-300 mb-0.5">
                    Sub-Question Strategy & Formulation:
                  </span>
                  <p className="italic">"{trace.content}"</p>
                </div>
              )}

              {/* 2. Tool Call Card */}
              {trace.type === 'tool_call' && (
                <div className="rounded-xl border border-white/[0.08] bg-[#090D16]/90 overflow-hidden text-xs font-mono shadow-md">
                  <div className="flex items-center justify-between px-3.5 py-2 bg-[#161F33] border-b border-white/[0.06]">
                    <span className="font-bold text-cyan-300 flex items-center gap-1.5">
                      <Wrench className="w-3.5 h-3.5 text-cyan-400" />
                      Tool: {trace.toolName}
                    </span>
                    <div className="flex items-center gap-2">
                      {trace.sourceType && (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950/90 text-cyan-300 border border-cyan-800/80">
                          {trace.sourceType}
                        </span>
                      )}
                      <span className="text-[10px] px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                        INVOKED
                      </span>
                    </div>
                  </div>
                  <div className="p-3">
                    <span className="text-[10px] font-sans font-semibold uppercase text-slate-400 block mb-1">
                      Query & Input Parameters:
                    </span>
                    <pre className="bg-[#111827] border border-white/[0.06] p-2.5 rounded-lg text-slate-300 overflow-x-auto text-[11px]">
                      {JSON.stringify(trace.params || {}, null, 2)}
                    </pre>
                  </div>
                </div>
              )}

              {/* 3. Observation & Citations Card */}
              {trace.type === 'observation' && (
                <div className="rounded-xl border border-white/[0.08] bg-[#090D16]/90 overflow-hidden text-xs font-mono shadow-md">
                  <div className="flex items-center justify-between px-3.5 py-2 bg-[#161F33] border-b border-white/[0.06]">
                    <span className="font-bold text-emerald-300 flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                      Observation from {trace.source || 'Knowledge Base'}
                    </span>
                    {trace.latencyMs && (
                      <span className="text-[10px] text-slate-400 font-mono">
                        {trace.latencyMs}ms
                      </span>
                    )}
                  </div>
                  <div className="p-3.5 space-y-2.5">
                    <p className="font-sans text-xs text-slate-200 leading-relaxed font-normal">
                      {trace.summary || 'Retrieved verified literature evidence.'}
                    </p>

                    {/* Source Citations Badges */}
                    {trace.citations && trace.citations.length > 0 && (
                      <div className="pt-2 border-t border-white/[0.06]">
                        <span className="text-[10px] font-sans font-semibold uppercase text-slate-400 block mb-1.5 flex items-center gap-1">
                          <Bookmark className="w-3 h-3 text-cyan-400" />
                          <span>Extracted Source Citations:</span>
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {trace.citations.map((cite, cIdx) => (
                            <span
                              key={cIdx}
                              className="inline-flex items-center gap-1 text-[10px] font-mono bg-cyan-950/70 border border-cyan-700/80 text-cyan-300 px-2.5 py-0.5 rounded-md shadow-sm"
                              title={cite.title || cite.url}
                            >
                              <span>[{cite.id || cIdx + 1}] {cite.label}</span>
                              {cite.year && <span className="text-slate-400 font-sans">({cite.year})</span>}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 4. Error / Fallback Card (Rose) */}
              {trace.type === 'error' && (
                <div className="p-3.5 rounded-xl bg-rose-950/35 border border-rose-700/80 text-rose-200 text-xs shadow-md">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-rose-300 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-rose-400" />
                      Source Retrieval Timeout / Paywall Block
                    </span>
                    {onSimulateRetry && (
                      <button
                        type="button"
                        onClick={onSimulateRetry}
                        className="flex items-center gap-1 px-3 py-1 rounded bg-rose-900/90 hover:bg-rose-800 text-rose-100 border border-rose-600 font-sans font-semibold text-[11px] transition-colors shadow-sm"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Simulate Secondary Mirror Retry</span>
                      </button>
                    )}
                  </div>
                  <p className="text-[11px] leading-relaxed text-rose-200/90 mb-1">
                    {trace.content || 'Target repository connection exceeded timeout threshold (3000ms).'}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
