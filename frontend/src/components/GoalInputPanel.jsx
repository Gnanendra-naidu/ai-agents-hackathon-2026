import { useState } from 'react';
import {
  Sparkles,
  Globe,
  Database,
  FileText,
  Paperclip,
  Send,
  Play,
  Sliders,
  Check,
  Plus
} from 'lucide-react';

export default function GoalInputPanel({
  researchQuestion = '',
  onQuestionChange,
  targetAudience = 'Researchers',
  onAudienceChange,
  sourceTypes = { webSearch: true, knowledgeBase: true },
  onSourceTypeToggle,
  onSubmitResearch,
  scenario = 'normal',
  onScenarioChange,
  isSearching = false,
  onAskFollowUp,
}) {
  const [followUpText, setFollowUpText] = useState('');
  const [attachedFiles, setAttachedFiles] = useState([
    { name: 'market_intelligence_q3.pdf', size: '2.4 MB', content: 'Internal benchmarks show 44% reduction in parameter hallucination when schema validation is enforced in agent tool calls.' },
  ]);

  const handleSimulateAttach = (e) => {
    e.preventDefault();
    const fakeFileName = `research_note_${Date.now().toString().slice(-4)}.pdf`;
    setAttachedFiles((prev) => [
      ...prev,
      { name: fakeFileName, size: '1.1 MB', content: 'Supplementary enterprise findings on multi-agent routing efficiency.' },
    ]);
  };

  const handleRemoveFile = (index) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFollowUpSubmit = (e) => {
    e.preventDefault();
    if (!followUpText.trim() || isSearching) return;
    onAskFollowUp?.(followUpText.trim());
    setFollowUpText('');
  };

  const handleLaunchClick = () => {
    onSubmitResearch?.({
      uploadedNotes: attachedFiles,
    });
  };

  return (
    <div className="bg-[#111827]/85 border border-white/[0.08] hover:border-white/[0.12] rounded-2xl p-5 shadow-2xl backdrop-blur-xl transition-all space-y-4">
      {/* Header and Theme Context */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <label htmlFor="research-question" className="flex items-center gap-2 text-sm font-semibold text-slate-100">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Primary Research Question & Hypothesis</span>
        </label>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium">Target Audience:</span>
          <div className="flex items-center gap-1 bg-[#090D16] p-1 rounded-xl border border-white/[0.06]">
            {['Researchers', 'Founders', 'Students', 'Journalists'].map((aud) => (
              <button
                key={aud}
                type="button"
                onClick={() => onAudienceChange?.(aud)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  targetAudience === aud
                    ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-md shadow-cyan-600/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {aud}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Research Question Input */}
      <textarea
        id="research-question"
        rows="3"
        value={researchQuestion}
        onChange={(e) => onQuestionChange?.(e.target.value)}
        placeholder="Enter your research query... e.g., 'What are the verified economic trade-offs, hallucination rates, and human-in-the-loop bottlenecks of multi-agent AI frameworks?'"
        className="w-full bg-[#090D16]/90 border border-white/[0.08] rounded-xl p-3.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/80 transition-all resize-none"
      />

      {/* Source Toggles & Attached Documents Strip */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
        {/* Source Type Toggles */}
        <div className="p-3.5 rounded-xl bg-[#090D16]/75 border border-white/[0.06] flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
            Corpus & Knowledge Sources:
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => onSourceTypeToggle?.('webSearch')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                sourceTypes.webSearch
                  ? 'bg-cyan-950/80 border-cyan-600/80 text-cyan-300 shadow-sm'
                  : 'bg-[#111827] border-white/[0.06] text-slate-500'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>Web Search (ArXiv / Scholar)</span>
              {sourceTypes.webSearch && <Check className="w-3 h-3 text-cyan-400 ml-1" />}
            </button>

            <button
              type="button"
              onClick={() => onSourceTypeToggle?.('knowledgeBase')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                sourceTypes.knowledgeBase
                  ? 'bg-emerald-950/80 border-emerald-600/80 text-emerald-300 shadow-sm'
                  : 'bg-[#111827] border-white/[0.06] text-slate-500'
              }`}
            >
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span>Uploaded KB / Notes</span>
              {sourceTypes.knowledgeBase && <Check className="w-3 h-3 text-emerald-400 ml-1" />}
            </button>
          </div>
        </div>

        {/* Optional Document Attachment UI */}
        <div className="p-3.5 rounded-xl bg-[#090D16]/75 border border-white/[0.06]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Paperclip className="w-3.5 h-3.5 text-cyan-400" />
              <span>Attached Documents & Notes</span>
            </span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-700/60 px-1.5 py-0.5 rounded">
              Ready for Agent
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {attachedFiles.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#161F33] border border-white/[0.08] text-slate-300 text-xs"
              >
                <FileText className="w-3 h-3 text-cyan-400" />
                <span className="truncate max-w-[140px] font-mono text-[11px]">{file.name}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveFile(idx)}
                  className="text-slate-500 hover:text-rose-400 ml-1 transition-colors"
                >
                  ×
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={handleSimulateAttach}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#161F33] hover:bg-[#1E293B] text-slate-300 text-xs font-medium border border-white/[0.08] hover:border-cyan-500/40 transition-colors"
            >
              <Plus className="w-3 h-3" />
              <span>Attach File</span>
            </button>
          </div>
        </div>
      </div>

      {/* Execution Controls & Simulation Selector */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-white/[0.08]">
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400 flex items-center gap-1.5 flex-shrink-0">
            <Sliders className="w-3.5 h-3.5 text-violet-400" />
            <span>Research Mode / Scenario:</span>
          </label>
          <select
            value={scenario}
            onChange={(e) => onScenarioChange?.(e.target.value)}
            className="bg-[#090D16] border border-white/[0.08] rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            <option value="live">Live Backend Execution (POST /api/research)</option>
            <option value="normal">Demo Scenario 1: Multi-Source Citations</option>
            <option value="conflict">Demo Scenario 2: Cross-Source Conflicting Claims</option>
            <option value="approval">Demo Scenario 3: External Publication Gate</option>
            <option value="error">Demo Scenario 4: Retrieval Timeout / Fallback</option>
          </select>
        </div>

        {/* Primary CTA with pulsing glow */}
        <button
          type="button"
          onClick={handleLaunchClick}
          disabled={isSearching || !researchQuestion.trim()}
          className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold transition-all active:scale-95 disabled:opacity-50 anim-pulse-glow"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>{isSearching ? 'Executing Live Tools...' : 'Launch Research Agent'}</span>
        </button>
      </div>

      {/* Follow-up question input bar */}
      <form onSubmit={handleFollowUpSubmit} className="pt-2 border-t border-white/[0.06] flex items-center gap-2">
        <input
          type="text"
          value={followUpText}
          onChange={(e) => setFollowUpText(e.target.value)}
          placeholder="Ask a follow-up inquiry to deepen the current research session... (e.g., 'Compare how pricing models diverge between single-agent vs multi-agent deployments')"
          className="flex-1 bg-[#090D16]/80 border border-white/[0.08] rounded-xl px-3.5 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/80"
        />
        <button
          type="submit"
          disabled={!followUpText.trim() || isSearching}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#161F33] hover:bg-cyan-950/60 text-cyan-300 disabled:opacity-30 border border-cyan-800/60 hover:border-cyan-600 transition-colors"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Deepen</span>
        </button>
      </form>
    </div>
  );
}
