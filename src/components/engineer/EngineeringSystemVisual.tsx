import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface NodeData {
  id: string;
  label: string;
  sublabel: string;
  x: number; // percentage
  y: number; // percentage
}

const SYSTEM_NODES: NodeData[] = [
  { id: 'frontend', label: 'FRONTEND', sublabel: 'React / Next.js', x: 50, y: 15 },
  { id: 'api', label: 'API LAYER', sublabel: 'REST / GraphQL', x: 50, y: 45 },
  { id: 'backend', label: 'BACKEND', sublabel: 'Java / Python', x: 22, y: 75 },
  { id: 'database', label: 'DATABASE', sublabel: 'SQL / Vector', x: 50, y: 88 },
  { id: 'ai', label: 'AI SYSTEM', sublabel: 'LLM / RAG Engine', x: 78, y: 75 },
];

const CONNECTIONS = [
  { from: 'frontend', to: 'api' },
  { from: 'api', to: 'backend' },
  { from: 'api', to: 'ai' },
  { from: 'backend', to: 'database' },
  { from: 'ai', to: 'database' },
];

export const EngineeringSystemVisual: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRefs = useRef<(SVGLineElement | null)[]>([]);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.4 });

      // 1. Reveal connecting lines sequentially
      tl.fromTo(
        lineRefs.current,
        { strokeDashoffset: 100, opacity: 0 },
        {
          strokeDashoffset: 0,
          opacity: 0.6,
          duration: 1.2,
          stagger: 0.2,
          ease: 'power2.out',
        }
      );

      // 2. Reveal system nodes with scale & blur lift
      tl.fromTo(
        nodeRefs.current,
        { opacity: 0, scale: 0.85, y: 10, filter: 'blur(4px)' },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          stagger: 0.15,
          ease: 'back.out(1.4)',
        },
        '-=1.0'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/3] max-w-lg mx-auto rounded-2xl bg-[#030914]/70 backdrop-blur-md border border-[#1B3047]/80 p-6 shadow-2xl overflow-hidden flex items-center justify-center"
    >
      {/* Background Subtle Tech Grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(109, 184, 245, 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(109, 184, 245, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
        }}
      />

      {/* SVG Connecting Lines Layer */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6DB8F5" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#1B3047" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        {CONNECTIONS.map((conn, idx) => {
          const fromNode = SYSTEM_NODES.find((n) => n.id === conn.from);
          const toNode = SYSTEM_NODES.find((n) => n.id === conn.to);
          if (!fromNode || !toNode) return null;

          return (
            <line
              key={`${conn.from}-${conn.to}`}
              ref={(el) => {
                lineRefs.current[idx] = el;
              }}
              x1={`${fromNode.x}%`}
              y1={`${fromNode.y}%`}
              x2={`${toNode.x}%`}
              y2={`${toNode.y}%`}
              stroke="url(#lineGrad)"
              strokeWidth="1.5"
              strokeDasharray="6 4"
              className="will-change-transform"
            />
          );
        })}
      </svg>

      {/* System Nodes Layer */}
      <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
        {SYSTEM_NODES.map((node, idx) => (
          <div
            key={node.id}
            ref={(el) => {
              nodeRefs.current[idx] = el;
            }}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            className="-translate-x-1/2 -translate-y-1/2 absolute"
          >
            <div className="group relative flex flex-col items-center justify-center px-3.5 py-2 rounded-xl bg-[#060b14]/90 border border-[#1B3047] hover:border-[#6DB8F5]/60 transition-all duration-300 shadow-lg shadow-[#020711]/50 whitespace-nowrap">
              {/* Subtle status pulse dot */}
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6DB8F5] shadow-[0_0_6px_#6DB8F5]" />
                <span className="font-mono text-[10px] font-bold tracking-wider text-[#E8EEF5]">
                  {node.label}
                </span>
              </div>
              <span className="font-mono text-[9px] text-[#A7B5C7]/70">
                {node.sublabel}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
