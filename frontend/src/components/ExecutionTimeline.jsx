import { Activity, Brain, Wrench, Terminal, AlertTriangle, Clock, RefreshCw, AlertOctagon, Bookmark } from 'lucide-react';

export default function ExecutionTimeline({
  traces = [],
  conflictFlag = null,
  onSimulateRetry,
  liveEngine = true,
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-md transition-all space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-cyan-600" />
          <h3 className="text-sm font-semibold text-slate-900">Live Research Trace &amp; Citations</h3>
          {liveEngine && (
            <span className="text-[10px] uppercase font-mono text-cyan-800 bg-cyan-50 border border-cyan-200 px-2 py-0.5 rounded-full font-semibold">
              Live Tool Execution
            </span>
          )}
        </div>
        <span className="text-[11px] font-mono text-slate-500">
          {traces.length} investigative events recorded
        </span>
      </div>

      {/* Dedicated Conflicting Information Alert Box */}
      {conflictFlag && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs shadow-xs animate-in fade-in duration-200">
          <div className="flex items-center gap-2 mb-2">
            <AlertOctagon className="w-4 h-4 text-amber-600" />
            <h4 className="font-bold text-amber-900 text-sm">
              Conflicting Information Detected Across Sources
            </h4>
          </div>
          <p className="text-amber-800 leading-relaxed mb-3">
            {conflictFlag.description || 'Contradictory empirical data was identified between verified primary sources. Agent initiated comparative cross-validation.'}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] font-mono">
            <div className="p-2.5 rounded-lg bg-white border border-amber-200 shadow-2xs">
              <span className="font-bold text-amber-900 block mb-1">Source A ({conflictFlag.sourceA?.name || 'ArXiv Paper'}):</span>
              <p className="text-amber-900 italic">"{conflictFlag.sourceA?.claim}"</p>
            </div>
            <div className="p-2.5 rounded-lg bg-white border border-amber-200 shadow-2xs">
              <span className="font-bold text-amber-900 block mb-1">Source B ({conflictFlag.sourceB?.name || 'Industry Report'}):</span>
              <p className="text-amber-900 italic">"{conflictFlag.sourceB?.claim}"</p>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px]">
            <span className="text-amber-800">Reconciliation Strategy: {conflictFlag.resolutionStrategy || 'Highlighting divergence in Key Findings for operator evaluation'}</span>
            <span className="px-2.5 py-0.5 rounded bg-amber-100 text-amber-900 font-bold uppercase text-[10px] self-start sm:self-auto border border-amber-300">
              Flagged for Report
            </span>
          </div>
        </div>
      )}

      {/* Traces Timeline Feed */}
      {traces.length === 0 ? (
        <div className="py-10 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl bg-slate-50">
          Execution trace is idle. Launch research agent to stream live retrieval, citations, and observations.
        </div>
      ) : (
        <div className="space-y-4 max-h-[540px] overflow-y-auto pr-1">
          {traces.map((trace, idx) => (
            <div key={trace.id || idx} className="relative pl-6 border-l border-slate-200 pb-2">
              {/* Timeline Indicator */}
              <div className="absolute -left-[13px] top-1 p-1 rounded-full bg-white border border-slate-300 shadow-xs">
                {trace.type === 'thought' && <Brain className="w-3.5 h-3.5 text-violet-600" />}
                {trace.type === 'tool_call' && <Wrench className="w-3.5 h-3.5 text-cyan-600" />}
                {trace.type === 'observation' && <Terminal className="w-3.5 h-3.5 text-emerald-600" />}
                {trace.type === 'error' && <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />}
              </div>

              {/* Timestamp & Type Header */}
              <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                <span className="font-semibold uppercase tracking-wider text-slate-700">
                  {trace.type.replace('_', ' ')}
                </span>
                <span className="font-mono flex items-center gap-1 text-slate-400">
                  <Clock className="w-3 h-3" />
                  {trace.timestamp || '00:00:00'}
                </span>
              </div>

              {/* 1. Thought / Reasoning Card (Violet) */}
              {trace.type === 'thought' && (
                <div className="p-3.5 rounded-xl bg-violet-50 border border-violet-200 text-violet-900 text-xs leading-relaxed shadow-2xs">
                  <span className="font-semibold block text-[11px] text-violet-800 mb-0.5">
                    Sub-Question Strategy &amp; Formulation:
                  </span>
                  <p className="italic">"{trace.content}"</p>
                </div>
              )}

              {/* 2. Tool Call Card */}
              {trace.type === 'tool_call' && (
                <div className="rounded-xl border border-slate-200 bg-white overflow-hidden text-xs font-mono shadow-xs">
                  <div className="flex items-center justify-between px-3.5 py-2 bg-slate-50 border-b border-slate-200">
                    <span className="font-bold text-slate-900 flex items-center gap-1.5">
                      <Wrench className="w-3.5 h-3.5 text-cyan-600" />
                      Tool: {trace.toolName}
                    </span>
                    <div className="flex items-center gap-2">
                      {trace.sourceType && (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-50 text-cyan-800 border border-cyan-200 font-semibold">
                          {trace.sourceType}
                        </span>
                      )}
                      <span className="text-[10px] px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 font-semibold">
                        INVOKED
                      </span>
                    </div>
                  </div>
                  <div className="p-3">
                    <span className="text-[10px] font-sans font-semibold uppercase text-slate-500 block mb-1">
                      Query &amp; Input Parameters:
                    </span>
                    <pre className="bg-slate-50 border border-slate-200 p-2.5 rounded-lg text-slate-800 overflow-x-auto text-[11px]">
                      {JSON.stringify(trace.params || {}, null, 2)}
                    </pre>
                  </div>
                </div>
              )}

              {/* 3. Observation & Citations Card */}
              {trace.type === 'observation' && (
                <div className="rounded-xl border border-slate-200 bg-white overflow-hidden text-xs font-mono shadow-xs">
                  <div className="flex items-center justify-between px-3.5 py-2 bg-slate-50 border-b border-slate-200">
                    <span className="font-bold text-emerald-800 flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-emerald-600" />
                      Observation from {trace.source || 'Knowledge Base'}
                    </span>
                    {trace.latencyMs && (
                      <span className="text-[10px] text-slate-500 font-mono">
                        {trace.latencyMs}ms
                      </span>
                    )}
                  </div>
                  <div className="p-3.5 space-y-2.5">
                    <p className="font-sans text-xs text-slate-800 leading-relaxed font-normal">
                      {trace.summary || 'Retrieved verified literature evidence.'}
                    </p>

                    {/* Source Citations Badges */}
                    {trace.citations && trace.citations.length > 0 && (
                      <div className="pt-2 border-t border-slate-100">
                        <span className="text-[10px] font-sans font-semibold uppercase text-slate-500 block mb-1.5 flex items-center gap-1">
                          <Bookmark className="w-3 h-3 text-cyan-600" />
                          <span>Extracted Source Citations:</span>
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {trace.citations.map((cite, cIdx) => (
                            <span
                              key={cIdx}
                              className="inline-flex items-center gap-1 text-[10px] font-mono bg-cyan-50 border border-cyan-200 text-cyan-800 px-2.5 py-0.5 rounded-md shadow-2xs font-semibold"
                              title={cite.title || cite.url}
                            >
                              <span>[{cite.id || cIdx + 1}] {cite.label}</span>
                              {cite.year && <span className="text-slate-500 font-sans font-normal">({cite.year})</span>}
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
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-rose-900 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                      Source Retrieval Timeout / Paywall Block
                    </span>
                    {onSimulateRetry && (
                      <button
                        type="button"
                        onClick={onSimulateRetry}
                        className="flex items-center gap-1 px-3 py-1 rounded bg-rose-600 hover:bg-rose-700 text-white font-sans font-semibold text-[11px] transition-colors shadow-2xs cursor-pointer"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Simulate Secondary Mirror Retry</span>
                      </button>
                    )}
                  </div>
                  <p className="text-[11px] leading-relaxed text-rose-800 mb-1">
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
