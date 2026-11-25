import {
  Bot,
  Shield,
  Zap,
  Activity,
  ArrowRight,
  Sparkles,
  Layers,
  Eye,
} from 'lucide-react';

export default function LandingPage({ onLaunchStudio }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500/30">
      <section className="relative pt-20 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-700/50 bg-indigo-950/60 text-indigo-300 text-xs font-medium mb-8 backdrop-blur-md shadow-lg shadow-indigo-950/50">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>AI Agents Hackathon Edition • Production-Ready Architecture</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Autonomous AI Agents with <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">
              Verifiable Traces & Human Safety
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            A resilient agentic execution loop powered by Gemini and Supabase. Inspect live reasoning thoughts, monitor external tool observations, and enforce approvals on high-risk operations.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onLaunchStudio}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white shadow-xl shadow-indigo-600/30 transition-all active:scale-95"
            >
              <Zap className="w-4 h-4" />
              <span>Launch Agent Studio</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <a
              href="#architecture"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-all"
            >
              <Eye className="w-4 h-4 text-slate-400" />
              <span>Explore Architecture</span>
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-900 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-2">
              Engine Capabilities
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Built for Demanding Autonomous Workflows
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all">
              <div className="w-10 h-10 rounded-xl bg-indigo-950/80 border border-indigo-800/80 text-indigo-400 flex items-center justify-center mb-4">
                <Bot className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-white mb-2">Dynamic Planning</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Decomposes high-level objectives into granular steps. Allows humans to edit or augment the plan in real-time.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all">
              <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-800/80 text-purple-400 flex items-center justify-center mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-white mb-2">Real Tool Calling</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Connects directly to external APIs, databases, and custom functions with strict schema validation.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-800/80 text-amber-400 flex items-center justify-center mb-4">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-white mb-2">Human-in-the-Loop</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Automatic interception for destructive actions. Approvers can inspect, edit, or reject payloads before execution.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-800/80 text-emerald-400 flex items-center justify-center mb-4">
                <Activity className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-white mb-2">Visible Traces</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Step-by-step reasoning logs, execution duration, and latency inspection so you never have a "black box" agent.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="architecture" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Full-Stack Agent Architecture
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Engineered for hackathon velocity, live demo reliability, and rapid theme adaptation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-850">
              <span className="text-[10px] uppercase font-mono text-indigo-400 font-semibold block mb-1">Frontend Layer</span>
              <p className="text-sm font-semibold text-white">Vite + React 19</p>
              <p className="text-xs text-slate-400 mt-1">Tailwind CSS + Lucide Icons</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-850">
              <span className="text-[10px] uppercase font-mono text-purple-400 font-semibold block mb-1">Agent Intelligence</span>
              <p className="text-sm font-semibold text-white">Gemini API</p>
              <p className="text-xs text-slate-400 mt-1">Function Calling & ReAct</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-850">
              <span className="text-[10px] uppercase font-mono text-emerald-400 font-semibold block mb-1">State & Storage</span>
              <p className="text-sm font-semibold text-white">Supabase PostgreSQL</p>
              <p className="text-xs text-slate-400 mt-1">Session Logs & HITL Queue</p>
            </div>
          </div>

          <div className="mt-8 text-center pt-6 border-t border-slate-800/80">
            <button
              onClick={onLaunchStudio}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25 transition-all"
            >
              <span>Jump Into Studio Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
