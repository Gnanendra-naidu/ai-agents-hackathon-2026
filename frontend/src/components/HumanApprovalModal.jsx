import { ShieldAlert, Check, X } from 'lucide-react';

export default function HumanApprovalModal({
  approvalRequest = null,
  onApprove,
  onReject,
  isSubmitting = false,
}) {
  if (!approvalRequest) return null;

  return (
    <div className="border border-amber-300 bg-amber-50/90 rounded-2xl p-5 shadow-lg relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-100 text-amber-700 border border-amber-200 shadow-2xs">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-amber-900">
              External Publication &amp; Dissemination Gate
            </h4>
            <span className="text-[11px] text-amber-800 font-mono">
              Action: <strong className="text-amber-950">{approvalRequest.actionName || 'export_and_publish_external'}</strong>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 text-xs font-bold uppercase rounded-md bg-amber-200/80 border border-amber-300 text-amber-900 shadow-2xs">
            {approvalRequest.riskTier || 'EXTERNAL'} ACTION
          </span>
        </div>
      </div>

      {/* Risk Reason */}
      <div className="p-3.5 rounded-xl bg-white border border-amber-200 mb-3 text-xs text-amber-900 leading-relaxed shadow-2xs">
        <span className="font-semibold block text-amber-950 mb-0.5">Approval Prerequisite Reason:</span>
        <p>{approvalRequest.riskReason || 'The autonomous agent is preparing to dispatch an unverified executive research memo or write to an external publication endpoint.'}</p>
      </div>

      {/* Proposed Payload */}
      <div className="mb-4">
        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
          Staged Dissemination Payload:
        </span>
        <pre className="bg-white border border-slate-200 rounded-xl p-3 text-xs font-mono text-slate-800 overflow-x-auto max-h-40 shadow-2xs">
          {JSON.stringify(approvalRequest.payload || {}, null, 2)}
        </pre>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-3 border-t border-amber-200">
        <button
          type="button"
          onClick={onReject}
          disabled={isSubmitting}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-white hover:bg-rose-50 text-rose-700 border border-rose-200 transition-all active:scale-95 shadow-2xs disabled:opacity-50 cursor-pointer"
        >
          <X className="w-4 h-4" />
          <span>Reject &amp; Restrict Internal</span>
        </button>

        <button
          type="button"
          onClick={onApprove}
          disabled={isSubmitting}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
        >
          <Check className="w-4 h-4" />
          <span>{isSubmitting ? 'Submitting to Backend...' : 'Approve & Authorize Dissemination'}</span>
        </button>
      </div>
    </div>
  );
}
