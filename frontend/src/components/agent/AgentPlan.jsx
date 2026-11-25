import { useState } from 'react';
import { CheckCircle2, Circle, Clock, Plus, Trash2, Edit3, Check, ListChecks } from 'lucide-react';
import { STEP_STATUS } from '../../utils/constants';

export default function AgentPlan({
  steps = [],
  onUpdateSteps,
  isEditable = true,
  className = '',
}) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState('');
  const [newStepText, setNewStepText] = useState('');

  const completedCount = steps.filter((s) => s.status === STEP_STATUS.COMPLETED).length;
  const progressPercent = steps.length ? Math.round((completedCount / steps.length) * 100) : 0;

  const handleStartEdit = (index, currentTitle) => {
    if (!isEditable) return;
    setEditingIndex(index);
    setEditText(currentTitle);
  };

  const handleSaveEdit = (index) => {
    if (!editText.trim()) return;
    const updated = [...steps];
    updated[index] = { ...updated[index], title: editText.trim() };
    onUpdateSteps?.(updated);
    setEditingIndex(null);
    setEditText('');
  };

  const handleToggleStatus = (index) => {
    if (!isEditable) return;
    const current = steps[index]?.status;
    let nextStatus = STEP_STATUS.IN_PROGRESS;
    if (current === STEP_STATUS.IN_PROGRESS) nextStatus = STEP_STATUS.COMPLETED;
    else if (current === STEP_STATUS.COMPLETED) nextStatus = STEP_STATUS.PENDING;
    else if (current === STEP_STATUS.PENDING) nextStatus = STEP_STATUS.IN_PROGRESS;

    const updated = [...steps];
    updated[index] = { ...updated[index], status: nextStatus };
    onUpdateSteps?.(updated);
  };

  const handleDeleteStep = (index) => {
    if (!isEditable) return;
    const updated = steps.filter((_, i) => i !== index);
    onUpdateSteps?.(updated);
  };

  const handleAddStep = (e) => {
    e.preventDefault();
    if (!newStepText.trim()) return;
    const newStep = {
      id: `step-${Date.now()}`,
      title: newStepText.trim(),
      status: STEP_STATUS.PENDING,
    };
    onUpdateSteps?.([...steps, newStep]);
    setNewStepText('');
  };

  return (
    <div className={`bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg backdrop-blur-md ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <ListChecks className="w-5 h-5 text-indigo-400" />
          <h3 className="text-sm font-semibold text-slate-100">Agent Action Plan</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400">
            {completedCount}/{steps.length} Done ({progressPercent}%)
          </span>
        </div>
      </div>

      <div className="w-full bg-slate-800 rounded-full h-1.5 mb-4 overflow-hidden">
        <div
          className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-1.5 transition-all duration-500 rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {steps.length === 0 ? (
        <div className="py-6 text-center text-xs text-slate-500 border border-dashed border-slate-800/80 rounded-xl">
          Plan will be synthesized once the agent evaluates your goal.
        </div>
      ) : (
        <div className="space-y-2">
          {steps.map((step, index) => {
            const isCompleted = step.status === STEP_STATUS.COMPLETED;
            const isInProgress = step.status === STEP_STATUS.IN_PROGRESS;

            return (
              <div
                key={step.id || index}
                className={`group flex items-center justify-between gap-3 p-2.5 rounded-xl border text-xs transition-all ${
                  isInProgress
                    ? 'bg-indigo-950/40 border-indigo-700/60 text-indigo-200'
                    : isCompleted
                    ? 'bg-slate-950/40 border-slate-800 text-slate-400 line-through'
                    : 'bg-slate-950/20 border-slate-850 hover:border-slate-700 text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5 flex-1 min-w-0">
                  <button
                    type="button"
                    onClick={() => handleToggleStatus(index)}
                    className="flex-shrink-0 text-slate-400 hover:text-indigo-400 transition-colors"
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : isInProgress ? (
                      <Clock className="w-4 h-4 text-indigo-400 animate-spin" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-600" />
                    )}
                  </button>

                  {editingIndex === index ? (
                    <div className="flex items-center gap-2 flex-1">
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="flex-1 bg-slate-900 border border-indigo-500 rounded px-2 py-0.5 text-xs text-slate-100 focus:outline-none"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => handleSaveEdit(index)}
                        className="text-emerald-400 hover:text-emerald-300"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <span className="font-medium truncate flex-1">{step.title}</span>
                  )}
                </div>

                {isEditable && editingIndex !== index && (
                  <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
                    <button
                      type="button"
                      onClick={() => handleStartEdit(index, step.title)}
                      className="p-1 text-slate-500 hover:text-slate-300 transition-colors"
                      title="Edit step"
                    >
                      <Edit3 className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteStep(index)}
                      className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                      title="Remove step"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {isEditable && (
        <form onSubmit={handleAddStep} className="mt-3 flex items-center gap-2">
          <input
            type="text"
            value={newStepText}
            onChange={(e) => setNewStepText(e.target.value)}
            placeholder="Add custom step to plan..."
            className="flex-1 bg-slate-950/60 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/80"
          />
          <button
            type="submit"
            disabled={!newStepText.trim()}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 disabled:opacity-30 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </form>
      )}
    </div>
  );
}
