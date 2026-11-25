import { Loader2 } from 'lucide-react';

export default function LoadingSpinner({ size = 'md', text = '', className = '' }) {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-8 h-8',
    xl: 'w-10 h-10',
  };

  return (
    <div className={`flex items-center gap-2.5 text-slate-400 ${className}`}>
      <Loader2 className={`${sizeMap[size] || sizeMap.md} animate-spin text-indigo-400`} />
      {text && <span className="text-sm font-medium tracking-wide">{text}</span>}
    </div>
  );
}
