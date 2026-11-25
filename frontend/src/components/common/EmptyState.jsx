import { Bot, Sparkles, ArrowRight } from 'lucide-react';

export default function EmptyState({
  title = 'No active agent session',
  description = 'Provide a goal above to initialize the agentic reasoning and execution loop.',
  onQuickStart = null,
  actionLabel = 'Quick Start Demo',
  icon: Icon = Bot,
}) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/30">
      <div className="w-14 h-14 rounded-2xl bg-indigo-950/60 border border-indigo-800/60 flex items-center justify-center mb-4 text-indigo-400 shadow-lg shadow-indigo-950/50">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-lg font-semibold text-slate-200 mb-1">{title}</h3>
      <p className="text-sm text-slate-400 max-w-md mb-6">{description}</p>
      {onQuickStart && (
        <button
          onClick={onQuickStart}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md hover:shadow-indigo-500/20 active:scale-95"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{actionLabel}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
