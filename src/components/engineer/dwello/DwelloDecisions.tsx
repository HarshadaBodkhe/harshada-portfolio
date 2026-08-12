import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DECISIONS = [
  {
    choice: 'MongoDB Document Database for Property Metadata',
    why: 'Supports dynamic property attributes (amenities, metadata, pricing) without rigid database migrations.',
  },
  {
    choice: 'Decoupled REST API Architecture',
    why: 'Decouples UI rendering from backend logic for independent deployment and reusable endpoints.',
  },
];

export const DwelloDecisions: React.FC = () => {
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
          TECHNICAL DECISIONS
        </span>
      </div>

      <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#E8EEF5] mb-6">
        Architecture &amp; Design Rationale
      </h2>

      {/* Unboxed Editorial Decisions Format */}
      <div className="space-y-6">
        {DECISIONS.map((dec, idx) => (
          <div
            key={dec.choice}
            ref={(el) => {
              itemRefs.current[idx] = el;
            }}
            className="space-y-1.5"
          >
            <h4 className="font-mono text-sm font-bold text-[#E8EEF5]">
              {dec.choice}
            </h4>
            <p className="font-sans text-xs sm:text-sm text-[#A7B5C7]/85 leading-relaxed">
              {dec.why}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
