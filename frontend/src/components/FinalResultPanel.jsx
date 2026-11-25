import { useState } from 'react';
import {
  FileText,
  Copy,
  Check,
  Download,
  HelpCircle,
  Lightbulb,
  BookmarkCheck,
  Globe,
  ExternalLink,
  Send
} from 'lucide-react';

export default function FinalResultPanel({
  report = null,
  metrics = {
    subQuestionsVerified: 0,
    sourcesAnalyzed: 0,
    conflictsReconciled: 0,
    estimatedTokens: 0,
    latencySec: '0.0',
  },
  onRequestExportApproval = null,
  onReset,
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

## Sources
${sourcesList.map((s) => `- [${s.id || 'Src'}] ${s.label} (${s.type || 'source'}) - ${s.url || ''}`).join('\n')}

## Open Questions
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

## Sources
${sourcesList.map((s) => `- [${s.id || 'Src'}] ${s.label} (${s.type || 'source'}) - ${s.url || ''}`).join('\n')}

## Open Questions
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
    <div className="bg-[#111827]/85 border border-cyan-900/60 rounded-2xl p-6 shadow-2xl backdrop-blur-xl transition-all space-y-5">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-950/90 border border-cyan-600/70 text-cyan-400 shadow-md">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-100">
                {report.title || 'Structured Research Report'}
              </h3>
              {report.audience && (
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-950/90 text-cyan-300 border border-cyan-700/80 shadow-sm">
                  Tailored for: {report.audience}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400">Deep synthesis verified against knowledge base and academic retrieval.</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {onRequestExportApproval && (
            <button
              type="button"
              onClick={onRequestExportApproval}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white border border-amber-500/60 transition-all shadow-md active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Export / Publish Verified Report</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-[#161F33] hover:bg-[#1E293B] text-slate-200 border border-white/[0.08] hover:border-cyan-500/40 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
            <span>{copied ? 'Copied' : 'Copy Markdown'}</span>
          </button>

          <button
            type="button"
            onClick={handleExportMarkdown}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-[#161F33] hover:bg-[#1E293B] text-slate-200 border border-white/[0.08] hover:border-cyan-500/40 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Download .md</span>
          </button>
        </div>
      </div>

      {/* 1. Executive Summary */}
      <div className="space-y-2">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
          <Lightbulb className="w-3.5 h-3.5" />
          <span>Executive Summary ({report.audience || 'Target Audience'})</span>
        </h4>
        <div className="p-4 rounded-xl bg-[#090D16]/90 border border-white/[0.06] text-xs text-slate-200 leading-relaxed font-sans shadow-inner">
          {summaryText}
        </div>
      </div>

      {/* 2. Key Findings with Source Tagging */}
      <div className="space-y-2">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
          <BookmarkCheck className="w-3.5 h-3.5" />
          <span>Grounded Key Findings ({keyFindingsList.length})</span>
        </h4>
        <div className="space-y-2.5">
          {keyFindingsList.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-[#090D16]/75 border border-white/[0.06] text-xs space-y-2"
            >
              <div className="flex items-start gap-2 text-slate-200">
                <span className="font-mono text-emerald-400 font-bold">{idx + 1}.</span>
                <p className="leading-relaxed flex-1">{item.finding || item}</p>
              </div>

              {/* Source tags */}
              {item.sources && item.sources.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pl-4 pt-1">
                  <span className="text-[10px] text-slate-400 uppercase font-mono">Sources:</span>
                  {item.sources.map((src, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/70 border border-emerald-700/60 text-emerald-300"
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

      {/* 3. Cataloged Sources (Distinguishing Web vs Uploaded Docs vs Knowledge Base) */}
      {sourcesList.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5" />
            <span>Cataloged Sources & Provenance ({sourcesList.length})</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {sourcesList.map((src, idx) => {
              const isUploaded = src.type === 'uploaded_doc' || src.url?.startsWith('local://');
              const isWeb = src.type === 'web' || src.url?.startsWith('http');

              return (
                <div
                  key={src.id || idx}
                  className="p-3 rounded-xl bg-[#090D16]/70 border border-white/[0.06] flex items-center justify-between gap-2 text-xs"
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#111827] text-slate-300 border border-white/[0.08]">
                      {src.id || `S${idx + 1}`}
                    </span>
                    <div className="truncate">
                      <span className="font-medium text-slate-200 truncate block">{src.label}</span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {src.year ? `${src.year} • ` : ''}
                        {isUploaded ? 'User Uploaded Document' : isWeb ? 'Web / Academic Registry' : 'Knowledge Base Corpus'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase ${
                        isUploaded
                          ? 'bg-violet-950/80 text-violet-300 border border-violet-700/70'
                          : isWeb
                          ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-700/70'
                          : 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/70'
                      }`}
                    >
                      {isUploaded ? 'uploaded_doc' : isWeb ? 'web' : 'knowledge_base'}
                    </span>
                    {src.url && src.url.startsWith('http') && (
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-400 hover:text-cyan-300 transition-colors p-1"
                        title="Open external citation source"
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

      {/* 4. Open Questions */}
      {openQuestionsList.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-violet-400 flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Open Questions & Unresolved Directions ({openQuestionsList.length})</span>
          </h4>
          <div className="p-3.5 rounded-xl bg-[#090D16]/75 border border-white/[0.06] text-xs space-y-1.5">
            {openQuestionsList.map((q, idx) => (
              <div key={idx} className="flex items-start gap-2 text-slate-300">
                <span className="font-mono text-violet-400 font-bold">•</span>
                <p className="leading-relaxed">{q}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Metrics Footer Strip */}
      <div className="pt-3 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-400 font-mono">
        <div className="flex flex-wrap items-center gap-4">
          <span>Verified Sub-Qs: <strong className="text-slate-200">{metrics.subQuestionsVerified}</strong></span>
          <span>Sources Analyzed: <strong className="text-slate-200">{metrics.sourcesAnalyzed}</strong></span>
          <span>Conflicts Reconciled: <strong className="text-slate-200">{metrics.conflictsReconciled}</strong></span>
          <span>Tokens: <strong className="text-slate-200">{metrics.estimatedTokens}</strong></span>
          <span>Latency: <strong className="text-slate-200">{metrics.latencySec}s</strong></span>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="text-slate-500 hover:text-slate-300 underline transition-colors"
        >
          Clear Results
        </button>
      </div>
    </div>
  );
}
