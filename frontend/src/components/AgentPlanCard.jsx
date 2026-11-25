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
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full shadow-2xs">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Verified
          </span>
        );
      case 'searching':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-cyan-800 bg-cyan-50 border border-cyan-200 px-2.5 py-0.5 rounded-full animate-pulse shadow-2xs">
            <Clock className="w-3 h-3 animate-spin text-cyan-600" />
            Searching
          </span>
        );
      case 'conflict_flagged':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full shadow-2xs">
            <AlertOctagon className="w-3 h-3 text-amber-600" />
            Conflict Flagged
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-800 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full shadow-2xs">
            <AlertCircle className="w-3 h-3 text-rose-600" />
            Failed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full">
            <Circle className="w-3 h-3 text-slate-400" />
            Pending
          </span>
        );
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-md transition-all">
      {/* Title & Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <ListTree className="w-5 h-5 text-violet-600" />
          <h3 className="text-sm font-semibold text-slate-900">Sub-Question Decomposition &amp; Execution Plan</h3>
        </div>
        <span className="text-xs font-mono text-slate-500">
          {verifiedCount}/{subQuestions.length} Verified ({progressPercent}%)
        </span>
      </div>

      {/* Progress Bar with vibrant gradient */}
      <div className="w-full bg-slate-100 rounded-full h-1.5 mb-4 overflow-hidden border border-slate-200">
        <div
          className="bg-gradient-to-r from-violet-600 via-cyan-600 to-emerald-500 h-1.5 transition-all duration-500 rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Sub-Questions Ordered List */}
      {subQuestions.length === 0 ? (
        <div className="py-8 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl bg-slate-50">
          No sub-questions generated yet. Launch the research agent to decompose the primary question.
        </div>
      ) : (
        <div className="space-y-2.5">
          {subQuestions.map((q, idx) => (
            <div
              key={q.id || idx}
              className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3 rounded-xl border text-xs transition-all ${
                q.status === 'verified'
                  ? 'bg-emerald-50/50 border-emerald-200 text-slate-800'
                  : q.status === 'searching'
                  ? 'bg-cyan-50/50 border-cyan-200 text-slate-800'
                  : q.status === 'conflict_flagged'
                  ? 'bg-amber-50/50 border-amber-200 text-slate-800'
                  : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <span className="font-mono text-[11px] font-bold text-slate-400 mt-0.5">
                  #{idx + 1}
                </span>
                <span className="leading-snug font-medium text-slate-800">{q.title}</span>
              </div>
              <div className="flex-shrink-0 self-start sm:self-auto">
                {renderBadge(q.status)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
