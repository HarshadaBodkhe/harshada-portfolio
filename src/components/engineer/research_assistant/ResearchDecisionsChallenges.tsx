import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DECISIONS = [
  {
    decision: 'Decoupled Vector Storage (ChromaDB)',
    explanation:
      'Selected local ChromaDB vector store for lightweight, persisted HNSW index search without requiring external cloud DB latency or cost.',
  },
  {
    decision: 'Sentence Transformers Embedding Model',
    explanation:
      'Leveraged all-MiniLM-L6-v2 to compute 384-dimensional dense semantic vectors fast on CPU instances during PDF document chunking.',
  },
];

const REFLECTIONS = [
  {
    challenge: 'LLM Context Overflow & Hallucinations',
    discovered:
      'Passing entire PDF documents to the LLM caused context token overflow and ungrounded statements.',
    solution:
      'Enforced strict system prompt context bounds requiring Gemini to answer solely using top-K retrieved vector passages.',
  },
  {
    challenge: 'Dense Academic PDF Text Boundary Splitting',
    discovered:
      'Arbitrary text chunking cut off mid-sentence formulas and definitions, losing semantic continuity.',
    solution:
      'Implemented recursive character text splitting with 500-token chunks and 50-token overlapping windows to preserve boundary context.',
  },
];

export const ResearchDecisionsChallenges: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 15 },
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
    <div ref={containerRef} className="w-full max-w-[880px] space-y-8 text-left">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* LEFT: Technical Decisions */}
        <div className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#E8EEF5]">
            Technical Decisions
          </h2>

          <div className="space-y-3 font-sans text-xs sm:text-sm">
            {DECISIONS.map((dec) => (
              <div key={dec.decision} className="space-y-0.5">
                <h4 className="font-mono text-xs sm:text-sm font-bold text-[#E8EEF5]">
                  {dec.decision}
                </h4>
                <p className="text-[#A7B5C7]/85 leading-relaxed">
                  {dec.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Engineering Reflections */}
        <div className="space-y-3">
          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#E8EEF5]">
            Engineering Reflections
          </h3>

          <div className="space-y-4 font-sans text-xs sm:text-sm">
            {REFLECTIONS.map((ref) => (
              <div key={ref.challenge} className="space-y-1">
                <div>
                  <span className="font-mono text-xs font-bold text-[#6DB8F5] uppercase tracking-wider block">
                    CHALLENGE: {ref.challenge}
                  </span>
                  <p className="text-[#A7B5C7]/80 leading-relaxed mt-0.5">
                    {ref.discovered}
                  </p>
                </div>

                <div>
                  <span className="font-mono text-xs font-bold text-[#E8EEF5] uppercase tracking-wider block">
                    SOLUTION
                  </span>
                  <p className="text-[#E8EEF5]/90 leading-relaxed mt-0.5">
                    {ref.solution}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
