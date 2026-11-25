import { useState } from 'react';
import {
  FileText,
  Copy,
  Check,
  Download,
  HelpCircle,
  BookmarkCheck,
  Globe,
  ExternalLink,
  Send,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function FinalResultPanel({
  report = null,
  onRequestExportApproval = null,
  onSelectFollowUp = null,
}) {
  const [copied, setCopied] = useState(false);

  if (!report) return null;

  const summaryText = report.executiveSummary || report.summary || '';
  const keyFindingsList = report.keyFindings || [];
  const openQuestionsList = report.openQuestions || [];
  const sourcesList = report.sources || [];

  const handleCopy = () => {
    const formatted = `
# ${report.title || 'Research Synthesis Report'}

## Executive Summary
${summaryText}

## Key Findings
${keyFindingsList.map((f, i) => `${i + 1}. ${f.finding || f} [Sources: ${f.sources ? f.sources.join(', ') : ''}]`).join('\n')}

## Sources Used
${sourcesList.map((s) => `- [${s.id || 'Src'}] ${s.label} (${s.type || 'source'}) - ${s.url || ''}`).join('\n')}

## Follow-Up Questions
${openQuestionsList.map((q) => `- ${q}`).join('\n')}
    `.trim();

    navigator.clipboard?.writeText(formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportMarkdown = () => {
    const formatted = `
# ${report.title || 'Research Synthesis Report'}

## Executive Summary
${summaryText}

## Key Findings
${keyFindingsList.map((f, i) => `${i + 1}. ${f.finding || f} [Sources: ${f.sources ? f.sources.join(', ') : ''}]`).join('\n')}

## Sources Used
${sourcesList.map((s) => `- [${s.id || 'Src'}] ${s.label} (${s.type || 'source'}) - ${s.url || ''}`).join('\n')}

## Follow-Up Questions
${openQuestionsList.map((q) => `- ${q}`).join('\n')}
    `.trim();

    const blob = new Blob([formatted], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `research-report-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-[#111827]/90 border border-cyan-800/50 rounded-2xl p-6 sm:p-7 shadow-2xl backdrop-blur-xl transition-all space-y-6">
      {/* 1. Header Bar with Prominent Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/[0.08]">
        <div className="flex items-start gap-3.5">
          <div className="p-3 rounded-xl bg-cyan-950/90 border border-cyan-600/70 text-cyan-400 shadow-md">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold text-slate-100">
                {report.title || 'Research Report'}
              </h2>
              {report.audience && (
                <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-700/80">
                  For {report.audience}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Grounded and verified across public academic databases and your knowledge base.
            </p>
          </div>
        </div>

        {/* Prominent Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          {onRequestExportApproval && (
            <button
              type="button"
              onClick={onRequestExportApproval}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white shadow-md active:scale-95 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publish / Disseminate</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium bg-[#161F33] hover:bg-[#1E293B] text-slate-200 hover:text-white border border-white/[0.08] hover:border-cyan-500/40 transition-all active:scale-95 shadow-sm"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-cyan-400" />}
            <span>{copied ? 'Copied!' : 'Copy Report'}</span>
          </button>

          <button
            type="button"
            onClick={handleExportMarkdown}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium bg-[#161F33] hover:bg-[#1E293B] text-slate-200 hover:text-white border border-white/[0.08] hover:border-emerald-500/40 transition-all active:scale-95 shadow-sm"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Download Report (.md)</span>
          </button>
        </div>
      </div>

      {/* 2. Summary Section */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          <span>Summary</span>
        </h3>
        <div className="p-4 sm:p-5 rounded-xl bg-[#090D16]/90 border border-white/[0.06] text-sm text-slate-200 leading-relaxed font-sans shadow-inner">
          {summaryText}
        </div>
      </div>

      {/* 3. Key Findings Cards */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
          <BookmarkCheck className="w-4 h-4" />
          <span>Key Findings ({keyFindingsList.length})</span>
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {keyFindingsList.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[#090D16]/80 border border-white/[0.06] hover:border-white/[0.1] text-xs sm:text-sm space-y-2.5 transition-all shadow-sm"
            >
              <div className="flex items-start gap-3 text-slate-200">
                <span className="font-mono text-emerald-400 font-bold text-sm bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                  {idx + 1}
                </span>
                <p className="leading-relaxed flex-1">{item.finding || item}</p>
              </div>

              {/* Source tags */}
              {item.sources && item.sources.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 pl-9 pt-1">
                  <span className="text-[11px] text-slate-400 font-medium">Verified by:</span>
                  {item.sources.map((src, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[11px] font-sans px-2.5 py-0.5 rounded-md bg-[#161F33] border border-emerald-600/50 text-emerald-300 font-medium"
                    >
                      {src}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 4. Sources Used */}
      {sourcesList.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
            <Globe className="w-4 h-4" />
            <span>Sources Used ({sourcesList.length})</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {sourcesList.map((src, idx) => {
              const isUploaded = src.type === 'uploaded_doc' || src.url?.startsWith('local://');

              return (
                <div
                  key={src.id || idx}
                  className="p-3.5 rounded-xl bg-[#090D16]/75 border border-white/[0.06] flex items-center justify-between gap-3 text-xs"
                >
                  <div className="truncate flex-1">
                    <span className="font-medium text-slate-200 truncate block">{src.label}</span>
                    <span className="text-[11px] text-slate-400">
                      {isUploaded ? 'Your Uploaded Document' : 'Academic & Web Encyclopedia'}
                      {src.year ? ` • ${src.year}` : ''}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                        isUploaded
                          ? 'bg-violet-950 text-violet-300 border border-violet-700/60'
                          : 'bg-cyan-950 text-cyan-300 border border-cyan-700/60'
                      }`}
                    >
                      {isUploaded ? 'Document' : 'Web'}
                    </span>
                    {src.url && src.url.startsWith('http') && (
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-400 hover:text-cyan-300 p-1 transition-colors"
                        title="Open external source in new tab"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. Clickable Follow-Up Questions */}
      {openQuestionsList.length > 0 && (
        <div className="space-y-3 pt-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-violet-400 flex items-center gap-2">
            <HelpCircle className="w-4 h-4" />
            <span>Suggested Follow-Up Questions (Click to Ask)</span>
          </h3>
          <div className="grid grid-cols-1 gap-2">
            {openQuestionsList.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectFollowUp?.(q)}
                className="flex items-center justify-between p-3 rounded-xl bg-[#090D16]/80 hover:bg-[#161F33] border border-white/[0.06] hover:border-violet-500/50 text-xs sm:text-sm text-slate-300 hover:text-violet-200 text-left transition-all group active:scale-[0.99]"
              >
                <span className="leading-snug">{q}</span>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-violet-400 group-hover:translate-x-1 transition-all flex-shrink-0 ml-2" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
