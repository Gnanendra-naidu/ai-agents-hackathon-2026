import { AlertCircle, RefreshCw, XCircle } from 'lucide-react';

export default function ErrorBanner({ error = 'An unexpected execution error occurred.', onRetry = null, onDismiss = null }) {
  if (!error) return null;

  return (
    <div className="rounded-xl border border-rose-800/80 bg-rose-950/40 p-4 text-rose-200 flex items-start justify-between gap-3 shadow-lg">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-semibold text-rose-300">Execution Error</h4>
          <p className="text-xs text-rose-300/80 mt-0.5 leading-relaxed">
            {typeof error === 'string' ? error : error?.message || 'Error executing agent step.'}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        {onRetry && (
          <button
            onClick={onRetry}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-rose-900/60 hover:bg-rose-900 text-rose-200 border border-rose-700/60 rounded-md transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Retry</span>
          </button>
        )}
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="p-1 text-rose-400 hover:text-rose-200 transition-colors"
          >
            <XCircle className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
