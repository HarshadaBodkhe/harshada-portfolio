import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WORKFLOW_STEPS = [
  {
    step: '01',
    title: 'USER REQUEST',
    desc: 'User interacts with filter parameters or selects stay reservation dates.',
  },
  {
    step: '02',
    title: 'FRONTEND UI STATE',
    desc: 'Client JavaScript handles input validation and triggers asynchronous request.',
  },
  {
    step: '03',
    title: 'EXPRESS ROUTER',
    desc: 'Express API validates payload, verifies session credentials, and routes request.',
  },
  {
    step: '04',
    title: 'MONGODB DATA QUERY',
    desc: 'Mongoose queries document store to retrieve property metadata and booking status.',
  },
  {
    step: '05',
    title: 'UI HYDRATION',
    desc: 'JSON payload is returned to client, updating state and rendering view elements.',
  },
];

export const DwelloWorkflow: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        stepRefs.current,
        { opacity: 0, x: -15 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
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
    <div ref={containerRef} className="w-full max-w-2xl">
      <div className="mb-3">
        <span className="font-mono text-xs font-semibold tracking-[0.2em] text-[#6DB8F5] uppercase">
          APPLICATION WORKFLOW
        </span>
      </div>

      <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#E8EEF5] mb-6">
        End-to-End Request Journey
      </h2>

      {/* Unboxed Vertical Flow with Thin Connector */}
      <div className="relative border-l border-[#1B3047]/80 ml-2 pl-6 space-y-6">
        {WORKFLOW_STEPS.map((step, idx) => (
          <div
            key={step.step}
            ref={(el) => {
              stepRefs.current[idx] = el;
            }}
            className="relative"
          >
            {/* Minimal Dot Indicator */}
            <div className="absolute -left-[29px] top-1 w-2.5 h-2.5 rounded-full bg-[#6DB8F5]" />

            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-mono text-xs font-bold text-[#E8EEF5] tracking-wider">
                {step.title}
              </span>
              <span className="font-mono text-[10px] text-[#6DB8F5]">
                / {step.step}
              </span>
            </div>
            <p className="font-sans text-xs sm:text-sm text-[#A7B5C7]/80 leading-relaxed">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
