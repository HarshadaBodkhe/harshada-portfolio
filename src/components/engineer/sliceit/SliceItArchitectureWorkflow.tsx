import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Monitor, Server, Database, ArrowRight, ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const WORKFLOW_STEPS = [
  { step: '01', label: 'SELECT PIZZA' },
  { step: '02', label: 'REDUX CART' },
  { step: '03', label: 'RAZORPAY PAY' },
  { step: '04', label: 'EXPRESS ORDER' },
  { step: '05', label: 'MONGODB & EMAIL' },
];

export const SliceItArchitectureWorkflow: React.FC = () => {
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
    <div id="sliceit-architecture" ref={containerRef} className="w-full max-w-[880px] space-y-8">
      {/* 1. Architecture Section (Centered) */}
      <div className="space-y-3">
        <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#E8EEF5]">
          System Architecture
        </h2>

        <div className="w-full flex justify-center">
          <div
            ref={diagramRef}
            className="w-full max-w-lg p-4 sm:p-5 rounded-xl bg-[#060c18] border border-[#1B3047]/60 font-mono text-xs shadow-md"
          >
            <div className="flex flex-col items-center gap-2">
              {/* Node 1 */}
              <div className="w-full flex items-center gap-3 px-3.5 py-2 rounded bg-[#030914] border border-[#1B3047]/50">
                <Monitor className="w-4 h-4 text-[#6DB8F5]" />
                <div>
                  <span className="font-bold text-[#E8EEF5]">Frontend Client</span>
                  <span className="text-[10px] text-[#A7B5C7]/70 font-sans ml-2">
                    (React SPA &bull; Redux Toolkit)
                  </span>
                </div>
              </div>

              <div className="w-0.5 h-3 bg-[#6DB8F5]/40" />

              {/* Node 2 */}
              <div className="w-full flex items-center gap-3 px-3.5 py-2 rounded bg-[#030914] border border-[#1B3047]/50">
                <Server className="w-4 h-4 text-[#6DB8F5]" />
                <div>
                  <span className="font-bold text-[#E8EEF5]">Express REST API</span>
                  <span className="text-[10px] text-[#A7B5C7]/70 font-sans ml-2">
                    (Node.js &bull; Controllers &bull; Auth)
                  </span>
                </div>
              </div>

              <div className="w-0.5 h-3 bg-[#6DB8F5]/40" />

              {/* Node 3 */}
              <div className="w-full flex items-center gap-3 px-3.5 py-2 rounded bg-[#030914] border border-[#1B3047]/50">
                <Database className="w-4 h-4 text-[#6DB8F5]" />
                <div>
                  <span className="font-bold text-[#E8EEF5]">MongoDB &amp; Services</span>
                  <span className="text-[10px] text-[#A7B5C7]/70 font-sans ml-2">
                    (Mongoose &bull; Razorpay &bull; Email)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Workflow Section */}
      <div className="space-y-3">
        <h3 className="text-base sm:text-lg font-bold tracking-tight text-[#E8EEF5]">
          Request Workflow
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
