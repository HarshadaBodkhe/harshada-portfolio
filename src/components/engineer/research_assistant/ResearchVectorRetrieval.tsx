import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Network, RefreshCw, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface VectorNode {
  id: string;
  label: string;
  x: number; // percentage
  y: number; // percentage
  score: number; // cosine similarity
  isTopK: boolean;
}

const NODES: VectorNode[] = [
  { id: 'c1', label: 'Chunk 04 (Intro)', x: 18, y: 25, score: 0.42, isTopK: false },
  { id: 'c2', label: 'Chunk 07 (Methodology)', x: 38, y: 35, score: 0.91, isTopK: true },
  { id: 'c3', label: 'Chunk 09 (Attention Mechanism)', x: 58, y: 28, score: 0.88, isTopK: true },
  { id: 'c4', label: 'Chunk 14 (Evaluation)', x: 78, y: 40, score: 0.51, isTopK: false },
  { id: 'c5', label: 'Chunk 18 (Results)', x: 28, y: 72, score: 0.48, isTopK: false },
  { id: 'c6', label: 'Chunk 22 (Self-Attention Layer)', x: 50, y: 68, score: 0.85, isTopK: true },
  { id: 'c7', label: 'Chunk 29 (Conclusion)', x: 75, y: 75, score: 0.39, isTopK: false },
];

export const ResearchVectorRetrieval: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeQuery, setActiveQuery] = useState<boolean>(true);

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
    <div ref={containerRef} className="w-full max-w-[880px] mx-auto space-y-6">
      {/* Title */}
      <div className="flex flex-col space-y-1 text-left">
        <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-[#6DB8F5] uppercase">
          VECTOR SPACE SEMANTIC SEARCH
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-[#E8EEF5]">
          Cosine Similarity Vector Retrieval
        </h3>
        <p className="text-xs sm:text-sm text-[#A7B5C7]/80 font-sans">
          Sentence Transformers project user queries into 384-dimensional vector space, calculating nearest neighbors to select high-relevance chunks.
        </p>
      </div>

      {/* Vector Space Graphic Canvas */}
      <div className="relative p-6 rounded-[12px] bg-[#060c18] border border-[#1B3047]/60 shadow-lg min-h-[300px] flex flex-col justify-between overflow-hidden">
        {/* Top Controls */}
        <div className="flex items-center justify-between font-mono text-xs z-10">
          <div className="flex items-center gap-2">
            <Network className="w-4 h-4 text-[#6DB8F5]" />
            <span className="text-[#E8EEF5] font-semibold">ChromaDB Embedding Space</span>
          </div>
          <button
            onClick={() => setActiveQuery((prev) => !prev)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#081324] border border-[#1B3047] text-[#6DB8F5] hover:text-[#E8EEF5] transition-colors"
          >
            <RefreshCw className={`w-3 h-3 ${activeQuery ? 'animate-spin' : ''}`} />
            <span>{activeQuery ? 'Query Active' : 'Reset Search'}</span>
          </button>
        </div>

        {/* Vector Nodes Plot Area */}
        <div className="relative w-full h-[200px] my-4 rounded border border-[#1B3047]/30 bg-[#040812]">
          {/* Query Node (Center plot) */}
          <div
            className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20"
            style={{ left: '48%', top: '45%' }}
          >
            <div className="w-5 h-5 rounded-full bg-[#6DB8F5] flex items-center justify-center shadow-lg shadow-[#6DB8F5]/40 animate-pulse">
              <Zap className="w-3 h-3 text-[#040812]" />
            </div>
            <span className="font-mono text-[9px] font-bold text-[#6DB8F5] mt-1 bg-[#040812]/90 px-1.5 py-0.5 rounded border border-[#6DB8F5]/40">
              User Query Vector
            </span>
          </div>

          {/* Render Chunk Nodes */}
          {NODES.map((node) => {
            const isHighlight = activeQuery && node.isTopK;
            return (
              <React.Fragment key={node.id}>
                {/* Connecting Vector Line */}
                {activeQuery && node.isTopK && (
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                    <line
                      x1="48%"
                      y1="45%"
                      x2={`${node.x}%`}
                      y2={`${node.y}%`}
                      stroke="#6DB8F5"
                      strokeWidth="1.5"
                      strokeDasharray="4 2"
                      className="opacity-70 animate-pulse"
                    />
                  </svg>
                )}

                {/* Node Point */}
                <div
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center transition-all duration-300 z-15"
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                >
                  <div
                    className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                      isHighlight
                        ? 'bg-emerald-400 ring-4 ring-emerald-400/20 scale-125'
                        : 'bg-[#1B3047] opacity-50'
                    }`}
                  />
                  <span
                    className={`font-mono text-[8px] mt-1 px-1 rounded transition-colors ${
                      isHighlight
                        ? 'text-emerald-300 bg-[#081324] border border-emerald-500/40 font-semibold'
                        : 'text-[#A7B5C7]/50 bg-transparent'
                    }`}
                  >
                    {node.label} {isHighlight && `(Score: ${node.score})`}
                  </span>
                </div>
              </React.Fragment>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-between font-mono text-[10px] text-[#A7B5C7]/70 pt-2 border-t border-[#1B3047]/40 z-10">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#6DB8F5]" /> User Query Vector
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" /> Top-K Retrieved Chunks
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#1B3047]" /> Unmatched Chunks
            </span>
          </div>
          <span className="text-[#6DB8F5]">Metric: Cosine Similarity &ge; 0.80</span>
        </div>
      </div>
    </div>
  );
};
