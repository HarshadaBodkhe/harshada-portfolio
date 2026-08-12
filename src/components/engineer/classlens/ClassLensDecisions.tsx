import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Decision {
  id: string;
  title: string;
  question: string;
  explanation: string;
  impact: string;
}

const DECISIONS: Decision[] = [
  {
    id: 'streamlit',
    title: 'Streamlit Framework',
    question: 'Why Streamlit for the application interface?',
    explanation:
      'Integrates Python ML libraries (OpenCV, dlib, scikit-learn) directly with a web UI without JS bridge overhead.',
    impact: 'Seamless ML pipeline integration & rapid iteration',
  },
  {
    id: 'pretrained-embeddings',
    title: 'Pretrained Face Representations',
    question: 'Why use pretrained face recognition models?',
    explanation:
      'Converts pixels into 128-D vectors using ResNet feature extractors without custom training overhead.',
    impact: 'Zero deep model training overhead for new students',
  },
  {
    id: 'svm-classifier',
    title: 'Support Vector Machine (SVM)',
    question: 'Why linear SVM instead of deep re-training?',
    explanation:
      'Linear SVM finds optimal decision boundaries between student embeddings in milliseconds.',
    impact: 'Sub-second model updating when new students enroll',
  },
  {
    id: 'supabase',
    title: 'Supabase Database',
    question: 'Why Supabase for data persistence?',
    explanation:
      'Provides PostgreSQL with native array support (FLOAT8[]) for embedding vectors and real-time logs.',
    impact: 'Reliable cloud persistence & structured relational schema',
  },
];

export const ClassLensDecisions: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeDecision, setActiveDecision] = useState<string | null>(null);

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
          Architectural Choices &amp; System Rationale
        </h2>
      </div>

      {/* Model Caching Flow Banner (Minimal inline text nodes) */}
      <div className="py-2 font-mono text-xs space-y-1 text-[#A7B5C7]">
        <div className="flex items-center gap-1.5 text-[#E8EEF5] font-bold text-xs sm:text-sm">
          <Zap className="w-3.5 h-3.5 text-[#6DB8F5]" />
          <span>Streamlit Model Caching Flow (@st.cache_resource):</span>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="px-2 py-0.5 rounded bg-[#030914] border border-[#1B3047]/40">FIRST REQUEST</span>
          <ArrowRight className="w-3 h-3 text-[#6DB8F5]" />
          <span className="px-2 py-0.5 rounded bg-[#030914] border border-[#1B3047]/40">Load dlib &amp; SVM Models</span>
          <ArrowRight className="w-3 h-3 text-[#6DB8F5]" />
          <span className="px-2 py-0.5 rounded bg-[#6DB8F5]/10 text-[#6DB8F5] font-bold">Cache in RAM</span>
          <ArrowRight className="w-3 h-3 text-[#6DB8F5]" />
          <span className="px-2 py-0.5 rounded bg-[#030914] border border-[#1B3047]/40">Reuse Instantly</span>
        </div>
      </div>

      {/* Vertical Editorial List with thin horizontal dividers (No Decision Cards!) */}
      <div className="space-y-0.5 font-mono text-xs">
        {DECISIONS.map((dec) => {
          const isHovered = activeDecision === dec.id;

          return (
            <div
              key={dec.id}
              onClick={() => setActiveDecision(isHovered ? null : dec.id)}
              onMouseEnter={() => setActiveDecision(dec.id)}
              onFocus={() => setActiveDecision(dec.id)}
              tabIndex={0}
              className={`py-3 px-2 border-b border-[#1B3047]/40 transition-all duration-200 cursor-pointer outline-none ${
                isHovered ? 'bg-[#6DB8F5]/5 text-[#E8EEF5] pl-3' : 'text-[#A7B5C7]'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="font-bold text-xs sm:text-sm text-[#E8EEF5]">{dec.question}</span>
                <span className="text-xs text-[#6DB8F5] font-sans">{dec.impact}</span>
              </div>

              {isHovered && (
                <div className="mt-2 pt-1 font-sans text-xs sm:text-sm text-[#A7B5C7]/80 leading-relaxed animate-fadeIn">
                  {dec.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
