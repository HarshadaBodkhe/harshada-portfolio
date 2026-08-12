import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export type WorkspaceMode = 'recruiter' | 'engineer';

export interface WorkspaceSelectorProps {
  selectedWorkspace?: WorkspaceMode;
  onSelectWorkspace?: (mode: WorkspaceMode) => void;
  align?: 'left' | 'right';
}

export const WorkspaceSelector: React.FC<WorkspaceSelectorProps> = ({
  selectedWorkspace: propSelectedWorkspace,
  onSelectWorkspace,
  align = 'right',
}) => {
  const [internalWorkspace, setInternalWorkspace] = useState<WorkspaceMode>('recruiter');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedWorkspace = propSelectedWorkspace !== undefined ? propSelectedWorkspace : internalWorkspace;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSelect = (mode: WorkspaceMode) => {
    if (onSelectWorkspace) {
      onSelectWorkspace(mode);
    } else {
      setInternalWorkspace(mode);
    }
    setIsOpen(false);
  };

  const getTriggerLabel = () => {
    if (selectedWorkspace === 'engineer') return 'Engineer Workspace';
    return 'Recruiter Workspace';
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Blue Styled Workspace Selection Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="inline-flex items-center gap-2.5 px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-mono font-medium rounded-xl bg-[var(--bg-secondary)] backdrop-blur-md border border-[var(--accent)]/35 text-[var(--accent)] hover:border-[var(--accent)]/70 hover:bg-[var(--bg-surface)] transition-all duration-250 shadow-sm"
      >
        <span className="font-semibold tracking-wide">
          {getTriggerLabel()}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-[var(--accent)] transition-transform duration-250 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Blue Styled Dropdown Menu */}
      {isOpen && (
        <div
          role="listbox"
          className={`absolute ${
            align === 'left' ? 'left-0' : 'right-0'
          } mt-2 w-52 sm:w-56 rounded-xl bg-[var(--bg-secondary)] backdrop-blur-xl border border-[var(--border-subtle)] shadow-2xl z-50 p-1.5 focus:outline-none transition-all duration-200`}
        >
          <button
            type="button"
            role="option"
            aria-selected={selectedWorkspace === 'recruiter'}
            onClick={() => handleSelect('recruiter')}
            className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-mono transition-all duration-150 flex items-center justify-between ${
              selectedWorkspace === 'recruiter'
                ? 'bg-[var(--bg-surface)] border-l-2 border-[var(--accent)] text-[var(--accent)] font-semibold shadow-sm'
                : 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface)]/80 hover:text-[var(--accent)]'
            }`}
          >
            <span>Recruiter Workspace</span>
            {selectedWorkspace === 'recruiter' && (
              <Check className="w-3.5 h-3.5 text-[var(--accent)]" />
            )}
          </button>

          <button
            type="button"
            role="option"
            aria-selected={selectedWorkspace === 'engineer'}
            onClick={() => handleSelect('engineer')}
            className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-mono transition-all duration-150 flex items-center justify-between mt-1 ${
              selectedWorkspace === 'engineer'
                ? 'bg-[var(--bg-surface)] border-l-2 border-[var(--accent)] text-[var(--accent)] font-semibold shadow-sm'
                : 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface)]/80 hover:text-[var(--accent)]'
            }`}
          >
            <span>Engineer Workspace</span>
            {selectedWorkspace === 'engineer' && (
              <Check className="w-3.5 h-3.5 text-[var(--accent)]" />
            )}
          </button>
        </div>
      )}
    </div>
  );
};

