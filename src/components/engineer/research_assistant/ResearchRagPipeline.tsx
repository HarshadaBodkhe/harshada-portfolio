import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileUp, Cpu, Database, Search, Sparkles, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const ResearchRagPipeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

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

  // Controlled step sequence loop for demonstration
  useEffect(() => {
    const timer = setInterval(() => {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setActiveStep((prev) => (prev % 4) + 1);
      }, 600);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div ref={containerRef} className="w-full max-w-[880px] mx-auto space-y-6">
      <div className="flex flex-col space-y-1 text-left">
        <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-[#6DB8F5] uppercase">
          INTERACTIVE RAG ENGINE DEMONSTRATION
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-[#E8EEF5]">
          End-to-End Document RAG Execution Flow
        </h3>
        <p className="text-xs sm:text-sm text-[#A7B5C7]/80 font-sans">
          Watch how user-uploaded PDF research papers are vectorized and retrieved to form grounded LLM responses.
        </p>
      </div>

      {/* RAG Process Container */}
      <div className="p-6 rounded-[12px] bg-[#060c18] border border-[#1B3047]/60 shadow-lg space-y-6">
        {/* Step Indicators */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 border-b border-[#1B3047]/50 pb-4">
          {[
            { step: 1, name: '1. Ingestion & Extraction', icon: FileUp },
            { step: 2, name: '2. Chunking & Embedding', icon: Cpu },
            { step: 3, name: '3. Vector Indexing', icon: Database },
            { step: 4, name: '4. Grounded Synthesis', icon: Sparkles },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeStep === item.step;
            return (
              <button
                key={item.step}
                onClick={() => setActiveStep(item.step)}
                className={`flex items-center gap-2 p-2.5 rounded-lg border text-left transition-all duration-200 ${
                  isActive
                    ? 'bg-[#081324] border-[#6DB8F5]/60 text-[#6DB8F5] shadow-md'
                    : 'bg-transparent border-transparent text-[#A7B5C7]/60 hover:text-[#A7B5C7]'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#6DB8F5]' : 'text-[#A7B5C7]/40'}`} />
                <span className="font-mono text-[11px] font-semibold truncate">{item.name}</span>
              </button>
            );
          })}
        </div>

        {/* Step Visualizer Card */}
        <div className="relative p-5 rounded-lg bg-[#040812] border border-[#1B3047]/40 min-h-[160px] flex flex-col justify-center space-y-4">
          {isProcessing && (
            <div className="absolute inset-0 bg-[#040812]/80 backdrop-blur-xs flex items-center justify-center z-10">
              <span className="font-mono text-xs text-[#6DB8F5] animate-pulse flex items-center gap-2">
                <Cpu className="w-4 h-4 animate-spin" /> Processing RAG Vector Stream...
              </span>
            </div>
          )}

          {/* STEP 1: Ingestion & Text Extraction */}
          {activeStep === 1 && (
            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#6DB8F5] font-semibold">STAGE 1: DOCUMENT UPLOAD &amp; EXTRACTION</span>
                <span className="text-emerald-400 flex items-center gap-1 text-[10px]">
                  <CheckCircle className="w-3 h-3" /> Ready
                </span>
              </div>
              <div className="p-3 rounded bg-[#081324] border border-[#1B3047]/60 flex items-center justify-between text-[#E8EEF5]">
                <div className="flex items-center gap-2">
                  <FileUp className="w-4 h-4 text-[#6DB8F5]" />
                  <span>attention-mechanism-paper.pdf</span>
                </div>
                <span className="text-[10px] text-[#A7B5C7]/70">24 Pages &bull; 1.4 MB</span>
              </div>
              <div className="p-2.5 rounded bg-[#060c18] border border-[#1B3047]/40 text-[#A7B5C7]/80 text-[11px]">
                PyPDFLoader parsing text streams &rarr; Normalized raw string buffer
              </div>
            </div>
          )}

          {/* STEP 2: Chunking & Sentence Transformers */}
          {activeStep === 2 && (
            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#6DB8F5] font-semibold">STAGE 2: RECURSIVE CHUNKING &amp; EMBEDDING</span>
                <span className="text-emerald-400 flex items-center gap-1 text-[10px]">
                  <CheckCircle className="w-3 h-3" /> 384 dimensions
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[10px]">
                <div className="p-2 rounded bg-[#081324] border border-[#1B3047]/60">
                  <span className="text-[#6DB8F5]">Chunk #01 (500 tokens)</span>
                  <p className="text-[#A7B5C7]/70 truncate mt-1">Self-attention layer computations...</p>
                </div>
                <div className="p-2 rounded bg-[#081324] border border-[#1B3047]/60">
                  <span className="text-[#6DB8F5]">Chunk #02 (500 tokens)</span>
                  <p className="text-[#A7B5C7]/70 truncate mt-1">Multi-head attention projections...</p>
                </div>
                <div className="p-2 rounded bg-[#081324] border border-[#1B3047]/60">
                  <span className="text-[#6DB8F5]">Chunk #03 (500 tokens)</span>
                  <p className="text-[#A7B5C7]/70 truncate mt-1">Positional encoding representations...</p>
                </div>
              </div>
              <div className="p-2 rounded bg-[#060c18] border border-[#1B3047]/40 text-[#A7B5C7]/80 text-[11px] flex items-center justify-between">
                <span>Model: all-MiniLM-L6-v2</span>
                <span className="text-[#6DB8F5]">Overlap: 50 tokens</span>
              </div>
            </div>
          )}

          {/* STEP 3: Vector Indexing & ChromaDB */}
          {activeStep === 3 && (
            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#6DB8F5] font-semibold">STAGE 3: CHROMADB VECTOR STORE INDEXING</span>
                <span className="text-emerald-400 flex items-center gap-1 text-[10px]">
                  <CheckCircle className="w-3 h-3" /> HNSW Index Active
                </span>
              </div>
              <div className="p-3 rounded bg-[#081324] border border-[#1B3047]/60 flex items-center justify-between text-[#E8EEF5]">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-[#6DB8F5]" />
                  <span>Persisted Vector Collection: research_kb_v1</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-semibold">Cosine Distance</span>
              </div>
              <div className="p-2 rounded bg-[#060c18] border border-[#1B3047]/40 text-[#A7B5C7]/80 text-[11px]">
                Query: &ldquo;What methodology does this paper propose?&rdquo; &rarr; Similarity Top-K: 3 chunks
              </div>
            </div>
          )}

          {/* STEP 4: Grounded Synthesis */}
          {activeStep === 4 && (
            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#6DB8F5] font-semibold">STAGE 4: GROUNDED GEMINI SYNTHESIS</span>
                <span className="text-emerald-400 flex items-center gap-1 text-[10px]">
                  <CheckCircle className="w-3 h-3" /> Sources Verified
                </span>
              </div>
              <div className="p-3 rounded bg-[#081324] border border-[#6DB8F5]/40 text-[#E8EEF5] space-y-1.5">
                <p className="text-[11px] text-[#A7B5C7] leading-relaxed">
                  &ldquo;The paper proposes a transformer-based architecture using self-attention mechanisms to model relationships between tokens without recurrence.&rdquo;
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[9px] text-[#6DB8F5] font-semibold uppercase">Sources:</span>
                  <span className="px-1.5 py-0.5 text-[9px] bg-[#1B3047]/60 text-[#6DB8F5] rounded">Page 4</span>
                  <span className="px-1.5 py-0.5 text-[9px] bg-[#1B3047]/60 text-[#6DB8F5] rounded">Page 7</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Data Stream Pipeline Footer */}
        <div className="flex flex-wrap items-center justify-between text-xs font-mono text-[#A7B5C7]/70 pt-2 border-t border-[#1B3047]/40">
          <span className="flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5 text-[#6DB8F5]" /> Vector Context Window Active
          </span>
          <span className="text-[11px] text-[#6DB8F5]">LangChain RAG Chain</span>
        </div>
      </div>
    </div>
  );
};
