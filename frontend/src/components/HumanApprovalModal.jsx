import { ShieldAlert, Check, X } from 'lucide-react';

export default function HumanApprovalModal({
  approvalRequest = null,
  onApprove,
  onReject,
  isSubmitting = false,
}) {
  if (!approvalRequest) return null;

  return (
    <div className="border-2 border-amber-500/80 bg-amber-950/40 rounded-2xl p-5 shadow-2xl backdrop-blur-xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-sm">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-amber-200">
              External Publication & Dissemination Gate
            </h4>
            <span className="text-[11px] text-amber-300/80 font-mono">
              Action: <strong className="text-amber-100">{approvalRequest.actionName || 'export_and_publish_external'}</strong>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 text-xs font-bold uppercase rounded-md bg-amber-600/30 border border-amber-500/60 text-amber-300 shadow-sm">
            {approvalRequest.riskTier || 'EXTERNAL'} ACTION
          </span>
        </div>
      </div>

      {/* Risk Reason */}
      <div className="p-3.5 rounded-xl bg-amber-950/70 border border-amber-700/80 mb-3 text-xs text-amber-200/90 leading-relaxed shadow-inner">
        <span className="font-semibold block text-amber-300 mb-0.5">Approval Prerequisite Reason:</span>
        <p>{approvalRequest.riskReason || 'The autonomous agent is preparing to dispatch an unverified executive research memo or write to an external publication endpoint.'}</p>
      </div>

      {/* Proposed Payload */}
      <div className="mb-4">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
          Staged Dissemination Payload:
        </span>
        <pre className="bg-[#090D16] border border-white/[0.08] rounded-xl p-3 text-xs font-mono text-slate-200 overflow-x-auto max-h-40">
          {JSON.stringify(approvalRequest.payload || {}, null, 2)}
        </pre>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-3 border-t border-amber-800/60">
        <button
          type="button"
          onClick={onReject}
          disabled={isSubmitting}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-rose-950/80 hover:bg-rose-900 text-rose-200 border border-rose-700 transition-all active:scale-95 shadow-sm disabled:opacity-50"
        >
          <X className="w-4 h-4" />
          <span>Reject & Restrict Internal</span>
        </button>

        <button
          type="button"
          onClick={onApprove}
          disabled={isSubmitting}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30 transition-all active:scale-95 disabled:opacity-50"
        >
          <Check className="w-4 h-4" />
          <span>{isSubmitting ? 'Submitting to Backend...' : 'Approve & Authorize Dissemination'}</span>
        </button>
      </div>
    </div>
  );
}
