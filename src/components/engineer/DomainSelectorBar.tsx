import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import type { DomainType } from './engineerProjectsData';
import { DOMAIN_LABELS } from './engineerProjectsData';

interface DomainSelectorBarProps {
  domain: DomainType;
}

export const DomainSelectorBar: React.FC<DomainSelectorBarProps> = ({ domain }) => {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!headingRef.current) return;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
    );
  }, [domain]);

  return (
    <div id="engineer-projects-section" className="w-full max-w-[880px] mx-auto pt-6 pb-2 px-4 sm:px-0">
      {/* Dynamic Section Heading */}
      <div className="text-center space-y-1">
        <span className="font-mono text-[11px] font-medium tracking-[0.25em] text-[#6DB8F5] uppercase">
          PROJECT COLLECTION
        </span>
        <h2
          ref={headingRef}
          className="text-2xl sm:text-3xl font-bold tracking-tight text-[#E8EEF5]"
        >
          Projects under {DOMAIN_LABELS[domain]}
        </h2>
      </div>
    </div>
  );
};
