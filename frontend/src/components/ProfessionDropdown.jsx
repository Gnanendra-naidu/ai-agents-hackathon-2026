import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { PROFESSIONS, getProfessionById } from '../constants/professions';

export default function ProfessionDropdown({
  selectedProfession = 'Students',
  onSelectProfession,
  compact = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const activeProf = getProfessionById(selectedProfession);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (prof) => {
    onSelectProfession?.(prof.value || prof.id);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* 1. Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`group relative flex items-center justify-between gap-3 text-left transition-all duration-300 rounded-xl border bg-[#0d1322]/95 hover:bg-[#131b2e] active:scale-[0.98] shadow-md backdrop-blur-md cursor-pointer ${
          compact ? 'px-3 py-1.5 min-w-[170px]' : 'px-3.5 py-2 min-w-[210px]'
        } ${activeProf.theme.borderAccent} hover:border-white/20 ${activeProf.theme.focusRing} focus:outline-none`}
      >
        {/* Left: Icon Badge & Labels */}
        <div className="flex items-center gap-2.5">
          <div
            className={`flex items-center justify-center rounded-lg text-sm transition-transform duration-300 group-hover:scale-105 shadow-inner ${
              compact ? 'w-6 h-6 text-xs' : 'w-8 h-8 text-base'
            } ${activeProf.theme.heroTag}`}
          >
            <span>{activeProf.icon}</span>
          </div>

          <div>
            {!compact && (
              <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 leading-none">
                Active Profession
              </span>
            )}
            <span
              className={`block font-bold tracking-tight text-slate-100 transition-colors duration-300 ${
                compact ? 'text-xs' : 'text-sm mt-0.5'
              }`}
            >
              {activeProf.label}
            </span>
          </div>
        </div>

        {/* Right: Theme Dot & Animated Chevron */}
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full shadow-sm ${activeProf.theme.dotColor}`}
            title={`Active Theme: ${activeProf.theme.name}`}
          />
          <ChevronDown
            className={`w-4 h-4 text-slate-400 group-hover:text-slate-200 transition-transform duration-300 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>

      {/* 2. Floating Dropdown Menu */}
      {isOpen && (
        <div
          role="listbox"
          tabIndex={-1}
          className="absolute right-0 sm:left-0 sm:right-auto mt-2 w-72 sm:w-80 rounded-2xl bg-[#0b101c]/98 border border-white/[0.12] shadow-2xl backdrop-blur-xl z-50 p-2 space-y-1 animate-in fade-in zoom-in-95 duration-200 focus:outline-none ring-1 ring-white/10"
        >
          <div className="px-2.5 py-1.5 border-b border-white/[0.06] flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Select Your Role &amp; Perspective
            </span>
            <span className="text-[10px] font-mono text-slate-500">
              4 Dynamic Themes
            </span>
          </div>

          <div className="pt-1 space-y-1">
            {PROFESSIONS.map((prof) => {
              const isSelected = activeProf.id === prof.id;

              return (
                <button
                  key={prof.id}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(prof)}
                  className={`w-full flex items-start justify-between gap-3 p-2.5 rounded-xl text-left transition-all duration-200 cursor-pointer border ${
                    isSelected
                      ? `${prof.theme.rowActiveBg} shadow-sm`
                      : `border-transparent ${prof.theme.rowHoverBg} text-slate-300 hover:text-slate-100`
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Role Icon inside subtle pill */}
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center text-base flex-shrink-0 border transition-all ${
                        isSelected
                          ? `${prof.theme.heroTag} border-current/40`
                          : 'bg-[#161F33] border-white/[0.06] text-slate-300'
                      }`}
                    >
                      <span>{prof.icon}</span>
                    </div>

                    {/* Role Name & Subtitle */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-100">
                          {prof.label}
                        </span>
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${prof.theme.dotColor}`}
                        />
                      </div>
                      <p className="text-[11px] text-slate-400 leading-snug mt-0.5 line-clamp-2">
                        {prof.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Checkmark when selected */}
                  {isSelected && (
                    <div className={`p-1 rounded-full ${prof.theme.textAccent}`}>
                      <Check className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
