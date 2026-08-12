import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const REFLECTIONS = [
  {
    challenge: 'Dynamic Property Filter Responsiveness',
    challengeDesc:
      'Filtering property arrays on keypress caused input lag on mobile viewports.',
    solutionDesc:
      'Implemented debounced input listeners and optimized client JavaScript filtering.',
  },
  {
    challenge: 'Image Asset Loading & Aspect Shift',
    challengeDesc:
      'High-resolution listing images caused layout shifts during dynamic load.',
    solutionDesc:
      'Designed fixed aspect-ratio containers with skeleton loading states.',
  },
];

export const DwelloChallenges: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        itemRefs.current,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
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
    <div ref={containerRef} className="w-full max-w-2xl">
      <div className="mb-3">
        <span className="font-mono text-xs font-semibold tracking-[0.2em] text-[#6DB8F5] uppercase">
          CHALLENGES &amp; SOLUTIONS
        </span>
      </div>

      <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#E8EEF5] mb-6">
        Engineering Reflections
      </h2>

      {/* Unboxed Engineering Reflections Format */}
      <div className="space-y-8">
        {REFLECTIONS.map((ref, idx) => (
          <div
            key={ref.challenge}
            ref={(el) => {
              itemRefs.current[idx] = el;
            }}
            className="space-y-3"
          >
            <div>
              <span className="font-mono text-xs font-bold text-[#6DB8F5] uppercase tracking-wider block mb-1">
                CHALLENGE: {ref.challenge}
              </span>
              <p className="font-sans text-xs sm:text-sm text-[#A7B5C7]/80 leading-relaxed">
                {ref.challengeDesc}
              </p>
            </div>

            <div>
              <span className="font-mono text-xs font-bold text-[#E8EEF5] uppercase tracking-wider block mb-1">
                SOLUTION
              </span>
              <p className="font-sans text-xs sm:text-sm text-[#E8EEF5]/90 leading-relaxed font-medium">
                {ref.solutionDesc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
