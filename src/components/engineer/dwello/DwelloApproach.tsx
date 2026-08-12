import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const DwelloApproach: React.FC = () => {
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
          THE APPROACH
        </span>
      </div>

      <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#E8EEF5] mb-4">
        Full-Stack Modular Architecture &amp; Clean UX
      </h2>

      <div className="space-y-2 font-sans text-sm text-[#A7B5C7]/90 leading-relaxed">
        <p>
          Designed as a responsive full-stack web application using server-rendered EJS templates and client-side JavaScript for fluid property search. The backend features Express REST APIs connected to a MongoDB document store to handle user authentication, property management, and booking state with clear data boundaries.
        </p>
      </div>
    </div>
  );
};
