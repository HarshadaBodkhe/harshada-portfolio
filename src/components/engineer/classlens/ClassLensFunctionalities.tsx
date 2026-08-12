import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Functionality {
  id: string;
  name: string;
  desc: string;
  tech: string;
}

const FUNCTIONALITIES: Functionality[] = [
  {
    id: 'face-rec',
    name: 'Face Recognition',
    desc: 'Real-time video frame face detection & 128-D embedding classification via dlib and SVM.',
    tech: 'OpenCV / dlib / scikit-learn',
  },
  {
    id: 'voice-rec',
    name: 'Voice Recognition',
    desc: 'Audio spectral analysis and speaker embedding verification for acoustic validation.',
    tech: 'librosa / Resemblyzer',
  },
  {
    id: 'student-reg',
    name: 'Student & Roster Management',
    desc: 'Onboarding portal capturing student metadata, photo enrollment, and course mapping.',
    tech: 'Streamlit / Supabase',
  },
  {
    id: 'realtime-att',
    name: 'Real-Time Attendance & Records',
    desc: 'Automated live verification, duplicate prevention, and historical attendance logs.',
    tech: 'Streamlit / PostgreSQL',
  },
];

export const ClassLensFunctionalities: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeFunc, setActiveFunc] = useState<string | null>(null);

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
    <div ref={containerRef} className="w-full max-w-[880px] space-y-6 pb-10 border-b border-[#1B3047]/40">
      <div className="space-y-1">
        <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#E8EEF5]">
          Platform Capabilities &amp; Module Engine
        </h2>
      </div>

      {/* Editorial Table Row List (No Card Grid!) */}
      <div className="space-y-0.5 font-mono text-xs">
        {FUNCTIONALITIES.map((item, idx) => {
          const isHovered = activeFunc === item.id;
          const isOtherHovered = activeFunc !== null && !isHovered;

          return (
            <div
              key={item.id}
              onMouseEnter={() => setActiveFunc(item.id)}
              onMouseLeave={() => setActiveFunc(null)}
              onFocus={() => setActiveFunc(item.id)}
              onBlur={() => setActiveFunc(null)}
              tabIndex={0}
              className={`py-3 px-2 border-b border-[#1B3047]/40 transition-all duration-200 cursor-pointer outline-none ${
                isHovered
                  ? 'text-[#E8EEF5] bg-[#6DB8F5]/5 border-[#6DB8F5]/40 pl-3'
                  : isOtherHovered
                  ? 'text-[#A7B5C7]/40 border-[#1B3047]/20 opacity-40'
                  : 'text-[#A7B5C7] border-[#1B3047]/40 opacity-100'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-[#6DB8F5]">0{idx + 1}</span>
                  <span className="font-mono text-sm font-bold text-[#E8EEF5]">{item.name}</span>
                </div>
                <span className="text-xs text-[#6DB8F5] font-mono sm:text-right">
                  {item.tech}
                </span>
              </div>

              {/* Revealed Description */}
              {isHovered && (
                <p className="mt-1.5 pt-1.5 font-sans text-xs sm:text-sm text-[#A7B5C7]/80 leading-relaxed animate-fadeIn pl-7">
                  {item.desc}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
