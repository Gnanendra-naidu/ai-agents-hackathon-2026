import { useState, useEffect } from 'react';
import { CheckCircle2, Clock, Sparkles, Activity } from 'lucide-react';

export default function ResearchProgressTracker({
  tracesCount = 0,
  subQuestionsCount = 0,
}) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  let currentStep = 1;
  if (tracesCount > 6 || elapsedSeconds > 8) {
    currentStep = 4;
  } else if (tracesCount > 3 || elapsedSeconds > 4) {
    currentStep = 3;
  } else if (tracesCount > 0 || subQuestionsCount > 0 || elapsedSeconds > 1) {
    currentStep = 2;
  }

  const steps = [
    { num: 1, title: 'Breaking Down Question', desc: 'Decomposing inquiry into sub-goals' },
    { num: 2, title: 'Searching Knowledge Base & Web', desc: 'Querying Wikipedia, Crossref & docs' },
    { num: 3, title: 'Fact-Checking & Reconciling', desc: 'Cross-validating claims & conflicts' },
    { num: 4, title: 'Synthesizing Final Report', desc: 'Grounding citations & executive insights' },
  ];

  const progressPercent = Math.min(Math.round((currentStep / 4) * 100), 96);

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-md space-y-5 animate-in fade-in duration-300">
      {/* Header with Title and Real-Time Elapsed Timer */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2 text-cyan-700 font-bold text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4 animate-spin text-cyan-600" />
          <span>Autonomous Agent Pipeline Active</span>
        </div>

        {/* Elapsed Timer */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 shadow-2xs">
          <Clock className="w-3.5 h-3.5 text-cyan-600 animate-pulse" />
          <span>Elapsed: <strong className="text-slate-900 font-bold">{elapsedSeconds}s</strong></span>
        </div>
      </div>

      {/* Horizontal Animated Progress Track */}
      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200 relative">
        <div
          className="h-full bg-gradient-to-r from-cyan-600 via-teal-500 to-emerald-500 transition-all duration-700 rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* 4-Step Pipeline Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {steps.map((s) => {
          const isDone = s.num < currentStep;
          const isCurrent = s.num === currentStep;

          return (
            <div
              key={s.num}
              className={`p-3.5 rounded-xl border transition-all ${
                isDone
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  : isCurrent
                  ? 'bg-cyan-50 border-cyan-300 text-cyan-900 shadow-xs ring-2 ring-cyan-500/10'
                  : 'bg-slate-50 border-slate-200 text-slate-400'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                ) : isCurrent ? (
                  <Activity className="w-4 h-4 text-cyan-600 animate-pulse flex-shrink-0" />
                ) : (
                  <span className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center text-[10px] text-slate-400 font-mono">
                    {s.num}
                  </span>
                )}
                <span className="text-xs font-bold leading-tight">{s.title}</span>
              </div>
              <p className="text-[11px] text-slate-500 pl-6 leading-relaxed">{s.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
