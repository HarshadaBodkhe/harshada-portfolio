import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown } from 'lucide-react';

import { DwelloHeader } from './DwelloHeader';
import { DwelloProblemSolution } from './DwelloProblemSolution';
import { DwelloResultsFuture } from './DwelloResultsFuture';
import { DwelloArchitectureWorkflow } from './DwelloArchitectureWorkflow';
import { DwelloFunctionalitiesImplementation } from './DwelloFunctionalitiesImplementation';
import { DwelloDecisionsChallenges } from './DwelloDecisionsChallenges';
import { DwelloTechStack } from './DwelloTechStack';
import { DwelloGallery } from './DwelloGallery';

gsap.registerPlugin(ScrollTrigger);

export const DwelloCaseStudy: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const transitionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="dwello-case-study"
      ref={containerRef}
      className="relative w-full py-8 sm:py-14 px-4 sm:px-8 overflow-hidden flex flex-col items-center"
    >
      {/* Centered Unified Container: Max-width 880px */}
      <div className="w-full max-w-[880px] mx-auto flex flex-col items-center space-y-12 sm:space-y-16">
        {/* 1. Project Header */}
        <DwelloHeader />

        {/* 2. Engineering Challenges + Technical Approach */}
        <DwelloProblemSolution />

        {/* 3. 2-Column Key Results + Future Scope */}
        <DwelloResultsFuture />

        {/* 4. System Architecture Diagram & Request Workflow */}
        <DwelloArchitectureWorkflow />

        {/* 5. Core Functionalities & Technical Implementation */}
        <DwelloFunctionalitiesImplementation />

        {/* 6. Technical Decisions & Engineering Reflections */}
        <DwelloDecisionsChallenges />

        {/* 7. Tech Stack */}
        <DwelloTechStack />

        {/* 8. Media Gallery */}
        <DwelloGallery />

        {/* 9. Next Project Transition */}
        <div
          ref={transitionRef}
          className="w-full pt-10 border-t border-[#1B3047]/30 flex flex-col items-center space-y-2 text-center"
        >
          <span className="font-mono text-xs font-semibold tracking-[0.25em] text-[#6DB8F5] uppercase">
            NEXT PROJECT
          </span>
          <p className="text-xs text-[#A7B5C7]/60 font-mono">
            SliceIt &bull; Full-Stack Pizza Ordering &amp; Management Platform
          </p>
          <ArrowDown className="w-3.5 h-3.5 text-[#6DB8F5] animate-bounce mt-1" />
        </div>
      </div>
    </section>
  );
};
