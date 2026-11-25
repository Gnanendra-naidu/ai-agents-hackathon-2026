import { Bot } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 py-8 px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-indigo-400" />
          <span className="font-semibold text-slate-400">NexusAgent Core</span>
          <span>• 12-Hour AI Agents Hackathon</span>
        </div>

        <div className="flex items-center gap-4 text-slate-500">
          <span>React + Vite</span>
          <span>•</span>
          <span>Tailwind CSS</span>
          <span>•</span>
          <span>Gemini API Ready</span>
        </div>
      </div>
    </footer>
  );
}
