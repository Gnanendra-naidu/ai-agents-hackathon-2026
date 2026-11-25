import { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  X,
  Sparkles,
  ArrowRight,
  Globe,
  Database,
  FileText,
  ShieldCheck,
  CheckCircle2,
  BookmarkCheck,
  Search
} from 'lucide-react';
import { getProfessionById } from '../constants/professions';

// Optional: Paste a real .mp4 video URL or embed URL here anytime
export const CUSTOM_DEMO_VIDEO_URL = '';

export default function WelcomeIntro({
  isOpen = true,
  onClose,
  selectedProfession = 'Students',
  onStartResearch,
}) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeScene, setActiveScene] = useState(0); // 0, 1, 2, 3
  const [typedText, setTypedText] = useState('');
  const activeProf = getProfessionById(selectedProfession);

  const fullPromptText = 'Impact of multi-agent AI on research accuracy';

  // 12-second total loop: 4 scenes, 3 seconds each
  useEffect(() => {
    if (!isOpen || !isPlaying || CUSTOM_DEMO_VIDEO_URL) return;

    const interval = setInterval(() => {
      setActiveScene((prev) => (prev + 1) % 4);
    }, 3000);

    return () => clearInterval(interval);
  }, [isOpen, isPlaying]);

  // Typing effect for Scene 0
  useEffect(() => {
    if (!isOpen || CUSTOM_DEMO_VIDEO_URL) return;

    if (activeScene === 0) {
      let index = 0;
      const typeInterval = setInterval(() => {
        if (index <= fullPromptText.length) {
          setTypedText(fullPromptText.slice(0, index));
          index++;
        } else {
          clearInterval(typeInterval);
        }
      }, 55);
      return () => {
        clearInterval(typeInterval);
        setTypedText('');
      };
    }
  }, [activeScene, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="relative bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-lg backdrop-blur-xl transition-all duration-300 animate-in fade-in slide-in-from-top-3">
      {/* Top Banner Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className={`p-2 rounded-xl text-white shadow-xs bg-gradient-to-tr ${activeProf.theme.accentGradient}`}>
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                How Agentic Mode-AI Works
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 font-semibold">
                12s Interactive Walkthrough
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Watch our dual-tool autonomous research loop synthesize cited reports in real time.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {!CUSTOM_DEMO_VIDEO_URL && (
            <button
              type="button"
              onClick={() => setIsPlaying((p) => !p)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200 cursor-pointer"
              title={isPlaying ? 'Pause Animation' : 'Play Animation'}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-slate-600" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-slate-600 fill-slate-600" />
                  <span>Play</span>
                </>
              )}
            </button>
          )}

          <button
            type="button"
            onClick={onStartResearch || onClose}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold ${activeProf.theme.buttonPrimary} shadow-xs transition-all active:scale-95 cursor-pointer`}
          >
            <span>Skip / Start Research</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Dismiss walkthrough"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Preview Container */}
      <div className="mt-4">
        {CUSTOM_DEMO_VIDEO_URL ? (
          // Custom Video Embed / Player
          <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-200 shadow-inner">
            <video
              src={CUSTOM_DEMO_VIDEO_URL}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          // Fast-Loading Hardware-Accelerated 4-Scene Animation Canvas
          <div className="relative h-56 sm:h-52 w-full rounded-xl bg-slate-50/70 border border-slate-200 p-4 sm:p-5 flex flex-col justify-between overflow-hidden shadow-2xs">
            {/* Scene Indicators (Top Pills) */}
            <div className="flex items-center justify-between gap-2 border-b border-slate-200/60 pb-2.5">
              {[
                { id: 0, label: '1. Ask Question' },
                { id: 1, label: '2. Search Dual Tools' },
                { id: 2, label: '3. Ground Citations' },
                { id: 3, label: '4. Executive Report' },
              ].map((step) => {
                const isCurrent = activeScene === step.id;
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => {
                      setActiveScene(step.id);
                      setIsPlaying(false);
                    }}
                    className={`flex-1 text-center py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                      isCurrent
                        ? `${activeProf.theme.activeTab} shadow-xs`
                        : 'text-slate-500 hover:text-slate-800 bg-white/70 border border-slate-200/80'
                    }`}
                  >
                    {step.label}
                  </button>
                );
              })}
            </div>

            {/* Scene Animated Content */}
            <div className="flex-1 flex items-center justify-center my-auto py-2">
              {/* Scene 0: User Asks Research Question */}
              {activeScene === 0 && (
                <div className="w-full max-w-lg space-y-2 animate-in fade-in zoom-in-95 duration-300">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                      <Search className="w-3.5 h-3.5 text-cyan-600" />
                      <span>Inputting Research Goal:</span>
                    </span>
                    <span className="font-mono text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
                      {activeProf.label} Mode Active
                    </span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-white border border-slate-300 rounded-xl shadow-xs">
                    <span className="text-slate-900 font-medium text-xs sm:text-sm font-sans flex-1">
                      {typedText}
                      <span className="inline-block w-1.5 h-4 bg-cyan-600 ml-0.5 animate-pulse" />
                    </span>
                    <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold text-white shadow-xs ${activeProf.theme.buttonPrimary}`}>
                      Enter
                    </span>
                  </div>
                </div>
              )}

              {/* Scene 1: Dual-Tool Execution (Crossref + Wikipedia + Notes) */}
              {activeScene === 1 && (
                <div className="w-full max-w-xl grid grid-cols-1 sm:grid-cols-3 gap-2.5 animate-in fade-in zoom-in-95 duration-300">
                  <div className="p-3 bg-white border border-cyan-200 rounded-xl shadow-xs text-center space-y-1 transform hover:scale-102 transition-transform">
                    <div className="w-7 h-7 mx-auto rounded-lg bg-cyan-50 text-cyan-700 flex items-center justify-center border border-cyan-200">
                      <Globe className="w-4 h-4 animate-spin" />
                    </div>
                    <span className="text-xs font-bold text-slate-900 block">Crossref API</span>
                    <span className="text-[10px] text-cyan-700 font-mono">Academic Papers</span>
                  </div>

                  <div className="p-3 bg-white border border-emerald-200 rounded-xl shadow-xs text-center space-y-1 transform hover:scale-102 transition-transform">
                    <div className="w-7 h-7 mx-auto rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
                      <Database className="w-4 h-4 animate-bounce" />
                    </div>
                    <span className="text-xs font-bold text-slate-900 block">Wikipedia REST</span>
                    <span className="text-[10px] text-emerald-700 font-mono">Open Knowledge</span>
                  </div>

                  <div className="p-3 bg-white border border-violet-200 rounded-xl shadow-xs text-center space-y-1 transform hover:scale-102 transition-transform">
                    <div className="w-7 h-7 mx-auto rounded-lg bg-violet-50 text-violet-700 flex items-center justify-center border border-violet-200">
                      <FileText className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-900 block">Knowledge Base</span>
                    <span className="text-[10px] text-violet-700 font-mono">Uploaded Notes</span>
                  </div>
                </div>
              )}

              {/* Scene 2: Fact-Checking & Grounding */}
              {activeScene === 2 && (
                <div className="w-full max-w-lg p-3.5 bg-white border border-emerald-300 rounded-xl shadow-xs space-y-2 animate-in fade-in zoom-in-95 duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 animate-pulse" />
                      <span className="text-xs font-bold text-slate-900">
                        Human-in-the-Loop Fact-Checking Engine
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      100% Grounded
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-700">
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-800 bg-slate-50 px-2 py-1 rounded-md border border-slate-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      3/3 Sub-Questions Verified
                    </span>
                    <span className="px-2 py-0.5 rounded font-mono text-[11px] font-bold bg-cyan-50 text-cyan-800 border border-cyan-200">
                      [KB1] Benchmark Telemetry
                    </span>
                    <span className="px-2 py-0.5 rounded font-mono text-[11px] font-bold bg-violet-50 text-violet-800 border border-violet-200">
                      [W1] IEEE / Crossref 2024
                    </span>
                  </div>
                </div>
              )}

              {/* Scene 3: Synthesized Cited Report Ready */}
              {activeScene === 3 && (
                <div className="w-full max-w-lg p-3.5 bg-white border border-slate-300 rounded-xl shadow-md space-y-2 animate-in fade-in zoom-in-95 duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <BookmarkCheck className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs font-bold text-slate-900">
                        Executive Report Synthesized
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={onStartResearch || onClose}
                      className={`px-3 py-1 text-[11px] font-bold rounded-lg text-white shadow-xs ${activeProf.theme.buttonPrimary} cursor-pointer`}
                    >
                      Try It Now ↓
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug line-clamp-2">
                    "Autonomous agent networks achieve 94.2% factual recall when paired with human-in-the-loop guardrails [KB1], reducing latency by 42% [W1]."
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Progress Bar Track */}
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden relative">
              <div
                className={`h-full transition-all duration-300 rounded-full ${
                  activeProf.theme.dotColor
                }`}
                style={{ width: `${((activeScene + 1) / 4) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
