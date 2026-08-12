import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const DwelloProblemSolution: React.FC = () => {
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
    <div ref={containerRef} className="w-full max-w-[880px] space-y-8">
      {/* 1. Engineering Challenges Section */}
      <div className="space-y-2.5 w-full">
        <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#E8EEF5]">
          Engineering Challenges
        </h2>
        <div className="space-y-2 font-sans text-sm text-[#A7B5C7]/90 leading-relaxed">
          <p>
            Traditional rental platforms suffer from cluttered UIs, slow filtering, and delayed listing sync. Technically, building a rental marketplace requires coordinating booking timelines, media collections, property pricing, and real-time state across client and server nodes.
          </p>
        </div>
      </div>

      {/* 2. Technical Approach Section */}
      <div className="space-y-2.5 w-full">
        <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#E8EEF5]">
          Technical Approach
        </h2>
        <div className="space-y-2 font-sans text-sm text-[#A7B5C7]/90 leading-relaxed">
          <p>
            Designed as a responsive full-stack web application using server-rendered EJS templates and client-side JavaScript for fluid property search. The backend features Express REST APIs connected to a MongoDB document store to handle user authentication, property management, and booking state with clear data boundaries.
          </p>
        </div>
      </div>
    </div>
  );
};
