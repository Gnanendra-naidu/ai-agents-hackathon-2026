import { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Shield, Cpu } from 'lucide-react';
import { getProfessionById } from '../constants/professions';

// Optional: Set a custom video URL (e.g. .mp4 or stream) to play as a full-bleed splash background
export const CUSTOM_SPLASH_VIDEO_URL = '';

export default function SplashIntro({
  isOpen = true,
  onComplete,
  selectedProfession = 'Students',
}) {
  const [stage, setStage] = useState(1); // 1 = Logo (0-1.5s), 2 = Title (1.5-3.0s), 3 = Start Button (3.0s+)
  const [isExiting, setIsExiting] = useState(false);
  const activeProf = getProfessionById(selectedProfession);

  // Timed 3-stage animation sequence
  useEffect(() => {
    if (!isOpen) return;

    const timer1 = setTimeout(() => {
      setStage(2);
    }, 1500);

    const timer2 = setTimeout(() => {
      setStage(3);
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      setStage(1);
      setIsExiting(false);
    };
  }, [isOpen]);

  const handleStart = () => {
    setIsExiting(true);
    setTimeout(() => {
      onComplete?.();
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between p-6 sm:p-10 transition-all duration-500 overflow-hidden ${
        isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      } bg-slate-100`}
    >
      {/* Optional Full-Bleed Video Background */}
      {CUSTOM_SPLASH_VIDEO_URL ? (
        <video
          src={CUSTOM_SPLASH_VIDEO_URL}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-40"
        />
      ) : (
        /* Cinematic Geometric Grid & Ambient Glows */
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {/* Subtle grid lines */}
          <div
            className="absolute inset-0 opacity-[0.4]"
            style={{
              backgroundImage: `radial-gradient(#94A3B8 1px, transparent 1px), radial-gradient(#94A3B8 1px, #E2E8F0 1px)`,
              backgroundSize: '40px 40px',
              backgroundPosition: '0 0, 20px 20px',
            }}
          />

          {/* Dynamic Ambient Color Orbs */}
          <div
            className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] ${activeProf.theme.glowTop} rounded-full blur-[140px] animate-pulse duration-1000`}
          />
          <div className="absolute bottom-10 right-1/4 w-[450px] h-[350px] bg-violet-400/10 rounded-full blur-[120px]" />
        </div>
      )}

      {/* Top Header Bar with Skip Intro Button */}
      <div className="relative z-10 w-full max-w-6xl flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-slate-500 uppercase">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>Agentic Mode-AI • Cinematic Intro</span>
        </div>

        <button
          type="button"
          onClick={handleStart}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 border border-slate-300 shadow-sm transition-all active:scale-95 cursor-pointer backdrop-blur-md"
        >
          <span>Skip Intro</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Center Cinematic Stage Container */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-3xl my-auto space-y-8">
        {/* Stage 1: Animated Emblem / AI Research Shield Logo */}
        <div
          className={`relative transition-all duration-700 ease-out transform ${
            stage >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
        >
          {/* Animated Glow Rings */}
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-cyan-500/20 via-teal-500/20 to-violet-500/20 blur-xl animate-pulse" />

          {/* Logo Badge Container */}
          <div
            className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr ${activeProf.theme.accentGradient} flex items-center justify-center text-white shadow-2xl ring-4 ring-white/80 transition-transform duration-500 hover:scale-105`}
          >
            <Shield className="w-12 h-12 sm:w-14 sm:h-14 text-white stroke-[1.8] drop-shadow-md" />
            <Cpu className="w-6 h-6 sm:w-7 sm:h-7 text-white/90 absolute bottom-4 right-4 animate-spin duration-3000" />
            <Sparkles className="w-5 h-5 text-amber-200 absolute top-3 right-3 animate-bounce" />
          </div>
        </div>

        {/* Stage 2: Website Brand Title & Subtitle Reveal */}
        <div
          className={`space-y-3 transition-all duration-700 ease-out transform ${
            stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-none">
            Agentic{' '}
            <span
              className={`bg-clip-text text-transparent bg-gradient-to-r ${activeProf.theme.accentGradient}`}
            >
              Mode-AI
            </span>
          </h1>

          <p className="text-base sm:text-xl font-medium text-slate-600 max-w-xl mx-auto leading-relaxed">
            Verified Multi-Agent Research &amp; Fact-Checking Assistant
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white border border-slate-300 text-slate-700 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
              Dual-Tool Architecture
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white border border-slate-300 text-slate-700 shadow-2xs">
              <span>{activeProf.icon}</span>
              <span>{activeProf.label} Mode Active</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white border border-slate-300 text-slate-700 shadow-2xs">
              100% Citation Grounding
            </span>
          </div>
        </div>

        {/* Stage 3: Prominent Interactive "Start" Button Reveal */}
        <div
          className={`transition-all duration-700 ease-out transform ${
            stage >= 3 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-90'
          }`}
        >
          <button
            type="button"
            onClick={handleStart}
            className={`group relative inline-flex items-center justify-center gap-3 px-10 py-4 sm:px-12 sm:py-4.5 rounded-full text-base sm:text-lg font-bold text-white shadow-2xl ${activeProf.theme.buttonPrimary} hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer ring-4 ring-white/50`}
          >
            <span>Start Exploring</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Bottom Footer Info Row */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
        <span>Google Gemini &amp; Deterministic API Hybrid Engine</span>
        <div className="flex items-center gap-4 text-slate-500 font-mono text-[11px]">
          <span>Crossref Works API</span>
          <span>•</span>
          <span>Wikipedia REST</span>
          <span>•</span>
          <span>Supabase PostgreSQL</span>
        </div>
      </div>
    </div>
  );
}
