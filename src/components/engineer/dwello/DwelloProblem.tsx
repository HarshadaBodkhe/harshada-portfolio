import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const DwelloProblem: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
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
          THE PROBLEM
        </span>
      </div>

      <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#E8EEF5] mb-4">
        Streamlining Property Discovery &amp; Reservation Workflows
      </h2>

      <div className="space-y-2 font-sans text-sm text-[#A7B5C7]/90 leading-relaxed">
        <p>
          Traditional rental platforms suffer from cluttered UIs, slow filtering, and delayed listing sync. Technically, building a rental marketplace requires coordinating booking timelines, media collections, property pricing, and real-time state across client and server nodes.
        </p>
      </div>
    </div>
  );
};
