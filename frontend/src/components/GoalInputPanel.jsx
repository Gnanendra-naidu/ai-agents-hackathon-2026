import { useState, useRef } from 'react';
import {
  Search,
  Globe,
  FileText,
  Paperclip,
  ArrowRight,
  Check,
  Plus,
  Trash2,
  Loader2,
  Upload,
  Send
} from 'lucide-react';

const EXAMPLE_PROMPTS = [
  'What are the pros and cons of multi-agent AI?',
  'How does AI self-reflection reduce hallucination?',
  'What are the latest breakthroughs in agent memory architectures?',
];

export default function GoalInputPanel({
  researchQuestion = '',
  onQuestionChange,
  targetAudience = 'Researchers',
  onAudienceChange,
  sourceTypes = { webSearch: true, knowledgeBase: true },
  onSourceTypeToggle,
  onSubmitResearch,
  isSearching = false,
  onAskFollowUp,
  hasActiveSession = false,
}) {
  const [followUpText, setFollowUpText] = useState('');
  const [attachedFiles, setAttachedFiles] = useState([
    {
      name: 'agent_benchmarks_sample.txt',
      size: '2.1 KB',
      content: 'Production telemetry indicates that multi-agent consensus communication increases token consumption by 2.4x-3.8x baseline, requiring hierarchical supervisor routing to cap API expenditures.'
    },
  ]);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result || '';
        const sizeFormatted = file.size > 1024 * 1024
          ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
          : `${(file.size / 1024).toFixed(1)} KB`;

        setAttachedFiles((prev) => [
          ...prev,
          {
            name: file.name,
            size: sizeFormatted,
            content: typeof text === 'string' ? text.slice(0, 8000) : '',
          },
        ]);
      };
      reader.readAsText(file);
    });

    e.target.value = '';
  };

  const handleSaveManualNote = (e) => {
    e.preventDefault();
    if (!newNoteContent.trim()) return;
    const title = newNoteTitle.trim() || `note_${Date.now().toString().slice(-4)}.txt`;
    setAttachedFiles((prev) => [
      ...prev,
      {
        name: title,
        size: `${(newNoteContent.length / 1024).toFixed(1)} KB`,
        content: newNoteContent.trim(),
      },
    ]);
    setNewNoteTitle('');
    setNewNoteContent('');
    setIsAddingNote(false);
  };

  const handleRemoveFile = (index) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleLaunchClick = (e) => {
    e.preventDefault();
    if (!researchQuestion.trim() || isSearching) return;
    onSubmitResearch?.({
      uploadedNotes: attachedFiles.length > 0 ? attachedFiles : undefined,
    });
  };

  const handleFollowUpSubmit = (e) => {
    e.preventDefault();
    if (!followUpText.trim() || isSearching) return;
    onAskFollowUp?.(followUpText.trim());
    setFollowUpText('');
  };

  return (
    <div className="bg-[#111827]/85 border border-white/[0.08] hover:border-white/[0.12] rounded-2xl p-5 sm:p-6 shadow-2xl backdrop-blur-xl transition-all space-y-5">
      {/* 1. Header with Audience Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <label htmlFor="research-question" className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
          <Search className="w-5 h-5 text-cyan-400" />
          <span>What would you like to research?</span>
        </label>

        {/* Audience Selector */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium">Who is this report for?</span>
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

      {/* 2. Main Question Textarea */}
      <textarea
        id="research-question"
        rows="3"
        value={researchQuestion}
        onChange={(e) => onQuestionChange?.(e.target.value)}
        placeholder="Ask a question (e.g., What are the pros and cons of multi-agent AI?)"
        disabled={isSearching}
        className="w-full bg-[#090D16]/90 border border-white/[0.08] rounded-xl p-4 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/80 transition-all resize-none disabled:opacity-60 leading-relaxed"
      />

      {/* 3. Try an Example Prompt Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-slate-400 font-medium mr-1">Try an example:</span>
        {EXAMPLE_PROMPTS.map((prompt, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onQuestionChange?.(prompt)}
            className="text-xs px-3 py-1.5 rounded-full bg-[#161F33] hover:bg-[#1E293B] text-slate-300 hover:text-cyan-300 border border-white/[0.06] hover:border-cyan-500/40 transition-all active:scale-95 text-left"
          >
            "{prompt}"
          </button>
        ))}
      </div>

      {/* 4. Sources Checkboxes & Document Uploads */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
        {/* Clean Source Checkboxes */}
        <div className="p-3.5 rounded-xl bg-[#090D16]/75 border border-white/[0.06] flex flex-col justify-between">
          <span className="text-xs font-semibold text-slate-300 block mb-2.5">
            Search Sources:
          </span>
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => onSourceTypeToggle?.('webSearch')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium border transition-all ${
                sourceTypes.webSearch
                  ? 'bg-cyan-950/80 border-cyan-600/80 text-cyan-300 shadow-sm'
                  : 'bg-[#111827] border-white/[0.06] text-slate-400'
              }`}
            >
              <Globe className="w-4 h-4 text-cyan-400" />
              <span>Web &amp; Academic Papers</span>
              {sourceTypes.webSearch && <Check className="w-3.5 h-3.5 text-cyan-400 ml-1" />}
            </button>

            <button
              type="button"
              onClick={() => onSourceTypeToggle?.('knowledgeBase')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium border transition-all ${
                sourceTypes.knowledgeBase
                  ? 'bg-emerald-950/80 border-emerald-600/80 text-emerald-300 shadow-sm'
                  : 'bg-[#111827] border-white/[0.06] text-slate-400'
              }`}
            >
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Uploaded Documents</span>
              {sourceTypes.knowledgeBase && <Check className="w-3.5 h-3.5 text-emerald-400 ml-1" />}
            </button>
          </div>
        </div>

        {/* Uploaded Documents Strip */}
        <div className="p-3.5 rounded-xl bg-[#090D16]/75 border border-white/[0.06] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Paperclip className="w-3.5 h-3.5 text-violet-400" />
              <span>Your Attached Files ({attachedFiles.length})</span>
            </span>
            <div className="flex items-center gap-1.5">
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt,.md,.json,.csv"
                multiple
                className="hidden"
                onChange={handleFileUpload}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 px-2.5 py-1 rounded-lg bg-cyan-950/50 border border-cyan-800/60 transition-colors"
                title="Upload text or markdown file"
              >
                <Upload className="w-3 h-3" />
                <span>Upload</span>
              </button>
              <button
                type="button"
                onClick={() => setIsAddingNote((v) => !v)}
                className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 px-2.5 py-1 rounded-lg bg-violet-950/50 border border-violet-800/60 transition-colors"
              >
                <Plus className="w-3 h-3" />
                <span>Add Note</span>
              </button>
            </div>
          </div>

          {/* Quick Note Editor Modal */}
          {isAddingNote && (
            <div className="p-3 mb-2 rounded-xl bg-[#111827] border border-violet-700/60 text-xs space-y-2">
              <input
                type="text"
                placeholder="Note title (e.g. key_metrics.txt)"
                value={newNoteTitle}
                onChange={(e) => setNewNoteTitle(e.target.value)}
                className="w-full bg-[#090D16] border border-white/[0.08] rounded-lg p-2 text-slate-200 placeholder:text-slate-500"
              />
              <textarea
                rows="2"
                placeholder="Paste your notes or document text here..."
                value={newNoteContent}
                onChange={(e) => setNewNoteContent(e.target.value)}
                className="w-full bg-[#090D16] border border-white/[0.08] rounded-lg p-2 text-slate-200 placeholder:text-slate-500 resize-none"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddingNote(false)}
                  className="px-2.5 py-1 text-slate-400 hover:text-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveManualNote}
                  className="px-3.5 py-1 bg-violet-600 hover:bg-violet-500 text-white rounded-lg font-medium"
                >
                  Save Note
                </button>
              </div>
            </div>
          )}

          {/* File Pills List */}
          <div className="flex flex-wrap items-center gap-1.5 max-h-24 overflow-y-auto">
            {attachedFiles.length === 0 ? (
              <span className="text-xs text-slate-500 italic">No custom files attached.</span>
            ) : (
              attachedFiles.map((file, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#111827] border border-white/[0.08] text-xs text-slate-300"
                >
                  <FileText className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                  <span className="truncate max-w-[150px]">{file.name}</span>
                  <span className="text-slate-500 text-[10px]">({file.size})</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(idx)}
                    className="text-slate-500 hover:text-rose-400 transition-colors ml-0.5"
                    title="Remove attachment"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </span>
              ))
            )}
          </div>
        </div>
      </div>

      {/* 5. Bottom Actions: Follow-Up & Primary Start Button */}
      <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-white/[0.06]">
        {/* Follow-up question bar */}
        <form onSubmit={handleFollowUpSubmit} className="flex-1 flex items-center gap-2">
          <input
            type="text"
            value={followUpText}
            onChange={(e) => setFollowUpText(e.target.value)}
            disabled={isSearching}
            placeholder={
              hasActiveSession
                ? 'Ask a follow-up question about this report...'
                : 'Start research above first, then ask follow-ups here...'
            }
            className="flex-1 bg-[#090D16] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 disabled:opacity-40"
          />
          <button
            type="submit"
            disabled={!followUpText.trim() || isSearching}
            className="p-2.5 rounded-xl bg-[#161F33] hover:bg-cyan-950 text-slate-300 hover:text-cyan-300 border border-white/[0.08] transition-colors disabled:opacity-40"
            title="Send follow-up query"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        {/* Big Friendly Primary CTA */}
        <button
          type="button"
          onClick={handleLaunchClick}
          disabled={!researchQuestion.trim() || isSearching}
          className="flex items-center justify-center gap-2.5 px-8 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-white shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
        >
          {isSearching ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>Researching...</span>
            </>
          ) : (
            <>
              <span>Start Research</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
