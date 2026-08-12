import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Layout, Sparkles, ArrowRight, ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ARCHITECTURE_NODES = [
  { label: 'React + TypeScript', sub: 'Component UI & State', icon: Code },
  { label: 'Workspace Router', sub: 'Recruiter & Engineer Flow', icon: Layout },
  { label: 'Case Study System', sub: 'GSAP Motion & Content', icon: Sparkles },
];

const WORKFLOW_STEPS = [
  { step: '01', label: 'USER VISIT' },
  { step: '02', label: 'WORKSPACE ROUTER' },
  { step: '03', label: 'STATE & THEME CONFIG' },
  { step: '04', label: 'GSAP ANIMATIONS' },
  { step: '05', label: 'INTERACTIVE CASE STUDY' },
];

export const PortfolioArchitectureWorkflow: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        diagramRef.current,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
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
    <div id="portfolio-architecture" ref={containerRef} className="w-full max-w-[880px] space-y-8">
      {/* 1. Architecture Section (Compact Centered Diagram) */}
      <div className="space-y-3">
        <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#E8EEF5]">
          System Architecture
        </h2>

        <div className="w-full flex justify-center">
          <div
            ref={diagramRef}
            className="w-full max-w-md p-3.5 sm:p-4 rounded-xl bg-[#060c18] border border-[#1B3047]/60 font-mono text-xs shadow-md"
          >
            <div className="flex flex-col items-center gap-1.5">
              {ARCHITECTURE_NODES.map((node, idx) => {
                const IconComp = node.icon;
                return (
                  <React.Fragment key={node.label}>
                    <div className="w-full flex items-center gap-3 px-3 py-1.5 rounded bg-[#030914] border border-[#1B3047]/50">
                      <IconComp className="w-3.5 h-3.5 text-[#6DB8F5] shrink-0" />
                      <div className="truncate">
                        <span className="font-bold text-[#E8EEF5] text-xs">{node.label}</span>
                        <span className="text-[10px] text-[#A7B5C7]/70 font-sans ml-2">
                          ({node.sub})
                        </span>
                      </div>
                    </div>

                    {idx < ARCHITECTURE_NODES.length - 1 && (
                      <div className="w-0.5 h-2.5 bg-[#6DB8F5]/40" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Workflow Section */}
      <div className="space-y-3">
        <h3 className="text-base sm:text-lg font-bold tracking-tight text-[#E8EEF5]">
          Execution Workflow
        </h3>

        {/* Desktop Horizontal Flow */}
        <div className="hidden md:flex items-center justify-between gap-1.5 font-mono text-xs">
          {WORKFLOW_STEPS.map((step, idx) => (
            <React.Fragment key={step.step}>
              <div className="flex flex-col items-center py-2 px-2.5 rounded bg-[#060c18] border border-[#1B3047]/50 flex-1 text-center">
                <span className="text-[9px] text-[#6DB8F5] mb-0.5">STEP {step.step}</span>
                <span className="font-bold text-[#E8EEF5] text-[10px]">{step.label}</span>
              </div>
              {idx < WORKFLOW_STEPS.length - 1 && (
                <ArrowRight className="w-3.5 h-3.5 text-[#6DB8F5]/60 shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Mobile Vertical Flow */}
        <div className="flex md:hidden flex-col items-center gap-1.5 font-mono text-xs">
          {WORKFLOW_STEPS.map((step, idx) => (
            <React.Fragment key={step.step}>
              <div className="w-full flex items-center justify-between p-2.5 rounded bg-[#060c18] border border-[#1B3047]/50">
                <span className="font-bold text-[#E8EEF5]">{step.label}</span>
                <span className="text-[10px] text-[#6DB8F5]">STEP {step.step}</span>
              </div>
              {idx < WORKFLOW_STEPS.length - 1 && (
                <ArrowDown className="w-3 h-3 text-[#6DB8F5]/60 my-0.5" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
