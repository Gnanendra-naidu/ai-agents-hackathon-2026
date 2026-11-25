import { CheckCircle2, Clock, Sparkles } from 'lucide-react';

export default function ResearchProgressTracker({
  tracesCount = 0,
  subQuestionsCount = 0,
}) {
  // Determine active step
  // Step 1: Breaking down your question
  // Step 2: Searching trusted sources
  // Step 3: Writing your report
  let currentStep = 1;
  if (tracesCount > 4 || subQuestionsCount > 2) {
    currentStep = 3;
  } else if (tracesCount > 1 || subQuestionsCount > 0) {
    currentStep = 2;
  }

  const steps = [
    { num: 1, title: 'Breaking down your question', desc: 'Formulating targeted sub-questions' },
    { num: 2, title: 'Searching trusted sources', desc: 'Querying Wikipedia, academic indices & docs' },
    { num: 3, title: 'Writing your report', desc: 'Synthesizing verified findings & citations' },
  ];

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-[#111827]/90 border border-cyan-800/40 shadow-xl backdrop-blur-xl space-y-4">
      <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
        <Sparkles className="w-4 h-4 animate-spin text-cyan-400" />
        <span>Research in Progress...</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {steps.map((s) => {
          const isDone = s.num < currentStep;
          const isCurrent = s.num === currentStep;

          return (
            <div
              key={s.num}
              className={`p-3.5 rounded-xl border transition-all ${
                isDone
                  ? 'bg-emerald-950/40 border-emerald-600/50 text-emerald-300'
                  : isCurrent
                  ? 'bg-cyan-950/50 border-cyan-500/70 text-cyan-200 shadow-md ring-1 ring-cyan-500/30'
                  : 'bg-[#090D16]/60 border-white/[0.04] text-slate-500'
              }`}
            >
              <div className="flex items-center gap-2.5 mb-1">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                ) : isCurrent ? (
                  <Clock className="w-4 h-4 text-cyan-400 animate-spin flex-shrink-0" />
                ) : (
                  <span className="w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center text-[10px] text-slate-500 font-mono">
                    {s.num}
                  </span>
                )}
                <span className="text-xs font-semibold">{s.title}</span>
              </div>
              <p className="text-[11px] text-slate-400 pl-6">{s.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
