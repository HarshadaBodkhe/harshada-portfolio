import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WORKFLOW_STEPS = [
  {
    step: '01',
    label: 'Instructor Authentication & Session Setup',
    desc: 'Instructor logs in and selects target subject code for active lecture.',
    component: 'Authentication Layer',
  },
  {
    step: '02',
    label: 'Biometric Media Ingestion',
    desc: 'Captures live video frames or microphone audio buffers from classroom hardware.',
    component: 'Input Pipeline',
  },
  {
    step: '03',
    label: '128-D Embedding & Classification',
    desc: 'Extracts 128-D facial vectors and classifies student identity via Linear SVM.',
    component: 'Recognition Core',
  },
  {
    step: '04',
    label: 'Roster Validation & Log Persistence',
    desc: 'Cross-references subject roster, prevents duplicates, and commits record to Supabase.',
    component: 'Database Validation',
  },
];

export const ClassLensWorkflow: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState<number | null>(null);

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
    <div ref={containerRef} className="w-full max-w-[880px] space-y-10 pb-10 border-b border-[#1B3047]/40">
      {/* 1. ATTENDANCE WORKFLOW EXECUTION FLOW */}
      <div className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#E8EEF5]">
            End-to-End Attendance Execution Flow
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#A7B5C7]/80 leading-relaxed">
            Sequential system execution path from instructor login to verified database commitment.
          </p>
        </div>

        {/* Clean Editorial Table / Row Breakdown */}
        <div className="border-t border-[#1B3047]/40 font-mono text-xs divide-y divide-[#1B3047]/30">
          {WORKFLOW_STEPS.map((item, idx) => {
            const isHovered = activeStep === idx;
            const isOtherHovered = activeStep !== null && !isHovered;

            return (
              <div
                key={item.step}
                onMouseEnter={() => setActiveStep(idx)}
                onMouseLeave={() => setActiveStep(null)}
                onFocus={() => setActiveStep(idx)}
                onBlur={() => setActiveStep(null)}
                tabIndex={0}
                className={`py-3 px-2 transition-all duration-200 cursor-pointer outline-none ${
                  isHovered
                    ? 'bg-[#6DB8F5]/5 text-[#E8EEF5] pl-3'
                    : isOtherHovered
                    ? 'text-[#A7B5C7]/40 opacity-40'
                    : 'text-[#A7B5C7] opacity-100'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-[#6DB8F5] shrink-0">{item.step}</span>
                    <span className="font-mono text-xs sm:text-sm font-bold text-[#E8EEF5]">{item.label}</span>
                  </div>
                  <span className="text-xs text-[#6DB8F5] font-mono sm:text-right shrink-0">
                    {item.component}
                  </span>
                </div>
                <p className="mt-1.5 font-sans text-xs sm:text-sm text-[#A7B5C7]/80 leading-relaxed pl-7">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. VERIFICATION LOGIC SUMMARY */}
      <div className="space-y-3 pt-2">
        <h2 className="text-base sm:text-lg font-bold tracking-tight text-[#E8EEF5]">
          Verification &amp; Duplicate Prevention Rules
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans text-xs sm:text-sm text-[#A7B5C7]/90 leading-relaxed pt-1">
          <div className="space-y-1">
            <h3 className="font-mono text-xs sm:text-sm font-bold text-[#E8EEF5]">1. Roster Check</h3>
            <p className="text-xs sm:text-sm text-[#A7B5C7]/80">
              Validates recognized identity against active subject roster before authorization.
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="font-mono text-xs sm:text-sm font-bold text-[#E8EEF5]">2. Duplicate Filter</h3>
            <p className="text-xs sm:text-sm text-[#A7B5C7]/80">
              Queries Supabase daily logs to eliminate duplicate entries and proxy attempts.
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="font-mono text-xs sm:text-sm font-bold text-[#E8EEF5]">3. Cloud Persistence</h3>
            <p className="text-xs sm:text-sm text-[#A7B5C7]/80">
              Writes immutable timestamped records with subject code and confidence metadata.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
