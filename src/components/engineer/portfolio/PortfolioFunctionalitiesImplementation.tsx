import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    title: 'Workspace-Based Navigation',
    detail: 'Separate Recruiter and Engineer experiences tailored to different visitor needs.',
  },
  {
    title: 'Interactive Project Presentation',
    detail: 'Projects are presented as detailed case studies rather than simple portfolio cards.',
  },
  {
    title: 'GSAP-Powered Motion',
    detail: 'Scroll-driven reveals, transitions, and ambient motion create a continuous storytelling experience.',
  },
  {
    title: 'Responsive Architecture',
    detail: 'The interface adapts across desktop, tablet, and mobile with responsive navigation and layouts.',
  },
  {
    title: 'Dual Theme System',
    detail: 'Dark and light themes share the same visual language while adapting surfaces, typography, borders, and accents.',
  },
];

export const PortfolioFunctionalitiesImplementation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 15 },
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
    <div ref={containerRef} className="w-full max-w-[880px] space-y-8">
      {/* Core Functionalities */}
      <div className="space-y-3 max-w-[780px]">
        <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#E8EEF5]">
          Core Functionalities
        </h2>

        <div className="space-y-3 border-l border-[#1B3047]/60 pl-4">
          {FEATURES.map((feat) => (
            <div key={feat.title} className="space-y-0.5">
              <h4 className="font-mono text-xs sm:text-sm font-bold text-[#E8EEF5]">
                {feat.title}
              </h4>
              <p className="font-sans text-xs sm:text-sm text-[#A7B5C7]/80 leading-relaxed">
                {feat.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
