export const AGENT_STATUS = {
  IDLE: 'idle',
  PLANNING: 'planning',
  EXECUTING: 'executing',
  AWAITING_APPROVAL: 'awaiting_approval',
  COMPLETED: 'completed',
  FAILED: 'failed',
  PAUSED: 'paused',
};

export const STEP_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  FAILED: 'failed',
  SKIPPED: 'skipped',
};

export const TRACE_TYPE = {
  THOUGHT: 'thought',
  TOOL_CALL: 'tool_call',
  OBSERVATION: 'observation',
  APPROVAL: 'approval',
  SYSTEM: 'system',
  ERROR: 'error',
};

export const RISK_LEVEL = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
};

export const SUGGESTED_GOALS = [
  'Analyze customer feedback trends and draft an executive action plan',
  'Audit database records, flag anomalies, and prepare migration payload',
  'Research competitive landscape for AI agents and summarize key differentiators',
];

export const STATUS_CONFIGS = {
  [AGENT_STATUS.IDLE]: {
    label: 'Ready',
    bg: 'bg-slate-800/80',
    text: 'text-slate-300',
    border: 'border-slate-700',
    dot: 'bg-slate-400',
  },
  [AGENT_STATUS.PLANNING]: {
    label: 'Planning',
    bg: 'bg-indigo-950/60',
    text: 'text-indigo-400',
    border: 'border-indigo-800',
    dot: 'bg-indigo-400 animate-pulse',
  },
  [AGENT_STATUS.EXECUTING]: {
    label: 'Executing',
    bg: 'bg-blue-950/60',
    text: 'text-blue-400',
    border: 'border-blue-800',
    dot: 'bg-blue-400 animate-ping',
  },
  [AGENT_STATUS.AWAITING_APPROVAL]: {
    label: 'Action Required',
    bg: 'bg-amber-950/60',
    text: 'text-amber-400',
    border: 'border-amber-700',
    dot: 'bg-amber-400 animate-bounce',
  },
  [AGENT_STATUS.COMPLETED]: {
    label: 'Completed',
    bg: 'bg-emerald-950/60',
    text: 'text-emerald-400',
    border: 'border-emerald-800',
    dot: 'bg-emerald-400',
  },
  [AGENT_STATUS.FAILED]: {
    label: 'Failed',
    bg: 'bg-rose-950/60',
    text: 'text-rose-400',
    border: 'border-rose-800',
    dot: 'bg-rose-400',
  },
  [AGENT_STATUS.PAUSED]: {
    label: 'Paused',
    bg: 'bg-zinc-800',
    text: 'text-zinc-400',
    border: 'border-zinc-700',
    dot: 'bg-zinc-400',
  },
};
