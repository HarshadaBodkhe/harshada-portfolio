import React, { useEffect, useState } from 'react';
import type { DomainType } from './engineerProjectsData';

interface FloatingDomainSelectorProps {
  domain: DomainType;
  onDomainChange: (domain: DomainType) => void;
}

export const FloatingDomainSelector: React.FC<FloatingDomainSelectorProps> = ({
  domain,
  onDomainChange,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const projectsSection = document.getElementById('engineer-projects-section');
      if (projectsSection) {
        const rect = projectsSection.getBoundingClientRect();
        // Visible once the projects section heading approaches top of viewport (within 400px)
        setIsVisible(rect.top <= window.innerHeight - 150);
      } else {
        setIsVisible(window.scrollY > 350);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Right Side Floating Indicator / Selector (Scroll-aware) */}
      <aside
        aria-label="Domain navigation"
        className={`hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-5 py-2 font-mono text-xs tracking-wider uppercase select-none transition-all duration-300 ease-out ${
          isVisible
            ? 'opacity-100 translate-x-0 pointer-events-auto'
            : 'opacity-0 translate-x-6 pointer-events-none'
        }`}
      >
        {/* Domain Label Indicator */}
        <span className="text-[10px] text-[var(--text-muted)] tracking-[0.2em] font-medium mb-1">
          DOMAIN
        </span>

        {/* Full Stack Option */}
        <button
          onClick={() => onDomainChange('fullstack')}
          title="Switch to Full Stack Development"
          className="group flex items-center gap-3 transition-all text-right focus:outline-none"
        >
          <span
            className={`transition-colors duration-200 ${
              domain === 'fullstack'
                ? 'text-[var(--accent)] font-bold tracking-widest'
                : 'text-[var(--text-secondary)]/70 group-hover:text-[var(--text-primary)]'
            }`}
          >
            Full Stack
          </span>
          <span
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              domain === 'fullstack'
                ? 'bg-[var(--accent)] shadow-[0_0_10px_var(--accent)] scale-110'
                : 'bg-[var(--border-subtle)] group-hover:bg-[var(--accent)]/50'
            }`}
          />
        </button>

        {/* AI / ML Option */}
        <button
          onClick={() => onDomainChange('aiml')}
          title="Switch to AI / ML"
          className="group flex items-center gap-3 transition-all text-right focus:outline-none"
        >
          <span
            className={`transition-colors duration-200 ${
              domain === 'aiml'
                ? 'text-[var(--accent)] font-bold tracking-widest'
                : 'text-[var(--text-secondary)]/70 group-hover:text-[var(--text-primary)]'
            }`}
          >
            AI / ML
          </span>
          <span
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              domain === 'aiml'
                ? 'bg-[var(--accent)] shadow-[0_0_10px_var(--accent)] scale-110'
                : 'bg-[var(--border-subtle)] group-hover:bg-[var(--accent)]/50'
            }`}
          />
        </button>
      </aside>

      {/* Mobile Floating Bottom Bar (Scroll-aware) */}
      <div
        className={`flex lg:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-40 items-center gap-3 px-4 py-2 rounded-full bg-[var(--bg-secondary)] backdrop-blur-md border border-[var(--border-subtle)] shadow-xl font-mono text-xs transition-all duration-300 ease-out ${
          isVisible
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-6 pointer-events-none'
        }`}
      >
        <button
          onClick={() => onDomainChange('fullstack')}
          className={`flex items-center gap-1.5 transition-colors ${
            domain === 'fullstack' ? 'text-[var(--accent)] font-bold' : 'text-[var(--text-secondary)]'
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${domain === 'fullstack' ? 'bg-[var(--accent)]' : 'bg-[var(--border-subtle)]'}`} />
          <span>Full Stack</span>
        </button>

        <span className="text-[var(--border-subtle)]">&bull;</span>

        <button
          onClick={() => onDomainChange('aiml')}
          className={`flex items-center gap-1.5 transition-colors ${
            domain === 'aiml' ? 'text-[var(--accent)] font-bold' : 'text-[var(--text-secondary)]'
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${domain === 'aiml' ? 'bg-[var(--accent)]' : 'bg-[var(--border-subtle)]'}`} />
          <span>AI / ML</span>
        </button>
      </div>
    </>
  );
};
