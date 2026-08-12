import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Layout, Cpu, Database, Sparkles, MessageSquare } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const ResearchArchitecture: React.FC = () => {
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
    <div
      id="research-architecture"
      ref={containerRef}
      className="w-full max-w-[880px] mx-auto space-y-6"
    >
      <div className="flex flex-col space-y-1 text-left">
        <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-[#6DB8F5] uppercase">
          SYSTEM ARCHITECTURE &amp; DATA FLOW
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-[#E8EEF5]">
          RAG Pipeline Architectural Topology
        </h3>
        <p className="text-xs sm:text-sm text-[#A7B5C7]/80 font-sans">
          Dual-stream pipeline decoupling offline document vectorization from real-time query context synthesis.
        </p>
      </div>

      {/* Architecture Topology Box */}
      <div className="p-6 rounded-[12px] bg-[#060c18] border border-[#1B3047]/60 shadow-lg space-y-6">
        {/* Entry: User & Streamlit UI */}
        <div className="flex flex-col items-center">
          <div className="px-5 py-2.5 rounded-lg bg-[#081324] border border-[#6DB8F5]/50 flex items-center gap-2 font-mono text-xs text-[#E8EEF5]">
            <Layout className="w-4 h-4 text-[#6DB8F5]" />
            <span className="font-bold">Streamlit Frontend &amp; Document Interface</span>
          </div>
          <div className="w-0.5 h-6 bg-[#1B3047]" />
        </div>

        {/* Dual Stream Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Stream: Document Vectorization */}
          <div className="p-4 rounded-lg bg-[#040812] border border-[#1B3047]/50 space-y-3 font-mono text-xs text-left">
            <span className="text-[10px] font-bold text-[#6DB8F5] uppercase tracking-wider block border-b border-[#1B3047]/40 pb-1">
              DOCUMENT PIPELINE (OFFLINE / INGEST)
            </span>
            <div className="space-y-2">
              <div className="p-2 rounded bg-[#081324] border border-[#1B3047]/40 text-[#E8EEF5]">
                1. PDF Text Extraction (PyPDF / Unstructured)
              </div>
              <div className="p-2 rounded bg-[#081324] border border-[#1B3047]/40 text-[#E8EEF5]">
                2. Recursive Character Chunking (500 tokens)
              </div>
              <div className="p-2 rounded bg-[#081324] border border-[#1B3047]/40 text-[#E8EEF5] flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-[#6DB8F5]" />
                <span>3. Sentence Transformer Vector Embeddings</span>
              </div>
            </div>
          </div>

          {/* Right Stream: Real-Time Query */}
          <div className="p-4 rounded-lg bg-[#040812] border border-[#1B3047]/50 space-y-3 font-mono text-xs text-left">
            <span className="text-[10px] font-bold text-[#6DB8F5] uppercase tracking-wider block border-b border-[#1B3047]/40 pb-1">
              QUERY PIPELINE (REAL-TIME / RETRIEVAL)
            </span>
            <div className="space-y-2">
              <div className="p-2 rounded bg-[#081324] border border-[#1B3047]/40 text-[#E8EEF5]">
                1. User Natural Language Query Input
              </div>
              <div className="p-2 rounded bg-[#081324] border border-[#1B3047]/40 text-[#E8EEF5]">
                2. Query Embedding Vector Calculation
              </div>
              <div className="p-2 rounded bg-[#081324] border border-[#1B3047]/40 text-[#E8EEF5] flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#6DB8F5]" />
                <span>3. Cosine Similarity Vector Search</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center Convergence: ChromaDB */}
        <div className="flex flex-col items-center">
          <div className="w-0.5 h-6 bg-[#1B3047]" />
          <div className="w-full p-3 rounded-lg bg-[#081324] border border-[#6DB8F5]/60 flex items-center justify-between font-mono text-xs text-[#E8EEF5]">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-[#6DB8F5]" />
              <span className="font-bold">ChromaDB Vector Store (Indexed Embeddings)</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-semibold">Top-K Context Chunks</span>
          </div>
          <div className="w-0.5 h-6 bg-[#1B3047]" />
        </div>

        {/* Synthesis & Generation */}
        <div className="p-4 rounded-lg bg-[#081324] border border-[#1B3047]/60 space-y-2 font-mono text-xs text-left">
          <div className="flex items-center justify-between border-b border-[#1B3047]/40 pb-1">
            <span className="font-bold text-[#E8EEF5] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#6DB8F5]" /> Grounded Generation Stage
            </span>
            <span className="text-[10px] text-[#6DB8F5]">Google Gemini API</span>
          </div>
          <p className="text-[11px] text-[#A7B5C7]/80 font-sans leading-relaxed">
            Prompt Template = System Prompt + Top-K Retrieved Document Context + User Question &rarr; Grounded Answer Generation with Page Citation Attributes.
          </p>
        </div>
      </div>
    </div>
  );
};
