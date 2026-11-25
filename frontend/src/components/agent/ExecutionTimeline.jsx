import { useState } from 'react';
import { Activity, Brain, ShieldAlert, Wrench, AlertCircle, Clock } from 'lucide-react';
import { TRACE_TYPE } from '../../utils/constants';
import ToolCallCard from './ToolCallCard';

export default function ExecutionTimeline({
  traces = [],
  className = '',
}) {
  const [filter, setFilter] = useState('all');

  const filteredTraces = traces.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'thoughts') return item.type === TRACE_TYPE.THOUGHT;
    if (filter === 'tools') return item.type === TRACE_TYPE.TOOL_CALL;
    if (filter === 'approvals') return item.type === TRACE_TYPE.APPROVAL;
    return true;
  });

  return (
    <div className={`bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg backdrop-blur-md flex flex-col ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-4 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-indigo-400" />
          <h3 className="text-sm font-semibold text-slate-100">Live Execution Trace</h3>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
            {traces.length} events
          </span>
        </div>

        <div className="flex items-center gap-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800 text-xs">
          {[
            { id: 'all', label: 'All' },
            { id: 'thoughts', label: 'Thoughts' },
            { id: 'tools', label: 'Tools' },
            { id: 'approvals', label: 'HITL' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                filter === tab.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4 overflow-y-auto max-h-[500px] pr-1">
        {filteredTraces.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-500">
            No execution events recorded yet.
          </div>
        ) : (
          filteredTraces.map((trace, idx) => {
            const isThought = trace.type === TRACE_TYPE.THOUGHT;
            const isTool = trace.type === TRACE_TYPE.TOOL_CALL;
            const isApproval = trace.type === TRACE_TYPE.APPROVAL;
            const isError = trace.type === TRACE_TYPE.ERROR;

            return (
              <div key={trace.id || idx} className="relative pl-6 border-l border-slate-800 pb-1">
                <div className="absolute -left-[13px] top-1 p-1 rounded-full bg-slate-900 border border-slate-700">
                  {isThought && <Brain className="w-3.5 h-3.5 text-purple-400" />}
                  {isTool && <Wrench className="w-3.5 h-3.5 text-blue-400" />}
                  {isApproval && <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />}
                  {isError && <AlertCircle className="w-3.5 h-3.5 text-rose-400" />}
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                  <span className="font-semibold uppercase tracking-wider text-slate-400">
                    {trace.type}
                  </span>
                  {trace.timestamp && (
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3" />
                      {trace.timestamp}
                    </span>
                  )}
                </div>

                {isThought && (
                  <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-900/40 text-purple-200/90 text-xs leading-relaxed">
                    <p className="italic">"{trace.content}"</p>
                  </div>
                )}

                {isTool && (
                  <ToolCallCard
                    toolName={trace.toolName}
                    args={trace.args}
                    result={trace.result}
                    error={trace.error}
                    executionTimeMs={trace.executionTimeMs}
                    riskLevel={trace.riskLevel}
                    requiresApproval={trace.requiresApproval}
                  />
                )}

                {isError && (
                  <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-900/60 text-rose-300 text-xs">
                    {trace.content || 'An execution step encountered an error.'}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
