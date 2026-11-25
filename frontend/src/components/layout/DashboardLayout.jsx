import { Shield, Terminal, Activity } from 'lucide-react';

export default function DashboardLayout({
  children,
  availableTools = [
    { name: 'web_search', desc: 'Queries live web documents' },
    { name: 'database_query', desc: 'Reads Supabase PostgreSQL tables' },
    { name: 'database_mutate', desc: 'Writes/updates records (Guarded by HITL)' },
    { name: 'notify_dispatch', desc: 'Sends email or webhook alert (Guarded)' },
  ],
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <main className="lg:col-span-8 space-y-6">
            {children}
          </main>

          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg backdrop-blur-md">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                <Activity className="w-4 h-4 text-indigo-400" />
                <span>Runtime Diagnostics</span>
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <span className="text-slate-400">Agent Framework</span>
                  <span className="font-mono text-indigo-300 font-medium">ReAct + Tool Calling</span>
                </div>

                <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <span className="text-slate-400">Model Provider</span>
                  <span className="font-mono text-purple-300 font-medium">Gemini API</span>
                </div>

                <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <span className="text-slate-400">Database Engine</span>
                  <span className="font-mono text-emerald-300 font-medium">Supabase PG</span>
                </div>

                <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <span className="text-slate-400">Guardrail Mode</span>
                  <span className="font-mono text-amber-300 font-medium flex items-center gap-1">
                    <Shield className="w-3 h-3 text-amber-400" />
                    HITL Enabled
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg backdrop-blur-md">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-blue-400" />
                  <span>Available Tools</span>
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                  {availableTools.length} ready
                </span>
              </div>

              <div className="space-y-2.5">
                {availableTools.map((tool, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-850 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-mono font-semibold text-slate-200">
                        {tool.name}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-tight">{tool.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
