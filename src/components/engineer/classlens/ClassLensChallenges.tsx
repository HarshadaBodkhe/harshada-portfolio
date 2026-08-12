import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AlertTriangle, CheckCircle, ShieldCheck, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Challenge {
  id: string;
  title: string;
  discovered: string;
  solution: string;
  statusTag?: string;
}

const CHALLENGES: Challenge[] = [
  {
    id: 'false-rec',
    title: 'False Recognition & Thresholding',
    discovered: 'Unregistered face embeddings misclassifying as enrolled students.',
    solution: 'Applied distance metrics and probability thresholds on SVM output.',
    statusTag: 'Implemented',
  },
  {
    id: 'unknown-face',
    title: 'Unknown Face Handling',
    discovered: 'Visitors or unregistered individuals appearing in video stream.',
    solution: 'Set similarity confidence limits to flag and reject unknown faces.',
    statusTag: 'Implemented',
  },
  {
    id: 'duplicate-att',
    title: 'Duplicate Submissions',
    discovered: 'Continuous video stream creating duplicate attendance entries.',
    solution: 'Queries daily logs in Supabase before creating new entries.',
    statusTag: 'Implemented',
  },
  {
    id: 'performance',
    title: 'Streamlit Rerun Latency',
    discovered: 'Re-executing model loading on every UI click causing page freezes.',
    solution: 'Cached dlib and SVM models in RAM using @st.cache_resource.',
    statusTag: 'Implemented',
  },
];

const EDGE_CASES = [
  { case: 'No Face Detected', behavior: 'Prompts instructor to adjust lighting and student position.' },
  { case: 'Multiple Faces in Frame', behavior: 'Iterates through all detected bounding boxes sequentially.' },
  { case: 'Unknown / Unregistered Face', behavior: 'Notifies "Unknown Student" and skips log entry.' },
  { case: 'Duplicate Scan in Session', behavior: 'Notifies "Already Marked" and skips duplicate row.' },
  { case: 'Student Not Enrolled', behavior: 'Displays "Not Enrolled in Subject" rejection.' },
  { case: 'Empty Student Roster', behavior: 'Prompts instructor to perform student onboarding first.' },
];

export const ClassLensChallenges: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeChallenge, setActiveChallenge] = useState<string | null>(null);

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
    <div ref={containerRef} className="w-full max-w-[880px] space-y-12 pb-10 border-b border-[#1B3047]/40">
      {/* 1. CHALLENGES & SOLUTIONS (Two-Column Editorial Table Layout - NO CARDS!) */}
      <div className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#E8EEF5]">
          Technical Obstacles &amp; Hardened Solutions
        </h2>

        {/* Editorial Table Header */}
        <div className="hidden md:grid md:grid-cols-12 gap-4 pb-2 border-b border-[#1B3047]/60 font-mono text-[10px] font-bold text-[#E8EEF5] uppercase tracking-wider">
          <div className="col-span-5">CHALLENGE &amp; DISCOVERY</div>
          <div className="col-span-7">ENGINEERING SOLUTION</div>
        </div>

        {/* Editorial Rows */}
        <div className="space-y-0.5 font-mono text-xs">
          {CHALLENGES.map((ch) => {
            const isHovered = activeChallenge === ch.id;

            return (
              <div
                key={ch.id}
                onMouseEnter={() => setActiveChallenge(ch.id)}
                onMouseLeave={() => setActiveChallenge(null)}
                onFocus={() => setActiveChallenge(ch.id)}
                onBlur={() => setActiveChallenge(null)}
                tabIndex={0}
                className={`py-3 px-2 border-b border-[#1B3047]/40 transition-all duration-200 cursor-pointer outline-none ${
                  isHovered ? 'bg-[#6DB8F5]/5 text-[#E8EEF5] pl-3' : 'text-[#A7B5C7]'
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 items-start">
                  <div className="md:col-span-5 space-y-0.5">
                    <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-[#E8EEF5]">
                      <AlertTriangle className="w-3.5 h-3.5 text-[#6DB8F5] shrink-0" />
                      <span>{ch.title}</span>
                    </div>
                    <p className="font-sans text-xs sm:text-sm text-[#A7B5C7]/80 leading-relaxed">{ch.discovered}</p>
                  </div>
                  <div className="md:col-span-7 font-sans text-xs sm:text-sm text-[#E8EEF5]/90 leading-relaxed font-medium">
                    {ch.solution}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. UNKNOWN FACE HANDLING FLOW DIAGRAM */}
      <div className="space-y-3">
        <span className="font-mono text-xs font-semibold tracking-[0.2em] text-[#6DB8F5] uppercase block">
          UNKNOWN FACE REJECTION FLOW
        </span>

        <div className="py-2 font-mono text-xs space-y-3">
          <div className="flex flex-wrap items-center justify-center gap-2 text-center text-[11px]">
            <span className="px-2.5 py-1 rounded bg-[#030914] border border-[#1B3047]/50 text-[#E8EEF5]">
              FACE FRAME
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-[#6DB8F5]" />
            <span className="px-2.5 py-1 rounded bg-[#030914] border border-[#1B3047]/50 text-[#E8EEF5]">
              128-D EMBEDDING
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-[#6DB8F5]" />
            <span className="px-2.5 py-1 rounded bg-[#030914] border border-[#1B3047]/50 text-[#6DB8F5] font-bold">
              SVM SIMILARITY THRESHOLD CHECK
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto text-center pt-1">
            <div className="p-2 rounded bg-[#030914] border border-[#1B3047]/50">
              <span className="text-[#6DB8F5] font-bold block text-[10px]">SIMILARITY &ge; THRESHOLD</span>
              <span className="text-[#E8EEF5] font-sans text-xs">KNWON STUDENT ID</span>
            </div>
            <div className="p-2 rounded bg-[#030914] border border-[#1B3047]/50">
              <span className="text-[#FF5555] font-bold block text-[10px]">SIMILARITY &lt; THRESHOLD</span>
              <span className="text-[#A7B5C7] font-sans text-xs">UNKNOWN REJECT</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. EDGE CASES MATRIX & SECURITY */}
      <div className="space-y-4 pt-2">
        <span className="font-mono text-xs font-semibold tracking-[0.2em] text-[#6DB8F5] uppercase block">
          EDGE CASES &amp; SECURITY
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs">
          {EDGE_CASES.map((ec) => (
            <div key={ec.case} className="py-2 px-2.5 border-b border-[#1B3047]/30">
              <div className="flex items-center gap-1.5 text-[#E8EEF5] font-bold text-xs">
                <CheckCircle className="w-3 h-3 text-[#6DB8F5] shrink-0" />
                <span>{ec.case}</span>
              </div>
              <p className="font-sans text-[11px] text-[#A7B5C7]/80 pl-4 leading-tight mt-0.5">
                {ec.behavior}
              </p>
            </div>
          ))}
        </div>

        <div className="pt-2 font-sans text-xs text-[#A7B5C7] leading-relaxed border-t border-[#1B3047]/30">
          <div className="flex items-center gap-1.5 font-mono text-xs text-[#E8EEF5] font-bold mb-1">
            <ShieldCheck className="w-4 h-4 text-[#6DB8F5]" />
            <span>AUTHENTICATION &amp; ACCESS CONTROL</span>
          </div>
          ClassLens protects administrative operations using <strong className="text-[#E8EEF5]">bcrypt</strong> password hashing. All attendance requests and student roster updates pass through authenticated Supabase session validation.
        </div>
      </div>
    </div>
  );
};
