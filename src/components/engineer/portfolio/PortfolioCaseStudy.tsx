import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { PortfolioHeader } from './PortfolioHeader';
import { PortfolioProblemSolution } from './PortfolioProblemSolution';
import { PortfolioResultsFuture } from './PortfolioResultsFuture';
import { PortfolioArchitectureWorkflow } from './PortfolioArchitectureWorkflow';
import { PortfolioFunctionalitiesImplementation } from './PortfolioFunctionalitiesImplementation';
import { PortfolioDecisionsChallenges } from './PortfolioDecisionsChallenges';
import { PortfolioTechStack } from './PortfolioTechStack';
import { PortfolioGallery } from './PortfolioGallery';

gsap.registerPlugin(ScrollTrigger);

export const PortfolioCaseStudy: React.FC = () => {
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
      id="harshada-portfolio-case-study"
      ref={containerRef}
      className="relative w-full py-8 sm:py-14 px-4 sm:px-8 overflow-hidden flex flex-col items-center bg-transparent"
    >
      {/* Centered Unified Container: Max-width 880px */}
      <div className="w-full max-w-[880px] mx-auto flex flex-col items-center space-y-12 sm:space-y-16">
        {/* 1. Project Header */}
        <PortfolioHeader />

        {/* 2. Engineering Challenges + Technical Approach */}
        <PortfolioProblemSolution />

        {/* 3. Key Outcome + Future Scope */}
        <PortfolioResultsFuture />

        {/* 4. System Architecture Diagram & Request Workflow */}
        <PortfolioArchitectureWorkflow />

        {/* 5. Core Functionalities & Technical Implementation */}
        <PortfolioFunctionalitiesImplementation />

        {/* 6. Technical Decisions & Engineering Reflections */}
        <PortfolioDecisionsChallenges />

        {/* 7. Verified Tech Stack */}
        <PortfolioTechStack />

        {/* 8. Media Gallery */}
        <PortfolioGallery />

        {/* 9. End of Full Stack Collection Transition */}
        <div
          ref={transitionRef}
          className="w-full pt-10 border-t border-[#1B3047]/30 flex flex-col items-center space-y-2 text-center"
        >
          <span className="font-mono text-xs font-semibold tracking-[0.25em] text-[#6DB8F5] uppercase">
            FULL STACK COLLECTION COMPLETE
          </span>
          <p className="text-xs text-[#A7B5C7]/70 font-mono">
            &ldquo;Crafting robust, scalable web architectures.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
};
