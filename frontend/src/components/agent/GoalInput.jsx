import { useState } from 'react';
import { Square, Sparkles, Sliders, Zap } from 'lucide-react';
import { SUGGESTED_GOALS } from '../../utils/constants';

export default function GoalInput({
  onSubmit,
  onStop,
  isRunning = false,
  disabled = false,
  suggestedGoals = SUGGESTED_GOALS,
}) {
  const [goal, setGoal] = useState('');
  const [showConfig, setShowConfig] = useState(false);
  const [config, setConfig] = useState({
    model: 'gemini-2.5-flash',
    autonomyLevel: 'hitl',
    maxIterations: 8,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!goal.trim() || isRunning) return;
    onSubmit?.({
      goal: goal.trim(),
      config,
    });
  };

  const handleSelectSuggestion = (text) => {
    setGoal(text);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl backdrop-blur-md transition-all">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-between mb-3">
          <label htmlFor="agent-goal" className="flex items-center gap-2 text-sm font-semibold text-slate-200">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Agent Objective & Goal</span>
          </label>
          <button
            type="button"
            onClick={() => setShowConfig(!showConfig)}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-indigo-300 transition-colors py-1 px-2.5 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-800/40"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Parameters {showConfig ? '▲' : '▼'}</span>
          </button>
        </div>

        {showConfig && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 p-3.5 bg-slate-950/60 border border-slate-800/80 rounded-xl text-xs">
            <div>
              <label className="text-slate-400 block mb-1 font-medium">Model Engine</label>
              <select
                value={config.model}
                onChange={(e) => setConfig({ ...config, model: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option value="gemini-2.5-flash">Gemini 2.5 Flash (Fast)</option>
                <option value="gemini-2.5-pro">Gemini 2.5 Pro (Deep)</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 block mb-1 font-medium">Autonomy Guardrail</label>
              <select
                value={config.autonomyLevel}
                onChange={(e) => setConfig({ ...config, autonomyLevel: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option value="hitl">Human-in-the-Loop (Risky Actions)</option>
                <option value="full">Full Autonomy (Zero Approval)</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 block mb-1 font-medium">Max Tool Steps</label>
              <input
                type="number"
                min="1"
                max="25"
                value={config.maxIterations}
                onChange={(e) => setConfig({ ...config, maxIterations: parseInt(e.target.value, 10) || 8 })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        )}

        <div className="relative">
          <textarea
            id="agent-goal"
            rows="3"
            disabled={isRunning || disabled}
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="Describe what you want the AI agent to accomplish... e.g., 'Check external service data, summarize anomalies, and request approval before mutating records.'"
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/80 transition-all resize-none disabled:opacity-50"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 text-xs">
            <span className="text-slate-500 flex-shrink-0 font-medium">Quick ideas:</span>
            {suggestedGoals.slice(0, 2).map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectSuggestion(item)}
                className="text-slate-400 hover:text-indigo-300 truncate max-w-[200px] border border-slate-800 hover:border-slate-700 bg-slate-950/40 px-2 py-1 rounded-md transition-colors"
                title={item}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 justify-end">
            {isRunning ? (
              <button
                type="button"
                onClick={onStop}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white transition-all shadow-lg shadow-rose-900/30 active:scale-95"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>Stop Agent</span>
              </button>
            ) : (
              <button
                type="submit"
                disabled={!goal.trim() || disabled}
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white transition-all shadow-lg shadow-indigo-600/25 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Launch Agent</span>
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
