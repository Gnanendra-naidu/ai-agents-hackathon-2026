import { STATUS_CONFIGS, AGENT_STATUS } from '../../utils/constants';

export default function StatusBadge({ status = AGENT_STATUS.IDLE, customLabel = null, className = '' }) {
  const config = STATUS_CONFIGS[status] || STATUS_CONFIGS[AGENT_STATUS.IDLE];
  const label = customLabel || config.label;

  return (
    <span
      className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium border ${config.bg} ${config.text} ${config.border} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      <span>{label}</span>
    </span>
  );
}
