import { useState } from 'react';
import { Terminal, Copy, Check, ChevronDown, ChevronRight, Wrench, ShieldAlert, Cpu } from 'lucide-react';
import { RISK_LEVEL } from '../../utils/constants';

export default function ToolCallCard({
  toolName = 'unspecified_tool',
  args = {},
  result = null,
  error = null,
  executionTimeMs = null,
  riskLevel = RISK_LEVEL.LOW,
  requiresApproval = false,
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(JSON.stringify({ tool: toolName, args, result, error }, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const riskBadge = {
    [RISK_LEVEL.LOW]: 'bg-slate-800 text-slate-300 border-slate-700',
    [RISK_LEVEL.MEDIUM]: 'bg-amber-950/60 text-amber-300 border-amber-800',
    [RISK_LEVEL.HIGH]: 'bg-orange-950/60 text-orange-300 border-orange-800',
    [RISK_LEVEL.CRITICAL]: 'bg-rose-950/60 text-rose-300 border-rose-800',
  }[riskLevel] || 'bg-slate-800 text-slate-300 border-slate-700';

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/80 overflow-hidden shadow-md my-2">
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-900/90 border-b border-slate-800/80">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-left hover:opacity-80 transition-opacity"
        >
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronRight className="w-4 h-4 text-slate-400" />
          )}
          <Wrench className="w-3.5 h-3.5 text-indigo-400" />
          <span className="text-xs font-mono font-semibold text-slate-200">{toolName}</span>
        </button>

        <div className="flex items-center gap-2">
          {requiresApproval && (
            <span className="flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-amber-900/40 text-amber-300 border border-amber-700/60">
              <ShieldAlert className="w-3 h-3 text-amber-400" />
              HITL Guarded
            </span>
          )}

          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${riskBadge}`}>
            {riskLevel.toUpperCase()} RISK
          </span>

          {executionTimeMs !== null && (
            <span className="text-[10px] font-mono text-slate-500">
              {executionTimeMs}ms
            </span>
          )}

          <button
            type="button"
            onClick={handleCopy}
            className="p-1 text-slate-400 hover:text-slate-200 transition-colors"
            title="Copy tool payload"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="p-3.5 space-y-3 text-xs font-mono">
          <div>
            <div className="text-[11px] font-sans font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Cpu className="w-3 h-3 text-indigo-400" />
              Parameters (Input)
            </div>
            <pre className="bg-slate-900/90 border border-slate-800 rounded-lg p-2.5 text-slate-300 overflow-x-auto text-[11px] leading-relaxed">
              {JSON.stringify(args, null, 2)}
            </pre>
          </div>

          <div>
            <div className="text-[11px] font-sans font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Terminal className="w-3 h-3 text-emerald-400" />
              Observation (Output)
            </div>
            {error ? (
              <pre className="bg-rose-950/30 border border-rose-900/60 rounded-lg p-2.5 text-rose-300 overflow-x-auto text-[11px] leading-relaxed">
                {typeof error === 'string' ? error : JSON.stringify(error, null, 2)}
              </pre>
            ) : result !== null ? (
              <pre className="bg-slate-900/90 border border-slate-800 rounded-lg p-2.5 text-emerald-300/90 overflow-x-auto text-[11px] leading-relaxed">
                {typeof result === 'string' ? result : JSON.stringify(result, null, 2)}
              </pre>
            ) : (
              <div className="bg-slate-900/40 border border-slate-850 rounded-lg p-2 text-slate-500 italic text-[11px]">
                Waiting for execution output...
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
