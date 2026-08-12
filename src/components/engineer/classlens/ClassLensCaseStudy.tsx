import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown } from 'lucide-react';

import { ClassLensHeader } from './ClassLensHeader';
import { ClassLensProblemSolution } from './ClassLensProblemSolution';
import { ClassLensResultsFuture } from './ClassLensResultsFuture';
import { ClassLensArchitectureWorkflow } from './ClassLensArchitectureWorkflow';
import { ClassLensFunctionalitiesImplementation } from './ClassLensFunctionalitiesImplementation';
import { ClassLensDecisionsChallenges } from './ClassLensDecisionsChallenges';
import { ClassLensTechStack } from './ClassLensTechStack';
import { ClassLensGallery } from './ClassLensGallery';

gsap.registerPlugin(ScrollTrigger);

export const ClassLensCaseStudy: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const transitionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      if (transitionRef.current) {
        gsap.fromTo(
          transitionRef.current,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: transitionRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="classlens-case-study"
      ref={containerRef}
      className="relative w-full py-8 sm:py-14 px-4 sm:px-8 overflow-hidden flex flex-col items-center bg-transparent"
    >
      {/* Centered Unified Container: Max-width 880px */}
      <div className="w-full max-w-[880px] mx-auto flex flex-col items-center space-y-12 sm:space-y-16">
        {/* 1. Project Header (Reversed: CONTENT LEFT | IMAGE RIGHT) */}
        <ClassLensHeader />

        {/* 2. Problem & Solution Visual Transformation Flow */}
        <ClassLensProblemSolution />

        {/* 3. Key Engineering Results & Future Scope */}
        <ClassLensResultsFuture />

        {/* 4. System Architecture & Recognition Workflow Stream */}
        <ClassLensArchitectureWorkflow />

        {/* 5. Core Platform Functionalities & Data Architecture */}
        <ClassLensFunctionalitiesImplementation />

        {/* 6. Technical Decisions & Engineering Challenges */}
        <ClassLensDecisionsChallenges />

        {/* 7. Verified Tech Stack */}
        <ClassLensTechStack />

        {/* 8. Media Gallery */}
        <ClassLensGallery />

        {/* 9. End of Case Study / Next Project Transition */}
        <div
          ref={transitionRef}
          className="w-full pt-10 border-t border-[#1B3047]/30 flex flex-col items-center space-y-2 text-center"
        >
          <span className="font-mono text-xs font-semibold tracking-[0.25em] text-[#6DB8F5] uppercase">
            NEXT PROJECT
          </span>
          <p className="text-xs text-[#A7B5C7]/60 font-mono">
            AI-Powered Research Assistant &bull; RAG &amp; Document Intelligence System
          </p>
          <ArrowDown className="w-3.5 h-3.5 text-[#6DB8F5] animate-bounce mt-1" />
        </div>
      </div>
    </section>
  );
};
