import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { ResearchHeader } from './ResearchHeader';
import { ResearchProblemSolution } from './ResearchProblemSolution';
import { ResearchResultsFuture } from './ResearchResultsFuture';
import { ResearchArchitectureWorkflow } from './ResearchArchitectureWorkflow';
import { ResearchFunctionalitiesImplementation } from './ResearchFunctionalitiesImplementation';
import { ResearchDecisionsChallenges } from './ResearchDecisionsChallenges';
import { ResearchTechStack } from './ResearchTechStack';

gsap.registerPlugin(ScrollTrigger);

export const ResearchCaseStudy: React.FC = () => {
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
      id="research-assistant-case-study"
      ref={containerRef}
      className="relative w-full py-8 sm:py-14 px-4 sm:px-8 overflow-hidden flex flex-col items-center"
    >
      {/* Centered Unified Container: Max-width 880px */}
      <div className="w-full max-w-[880px] mx-auto flex flex-col items-center space-y-12 sm:space-y-16">
        {/* 1. Project Header */}
        <ResearchHeader />

        {/* 2. Engineering Challenges + Technical Approach */}
        <ResearchProblemSolution />

        {/* 3. 2-Column Key Results + Future Scope */}
        <ResearchResultsFuture />

        {/* 4. System Architecture Diagram & Request Workflow */}
        <ResearchArchitectureWorkflow />

        {/* 5. Core Functionalities & Technical Implementation */}
        <ResearchFunctionalitiesImplementation />

        {/* 6. Technical Decisions & Engineering Reflections */}
        <ResearchDecisionsChallenges />

        {/* 7. Tech Stack */}
        <ResearchTechStack />

        {/* 8. End of Exhibition Transition / Portfolio Footer */}
        <div
          ref={transitionRef}
          className="w-full pt-10 border-t border-[#1B3047]/30 flex flex-col items-center space-y-2 text-center"
        >
          <span className="font-mono text-xs font-semibold tracking-[0.25em] text-[#6DB8F5] uppercase">
            ENGINEER WORKSPACE PORTFOLIO
          </span>
          <p className="text-xs text-[#A7B5C7]/80 font-mono">
            &ldquo;From documents to knowledge.&rdquo;
          </p>
          <p className="text-[11px] text-[#A7B5C7]/50 font-mono pt-1">
            Full-Stack Systems &bull; AI Computer Vision &bull; E-Commerce &bull; RAG Document Intelligence
          </p>
        </div>
      </div>
    </section>
  );
};
