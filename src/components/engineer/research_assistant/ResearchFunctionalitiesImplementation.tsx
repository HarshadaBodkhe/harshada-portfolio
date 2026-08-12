import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FUNCTIONALITIES = [
  {
    name: 'Document Q&A with Grounded Citations',
    desc: 'Ask natural-language questions across uploaded PDFs and receive precise answers with page-level source references.',
  },
  {
    name: 'Automated Document Summarization',
    desc: 'Generate executive summaries, abstract overviews, and section-by-section takeaways from multi-page research papers.',
  },
  {
    name: 'Key Point & Methodology Extraction',
    desc: 'Automatically identify research objectives, experimental setups, core findings, limitations, and mathematical formulations.',
  },
  {
    name: 'Multi-Document Comparative Analysis',
    desc: 'Cross-examine findings across multiple uploaded technical papers to compare methodology trade-offs and empirical results.',
  },
  {
    name: 'Structured Study & Revision Material',
    desc: 'Transform raw PDF research text into structured revision notes, flashcards, key definition lists, and review questions.',
  },
];

export const ResearchFunctionalitiesImplementation: React.FC = () => {
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
      {/* 1. Core Functionalities */}
      <div className="space-y-3 max-w-[780px]">
        <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#E8EEF5]">
          Core Functionalities
        </h2>

        <div className="space-y-3 border-l border-[#1B3047]/60 pl-4">
          {FUNCTIONALITIES.map((func) => (
            <div key={func.name} className="space-y-0.5">
              <h4 className="font-mono text-xs sm:text-sm font-bold text-[#E8EEF5]">
                {func.name}
              </h4>
              <p className="font-sans text-xs sm:text-sm text-[#A7B5C7]/80 leading-relaxed">
                {func.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Technical Implementation */}
      <div className="space-y-3">
        <h3 className="text-base sm:text-lg font-bold tracking-tight text-[#E8EEF5]">
          Technical Implementation
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans text-xs sm:text-sm">
          <div className="space-y-1">
            <span className="font-mono text-xs font-bold text-[#6DB8F5] uppercase tracking-wider block">
              DOCUMENT PARSING &amp; EXTRACTION
            </span>
            <p className="text-[#A7B5C7]/85 leading-relaxed">
              PyPDFLoader extracting raw text streams into normalized character buffers for downstream chunking.
            </p>
          </div>

          <div className="space-y-1">
            <span className="font-mono text-xs font-bold text-[#6DB8F5] uppercase tracking-wider block">
              VECTOR EMBEDDINGS &amp; INDEXING
            </span>
            <p className="text-[#A7B5C7]/85 leading-relaxed">
              Sentence Transformers (`all-MiniLM-L6-v2`) generating 384d vector representations indexed in ChromaDB HNSW store.
            </p>
          </div>

          <div className="space-y-1">
            <span className="font-mono text-xs font-bold text-[#6DB8F5] uppercase tracking-wider block">
              LANGCHAIN RAG ORCHESTRATION
            </span>
            <p className="text-[#A7B5C7]/85 leading-relaxed">
              RetrievalQA chains assembling prompt templates with top-K cosine similarity context passages.
            </p>
          </div>

          <div className="space-y-1">
            <span className="font-mono text-xs font-bold text-[#6DB8F5] uppercase tracking-wider block">
              GROUNDED LLM GENERATION
            </span>
            <p className="text-[#A7B5C7]/85 leading-relaxed">
              Google Gemini API synthesizing natural language answers strictly bound to retrieved document passages.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
