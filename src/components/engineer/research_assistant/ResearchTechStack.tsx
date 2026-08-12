import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Clean SVG Logo Components (20px)
const PythonLogo: React.FC = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M62.6 2C34.7 2 36.4 14 36.4 14v14.4h26.8v3.8H25.3S2 30.6 2 58.7c0 28.1 20.3 27 20.3 27h12.1V71.2s-.6-17.7 17.5-17.7h29.8s16.7.2 16.7-16.1V18.1S100.8 2 62.6 2zm-14.7 9c2.8 0 5 2.2 5 5s-2.2 5-5 5-5-2.2-5-5 2.2-5 5-5z" fill="#3776AB" />
    <path d="M65.4 126c27.9 0 26.2-12 26.2-12V99.6H64.8v-3.8h37.5s23.3 1.6 23.3-26.5c0-28.1-20.3-27-20.3-27h-12.1V56.8s.6 17.7-17.5 17.7H45.9s-16.7-.2-16.7 16.1v19.4S27.2 126 65.4 126zm14.7-9c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z" fill="#FFD43B" />
  </svg>
);

const StreamlitLogo: React.FC = () => (
  <svg className="w-5 h-5 shrink-0 text-[#FF4B4B]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 19.5h20L12 2zm0 4.5l6.5 11.5h-13L12 6.5z" />
  </svg>
);

const LangChainLogo: React.FC = () => (
  <svg className="w-5 h-5 shrink-0 text-[#6DB8F5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const ChromaLogo: React.FC = () => (
  <svg className="w-5 h-5 shrink-0 text-[#A4C639]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none" />
    <circle cx="12" cy="12" r="4" fill="currentColor" />
  </svg>
);

const TransformersLogo: React.FC = () => (
  <svg className="w-5 h-5 shrink-0 text-[#FFA000]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none" />
  </svg>
);

const GeminiLogo: React.FC = () => (
  <svg className="w-5 h-5 shrink-0 text-[#6DB8F5]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C12 7.52285 7.52285 12 2 12C7.52285 12 12 16.4771 12 22C12 16.4771 16.4771 12 22 12C16.4771 12 12 7.52285 12 2Z" />
  </svg>
);

interface TechItem {
  name: string;
  logo: React.FC;
}

interface TechCategory {
  category: string;
  items: TechItem[];
}

const TECH_CATEGORIES: TechCategory[] = [
  {
    category: 'CORE & UI',
    items: [
      { name: 'Python', logo: PythonLogo },
      { name: 'Streamlit', logo: StreamlitLogo },
    ],
  },
  {
    category: 'ORCHESTRATION',
    items: [{ name: 'LangChain', logo: LangChainLogo }],
  },
  {
    category: 'VECTOR STORE',
    items: [
      { name: 'ChromaDB', logo: ChromaLogo },
      { name: 'Sentence Transformers', logo: TransformersLogo },
    ],
  },
  {
    category: 'GENERATIVE AI',
    items: [{ name: 'Google Gemini', logo: GeminiLogo }],
  },
];

export const ResearchTechStack: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const catRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        catRefs.current,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
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
    <div ref={containerRef} className="w-full max-w-[880px] space-y-3 text-left">
      <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#E8EEF5]">
        Tech Stack
      </h2>

      {/* Real Technology Logos Grouped by Role */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-1">
        {TECH_CATEGORIES.map((cat, idx) => (
          <div
            key={cat.category}
            ref={(el) => {
              catRefs.current[idx] = el;
            }}
            className="space-y-2"
          >
            <span className="font-mono text-[10px] font-semibold text-[#6DB8F5] uppercase tracking-wider block">
              {cat.category}
            </span>

            <div className="flex flex-col gap-2 font-mono text-xs text-[#E8EEF5]">
              {cat.items.map((item) => {
                const LogoComponent = item.logo;
                return (
                  <div key={item.name} className="flex items-center gap-2">
                    <LogoComponent />
                    <span className="font-medium text-xs">{item.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
