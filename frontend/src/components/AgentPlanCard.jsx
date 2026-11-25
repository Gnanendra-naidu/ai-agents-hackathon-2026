import { ListTree, Clock, CheckCircle2, AlertOctagon, AlertCircle, Circle } from 'lucide-react';

export default function AgentPlanCard({
  subQuestions = [],
}) {
  const verifiedCount = subQuestions.filter((s) => s.status === 'verified').length;
  const progressPercent = subQuestions.length ? Math.round((verifiedCount / subQuestions.length) * 100) : 0;

  const renderBadge = (status) => {
    switch (status) {
      case 'verified':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-300 bg-emerald-950/70 border border-emerald-600/70 px-2.5 py-0.5 rounded-full shadow-sm">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            Verified
          </span>
        );
      case 'searching':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-cyan-300 bg-cyan-950/70 border border-cyan-600/70 px-2.5 py-0.5 rounded-full animate-pulse shadow-sm">
            <Clock className="w-3 h-3 animate-spin text-cyan-400" />
            Searching
          </span>
        );
      case 'conflict_flagged':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-300 bg-amber-950/80 border border-amber-500/80 px-2.5 py-0.5 rounded-full shadow-sm">
            <AlertOctagon className="w-3 h-3 text-amber-400" />
            Conflict Flagged
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-300 bg-rose-950/70 border border-rose-600/70 px-2.5 py-0.5 rounded-full shadow-sm">
            <AlertCircle className="w-3 h-3 text-rose-400" />
            Failed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 bg-[#090D16] border border-white/[0.08] px-2.5 py-0.5 rounded-full">
            <Circle className="w-3 h-3 text-slate-600" />
            Pending
          </span>
        );
    }
  };

  return (
    <div className="bg-[#111827]/85 border border-white/[0.08] hover:border-white/[0.12] rounded-2xl p-5 shadow-2xl backdrop-blur-xl transition-all">
      {/* Title & Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <ListTree className="w-5 h-5 text-violet-400" />
          <h3 className="text-sm font-semibold text-slate-100">Sub-Question Decomposition & Execution Plan</h3>
        </div>
        <span className="text-xs font-mono text-slate-400">
          {verifiedCount}/{subQuestions.length} Verified ({progressPercent}%)
        </span>
      </div>

      {/* Progress Bar with vibrant gradient */}
      <div className="w-full bg-[#090D16] rounded-full h-1.5 mb-4 overflow-hidden border border-white/[0.06]">
        <div
          className="bg-gradient-to-r from-violet-500 via-cyan-500 to-emerald-400 h-1.5 transition-all duration-500 rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Sub-Questions Ordered List */}
      {subQuestions.length === 0 ? (
        <div className="py-8 text-center text-xs text-slate-500 border border-dashed border-white/[0.08] rounded-xl bg-[#090D16]/50">
          No sub-questions generated yet. Launch the research agent to decompose the primary question.
        </div>
      ) : (
        <div className="space-y-2.5">
          {subQuestions.map((q, idx) => (
            <div
              key={q.id || idx}
              className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3 rounded-xl border text-xs transition-all ${
                q.status === 'conflict_flagged'
                  ? 'bg-amber-950/25 border-amber-500/60 shadow-sm'
                  : q.status === 'searching'
                  ? 'bg-cyan-950/20 border-cyan-600/60'
                  : q.status === 'verified'
                  ? 'bg-[#090D16]/80 border-white/[0.06] text-slate-300'
                  : q.status === 'failed'
                  ? 'bg-rose-950/25 border-rose-600/60 text-rose-200'
                  : 'bg-[#090D16]/40 border-white/[0.04] text-slate-400'
              }`}
            >
              <div className="flex items-start sm:items-center gap-2.5 flex-1">
                <span className="font-mono text-[11px] font-bold text-violet-300 bg-violet-950/70 px-2 py-0.5 rounded border border-violet-800/60 flex-shrink-0 shadow-sm">
                  Sub-Q{idx + 1}
                </span>
                <span className="font-medium text-slate-200 leading-snug">{q.title}</span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {renderBadge(q.status)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
