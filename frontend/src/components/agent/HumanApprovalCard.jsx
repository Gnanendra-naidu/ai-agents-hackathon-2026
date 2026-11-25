import { useState } from 'react';
import { ShieldAlert, Check, X, Edit2 } from 'lucide-react';
import { RISK_LEVEL } from '../../utils/constants';

export default function HumanApprovalCard({
  approvalRequest = {
    id: 'req-1',
    action: 'Execute database schema mutation or dispatch critical external message',
    toolName: 'database_mutate',
    riskLevel: RISK_LEVEL.HIGH,
    reason: 'This action performs permanent mutations on downstream storage.',
    params: { query: 'DELETE FROM records WHERE status = "archived";' },
  },
  onApprove,
  onReject,
  onModifyAndApprove,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedParams, setEditedParams] = useState(
    JSON.stringify(approvalRequest.params || {}, null, 2)
  );

  const handleApprove = () => {
    onApprove?.(approvalRequest.id);
  };

  const handleReject = () => {
    onReject?.(approvalRequest.id);
  };

  const handleSaveAndApprove = () => {
    try {
      const parsed = JSON.parse(editedParams);
      onModifyAndApprove?.(approvalRequest.id, parsed);
      setIsEditing(false);
    } catch (err) {
      alert('Invalid JSON parameters: ' + err.message);
    }
  };

  return (
    <div className="border-2 border-amber-600/80 bg-amber-950/30 rounded-2xl p-5 shadow-2xl backdrop-blur-md relative overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-amber-300">Human Approval Required</h4>
            <span className="text-[11px] text-amber-200/70 font-mono">
              Action: <strong className="text-amber-100">{approvalRequest.toolName}</strong>
            </span>
          </div>
        </div>
        <span className="px-2.5 py-1 text-xs font-bold uppercase rounded-md bg-amber-600/30 border border-amber-500/50 text-amber-300">
          {approvalRequest.riskLevel || 'HIGH'} RISK
        </span>
      </div>

      <p className="text-xs text-slate-300 mb-3 leading-relaxed">
        {approvalRequest.reason || approvalRequest.action || 'The agent requested approval for a high-impact operation.'}
      </p>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Proposed Action Payload
          </span>
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 transition-colors"
          >
            <Edit2 className="w-3 h-3" />
            <span>{isEditing ? 'Cancel Edit' : 'Modify Payload'}</span>
          </button>
        </div>

        {isEditing ? (
          <textarea
            rows="4"
            value={editedParams}
            onChange={(e) => setEditedParams(e.target.value)}
            className="w-full bg-slate-950 border border-amber-500/80 rounded-xl p-2.5 text-xs font-mono text-amber-100 focus:outline-none"
          />
        ) : (
          <pre className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-xs font-mono text-slate-200 overflow-x-auto max-h-48">
            {JSON.stringify(approvalRequest.params || {}, null, 2)}
          </pre>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-end gap-2.5 pt-2 border-t border-amber-900/40">
        <button
          type="button"
          onClick={handleReject}
          className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-800/80 transition-all"
        >
          <X className="w-4 h-4" />
          <span>Reject & Halt Action</span>
        </button>

        {isEditing ? (
          <button
            type="button"
            onClick={handleSaveAndApprove}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-5 py-2 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all shadow-lg shadow-amber-500/20"
          >
            <Check className="w-4 h-4" />
            <span>Save & Approve Modified</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleApprove}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-lg shadow-emerald-600/30 active:scale-95"
          >
            <Check className="w-4 h-4" />
            <span>Approve & Execute</span>
          </button>
        )}
      </div>
    </div>
  );
}
