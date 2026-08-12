import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FUNCTIONALITIES = [
  {
    num: '01',
    name: 'Interactive Search & Dynamic Filtering',
    desc: 'Provides real-time search capabilities allowing users to filter property listings by location, stay category, and price range.',
  },
  {
    num: '02',
    name: 'Property Listing & Asset Showcase',
    desc: 'Detailed property view featuring responsive layout galleries, host details, amenity tags, and structured pricing breakdowns.',
  },
  {
    num: '03',
    name: 'Reservation & Booking Engine',
    desc: 'Enables users to select check-in and check-out dates, automatically calculating stay totals and managing booking state.',
  },
  {
    num: '04',
    name: 'User Authentication & Account Management',
    desc: 'Secure user registration and session management allowing hosts to manage property listings and guests to view booking histories.',
  },
];

export const DwelloFunctionalities: React.FC = () => {
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
          stagger: 0.12,
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
          CORE FUNCTIONALITIES
        </span>
      </div>

      <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#E8EEF5] mb-6">
        Platform System Capabilities
      </h2>

      {/* Clean Unboxed Editorial List */}
      <div className="space-y-6">
        {FUNCTIONALITIES.map((func, idx) => (
          <div
            key={func.num}
            ref={(el) => {
              itemRefs.current[idx] = el;
            }}
            className="flex items-start gap-4 pb-4 border-b border-[#1B3047]/40 last:border-b-0"
          >
            <span className="font-mono text-xs font-bold text-[#6DB8F5] shrink-0 pt-0.5">
              {func.num}
            </span>
            <div>
              <h4 className="font-mono text-sm font-bold text-[#E8EEF5] mb-1">
                {func.name}
              </h4>
              <p className="font-sans text-xs sm:text-sm text-[#A7B5C7]/80 leading-relaxed">
                {func.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
