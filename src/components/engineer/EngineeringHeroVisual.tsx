import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Layers, GitBranch, Cpu, Database } from 'lucide-react';

export const EngineeringHeroVisual: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRefs = useRef<(SVGLineElement | null)[]>([]);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // 1. Reveal connecting lines
      tl.fromTo(
        lineRefs.current,
        { strokeDashoffset: 80, opacity: 0 },
        {
          strokeDashoffset: 0,
          opacity: 0.5,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
        }
      );

      // 2. Reveal system nodes
      tl.fromTo(
        nodeRefs.current,
        { opacity: 0, scale: 0.9, y: 8 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: 'back.out(1.3)',
        },
        '-=0.6'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-md mx-auto rounded-xl bg-[#030914]/80 backdrop-blur-md border border-[#1B3047] p-5 sm:p-6 shadow-xl overflow-hidden font-mono text-[#E8EEF5]"
    >
      {/* Top Bar: System Label & Build Status */}
      <div className="flex items-center justify-between pb-3.5 border-b border-[#1B3047]/60">
        <div className="flex items-center gap-2">
          <span className="text-[10px] tracking-widest text-[#6DB8F5] uppercase font-semibold">
            SYSTEM OVERVIEW
          </span>
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#1B3047]/60 text-[#A7B5C7]">
            v2.4
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#6DB8F5] shadow-[0_0_8px_#6DB8F5] animate-pulse" />
          <span className="text-[10px] text-[#A7B5C7] tracking-wider font-medium">
            BUILD READY
          </span>
        </div>
      </div>

      {/* Middle Architecture Workflow Box */}
      <div className="relative py-6 min-h-[220px] flex flex-col justify-between items-center">
        {/* SVG Connecting Vector Lines Layer */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <defs>
            <linearGradient id="heroLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6DB8F5" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#1B3047" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          {/* Top UI to API Line */}
          <line
            ref={(el) => {
              lineRefs.current[0] = el;
            }}
            x1="50%"
            y1="22%"
            x2="50%"
            y2="42%"
            stroke="url(#heroLineGrad)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          {/* API to Backend Line */}
          <line
            ref={(el) => {
              lineRefs.current[1] = el;
            }}
            x1="50%"
            y1="52%"
            x2="30%"
            y2="75%"
            stroke="url(#heroLineGrad)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          {/* API to AI Line */}
          <line
            ref={(el) => {
              lineRefs.current[2] = el;
            }}
            x1="50%"
            y1="52%"
            x2="70%"
            y2="75%"
            stroke="url(#heroLineGrad)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
        </svg>

        {/* Nodes Layer */}
        {/* Node 1: FRONTEND / UI */}
        <div
          ref={(el) => {
            nodeRefs.current[0] = el;
          }}
          className="z-10 flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-[#060b14]/90 border border-[#1B3047] shadow-md"
        >
          <Layers className="w-3.5 h-3.5 text-[#6DB8F5]" />
          <div>
            <div className="text-[10px] font-bold text-[#E8EEF5] tracking-wider">
              CLIENT / UI
            </div>
            <div className="text-[8px] text-[#A7B5C7]/70 font-sans">
              React / Next.js
            </div>
          </div>
        </div>

        {/* Node 2: API LAYER */}
        <div
          ref={(el) => {
            nodeRefs.current[1] = el;
          }}
          className="z-10 flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-[#060b14]/90 border border-[#1B3047] shadow-md"
        >
          <GitBranch className="w-3.5 h-3.5 text-[#6DB8F5]" />
          <div>
            <div className="text-[10px] font-bold text-[#E8EEF5] tracking-wider">
              API LAYER
            </div>
            <div className="text-[8px] text-[#A7B5C7]/70 font-sans">
              REST / Node.js
            </div>
          </div>
        </div>

        {/* Node 3 & Node 4: BACKEND & AI ENGINE */}
        <div className="z-10 w-full flex justify-between px-4">
          <div
            ref={(el) => {
              nodeRefs.current[2] = el;
            }}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#060b14]/90 border border-[#1B3047] shadow-md"
          >
            <Database className="w-3 h-3 text-[#6DB8F5]" />
            <div>
              <div className="text-[9px] font-bold text-[#E8EEF5] tracking-wider">
                DATABASE
              </div>
              <div className="text-[8px] text-[#A7B5C7]/70 font-sans">
                PostgreSQL
              </div>
            </div>
          </div>

          <div
            ref={(el) => {
              nodeRefs.current[3] = el;
            }}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#060b14]/90 border border-[#1B3047] shadow-md"
          >
            <Cpu className="w-3 h-3 text-[#6DB8F5]" />
            <div>
              <div className="text-[9px] font-bold text-[#E8EEF5] tracking-wider">
                AI ENGINE
              </div>
              <div className="text-[8px] text-[#A7B5C7]/70 font-sans">
                LangChain
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer: Interface Labels */}
      <div className="pt-3 border-t border-[#1B3047]/60 flex items-center justify-between text-[9px] text-[#A7B5C7]/70 uppercase tracking-wider">
        <span>ARCHITECTURE</span>
        <span className="text-[#1B3047]">&bull;</span>
        <span>WORKFLOW</span>
        <span className="text-[#1B3047]">&bull;</span>
        <span>IMPLEMENTATION</span>
      </div>
    </div>
  );
};
