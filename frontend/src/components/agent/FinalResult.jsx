import { useState } from 'react';
import { CheckCircle, Copy, Check, Download } from 'lucide-react';

export default function FinalResult({
  result = null,
  summaryStats = {
    stepsExecuted: 0,
    toolsCalled: 0,
    durationSeconds: 0,
    estimatedTokens: 0,
  },
  onReset,
  className = '',
}) {
  const [copied, setCopied] = useState(false);

  if (!result) return null;

  const handleCopy = () => {
    const textToCopy = typeof result === 'string' ? result : JSON.stringify(result, null, 2);
    navigator.clipboard?.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const textToSave = typeof result === 'string' ? result : JSON.stringify(result, null, 2);
    const blob = new Blob([textToSave], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `agent-output-${Date.now()}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`bg-gradient-to-b from-slate-900 to-slate-950 border border-emerald-900/40 rounded-2xl p-6 shadow-2xl ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-emerald-400">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100">Objective Successfully Completed</h3>
            <p className="text-xs text-slate-400">All planned tasks and tool observations fulfilled.</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-center">
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Steps</span>
          <p className="text-base font-bold text-slate-100 font-mono">{summaryStats.stepsExecuted}</p>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Tools Run</span>
          <p className="text-base font-bold text-indigo-400 font-mono">{summaryStats.toolsCalled}</p>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Execution Time</span>
          <p className="text-base font-bold text-emerald-400 font-mono">{summaryStats.durationSeconds}s</p>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Tokens</span>
          <p className="text-base font-bold text-purple-400 font-mono">~{summaryStats.estimatedTokens}</p>
        </div>
      </div>

      <div className="mb-5">
        <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
          Agent Synthesis & Artifact
        </h4>
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-200 text-xs leading-relaxed max-h-96 overflow-y-auto whitespace-pre-wrap font-sans">
          {typeof result === 'string' ? result : JSON.stringify(result, null, 2)}
        </div>
      </div>

      {onReset && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md active:scale-95"
          >
            <span>Start New Agent Run</span>
          </button>
        </div>
      )}
    </div>
  );
}
