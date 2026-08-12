import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ClassLensFunctionalities } from './ClassLensFunctionalities';
import { ClassLensDataArchitecture } from './ClassLensDataArchitecture';

gsap.registerPlugin(ScrollTrigger);

export const ClassLensFunctionalitiesImplementation: React.FC = () => {
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
    <div ref={containerRef} className="w-full max-w-[880px] space-y-16">
      {/* 1. Core Platform Capabilities */}
      <ClassLensFunctionalities />

      {/* 2. Data Architecture & Relational Persistence */}
      <ClassLensDataArchitecture />
    </div>
  );
};
