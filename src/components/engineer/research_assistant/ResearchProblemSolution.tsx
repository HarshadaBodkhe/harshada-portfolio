import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ResearchProblemSolution: React.FC = () => {
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
    <div ref={containerRef} className="w-full max-w-[880px] space-y-8 text-left">
      {/* 1. Engineering Challenges Section */}
      <div className="space-y-2.5 w-full">
        <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#E8EEF5]">
          Engineering Challenges
        </h2>
        <div className="space-y-2 font-sans text-sm text-[#A7B5C7]/90 leading-relaxed">
          <p>
            Standard LLMs struggle with dense research PDFs due to token limits, hallucinations, and missing page citations. Technically, document intelligence requires PDF parsing, semantic vector chunking, real-time similarity retrieval, and strict answer grounding.
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
            Architected using Python, LangChain, and Streamlit on a Retrieval-Augmented Generation (RAG) framework. Sentence Transformers vectorize PDF chunks into ChromaDB, while cosine similarity retrieves top-K passages for Google Gemini synthesis with exact page citations.
          </p>
        </div>
      </div>
    </div>
  );
};
