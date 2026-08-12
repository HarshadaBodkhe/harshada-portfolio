import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const RESULTS = [
  'Dual Recruiter & Engineer workspaces without page reloads.',
  'Smooth GSAP-driven transitions and scrollytelling.',
  'Lightweight, zero-error production build performance.',
];

const FUTURE_SCOPES = [
  'Interactive code sandbox preview.',
  'Live test coverage telemetry overlay.',
  'Dynamic case study feedback analytics.',
];

export const PortfolioResultsFuture: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full max-w-[880px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* LEFT COLUMN: Key Outcome */}
        <div className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold tracking-tight text-[#E8EEF5]">
            Key Outcome
          </h2>

          <ul className="space-y-2 font-sans text-xs sm:text-sm text-[#A7B5C7]/90 leading-relaxed">
            {RESULTS.map((res, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-[#6DB8F5] shrink-0 font-bold">&bull;</span>
                <span>{res}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT COLUMN: Future Scope */}
        <div className="space-y-3">
          <h3 className="text-base sm:text-lg font-bold tracking-tight text-[#E8EEF5]">
            Future Enhancements
          </h3>

          <ul className="space-y-2 font-sans text-xs sm:text-sm text-[#A7B5C7]/90 leading-relaxed">
            {FUTURE_SCOPES.map((scope, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-[#6DB8F5] shrink-0 font-bold">&bull;</span>
                <span>{scope}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
