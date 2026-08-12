import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Clean SVG Logo Components (20px)
const EJSLogo: React.FC = () => (
  <svg className="w-5 h-5 rounded shrink-0" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="128" height="128" rx="16" fill="#1b2a1a" stroke="#A4C639" strokeWidth="6" />
    <text x="64" y="78" textAnchor="middle" fill="#A4C639" fontSize="36" fontWeight="bold" fontFamily="monospace">&lt;% %&gt;</text>
  </svg>
);

const JSLogo: React.FC = () => (
  <svg className="w-5 h-5 rounded shrink-0" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="128" height="128" rx="16" fill="#F7DF1E" />
    <path d="M67.3 104c3.4 5.6 7.8 9.3 15 9.3 6.4 0 10.5-3.2 10.5-7.6 0-5.3-4.2-7.3-11.2-10.4l-3.9-1.7c-11.3-4.9-18.7-11-18.7-23.7 0-11.6 9-20.5 22.9-20.5 10 0 17 3.5 21.8 11.8l-10.6 6.8c-2.7-4.8-6.1-6.9-11.2-6.9-4.8 0-8 3-8 6.8 0 4.7 3.2 6.6 9.8 9.5l3.9 1.7c13.3 5.7 20.4 11.7 20.4 24.8 0 14.1-11.1 21.8-26.6 21.8-13.4 0-22.3-6.2-26.7-14.7l10.6-7zm-41.2.7c2.6 4.6 6.1 8.2 12.3 8.2 6.1 0 9.8-2.4 9.8-11.8v-49h14.3v49.2c0 17.2-9.9 24.7-24.3 24.7-11.7 0-19.3-5.9-23.2-14.3l11.1-7z" fill="#000" />
  </svg>
);

const NodeLogo: React.FC = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M64 8.5L14.7 36.9v56.8L64 122.1l49.3-28.4V36.9L64 8.5z" fill="#339933" />
    <path d="M64 8.5v56.8l49.3 28.4V36.9L64 8.5z" fill="#5FA04E" />
    <path d="M64 65.3L14.7 36.9v56.8L64 122.1V65.3z" fill="#43853D" />
  </svg>
);

const ExpressLogo: React.FC = () => (
  <svg className="w-5 h-5 shrink-0 text-[#E8EEF5]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm8 14.25l-8 4-8-4V8.75l8-4 8 4v7.5zM7.5 12h9v1.5h-9V12z" />
  </svg>
);

const MongoLogo: React.FC = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M63.7 122.9s-.4.3-.8.3c-.4 0-.8-.3-.8-.3C54.8 111.4 24 67 24 45.4 24 21.6 42 2.4 63.8 2.4c21.8 0 39.4 19.2 39.4 43 0 21.6-30.8 66-38.1 77.5zm.3-112.5C46.3 10.4 32 26 32 45.4c0 14.8 19.5 48.7 31.7 65.6C75.9 94 95.4 60.2 95.4 45.4c0-19.4-14.3-35-31.4-35z" fill="#47A248" />
    <path d="M63.7 122.9V2.4c21.8 0 39.4 19.2 39.4 43 0 21.6-30.8 66-38.1 77.5z" fill="#499D4A" />
    <path d="M64 45v45s3-10 3-20-3-25-3-25z" fill="#E1E3E1" />
  </svg>
);

const RenderLogo: React.FC = () => (
  <svg className="w-5 h-5 shrink-0 text-[#46E3B7]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-2 14.5v-9l7 4.5-7 4.5z" />
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
    category: 'FRONTEND',
    items: [
      { name: 'JavaScript', logo: JSLogo },
      { name: 'EJS', logo: EJSLogo },
    ],
  },
  {
    category: 'BACKEND',
    items: [
      { name: 'Node.js', logo: NodeLogo },
      { name: 'Express', logo: ExpressLogo },
    ],
  },
  {
    category: 'DATABASE',
    items: [{ name: 'MongoDB', logo: MongoLogo }],
  },
  {
    category: 'DEPLOYMENT',
    items: [{ name: 'Render', logo: RenderLogo }],
  },
];

export const DwelloTechStack: React.FC = () => {
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
    <div ref={containerRef} className="w-full max-w-[880px] space-y-3">
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
