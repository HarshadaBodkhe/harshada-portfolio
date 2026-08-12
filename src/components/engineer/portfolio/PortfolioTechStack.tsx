import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Clean SVG Icons for Portfolio Tech Stack
const ReactLogo: React.FC = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="64" cy="64" r="12" fill="#61DAFB" />
    <ellipse cx="64" cy="64" rx="50" ry="18" stroke="#61DAFB" strokeWidth="6" transform="rotate(0 64 64)" />
    <ellipse cx="64" cy="64" rx="50" ry="18" stroke="#61DAFB" strokeWidth="6" transform="rotate(60 64 64)" />
    <ellipse cx="64" cy="64" rx="50" ry="18" stroke="#61DAFB" strokeWidth="6" transform="rotate(120 64 64)" />
  </svg>
);

const TSLogo: React.FC = () => (
  <svg className="w-5 h-5 rounded shrink-0" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="128" height="128" rx="16" fill="#3178C6" />
    <path d="M72.2 104c3.4 5.6 7.8 9.3 15 9.3 6.4 0 10.5-3.2 10.5-7.6 0-5.3-4.2-7.3-11.2-10.4l-3.9-1.7c-11.3-4.9-18.7-11-18.7-23.7 0-11.6 9-20.5 22.9-20.5 10 0 17 3.5 21.8 11.8l-10.6 6.8c-2.7-4.8-6.1-6.9-11.2-6.9-4.8 0-8 3-8 6.8 0 4.7 3.2 6.6 9.8 9.5l3.9 1.7c13.3 5.7 20.4 11.7 20.4 24.8 0 14.1-11.1 21.8-26.6 21.8-13.4 0-22.3-6.2-26.7-14.7l10.6-7zm-44-1.2h14.7V61.9H57V49.8H28.2v12.1h14v40.9z" fill="#FFF" />
  </svg>
);

const JSLogo: React.FC = () => (
  <svg className="w-5 h-5 rounded shrink-0" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="128" height="128" rx="16" fill="#F7DF1E" />
    <path d="M67.3 104c3.4 5.6 7.8 9.3 15 9.3 6.4 0 10.5-3.2 10.5-7.6 0-5.3-4.2-7.3-11.2-10.4l-3.9-1.7c-11.3-4.9-18.7-11-18.7-23.7 0-11.6 9-20.5 22.9-20.5 10 0 17 3.5 21.8 11.8l-10.6 6.8c-2.7-4.8-6.1-6.9-11.2-6.9-4.8 0-8 3-8 6.8 0 4.7 3.2 6.6 9.8 9.5l3.9 1.7c13.3 5.7 20.4 11.7 20.4 24.8 0 14.1-11.1 21.8-26.6 21.8-13.4 0-22.3-6.2-26.7-14.7l10.6-7zm-41.2.7c2.6 4.6 6.1 8.2 12.3 8.2 6.1 0 9.8-2.4 9.8-11.8v-49h14.3v49.2c0 17.2-9.9 24.7-24.3 24.7-11.7 0-19.3-5.9-23.2-14.3l11.1-7z" fill="#000" />
  </svg>
);

const ViteLogo: React.FC = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M123.5 18.8L66.7 122.3a4.5 4.5 0 01-8 0L2 18.8a4.5 4.5 0 015.6-6.2l56.8 24.6a4.5 4.5 0 003.5 0L117.9 12.6a4.5 4.5 0 015.6 6.2z" fill="#BD34FE" />
  </svg>
);

const TailwindLogo: React.FC = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M32 32c12.8 0 21.3 6.4 25.6 19.2C51.2 64 64 68.3 76.8 68.3c12.8 0 21.3-6.4 25.6-19.2-6.4 12.8-19.2 17.1-32 17.1C57.6 66.1 44.8 61.9 32 32zm-19.2 36.3c12.8 0 21.3 6.4 25.6 19.2C32 100.3 44.8 104.5 57.6 104.5c12.8 0 21.3-6.4 25.6-19.2-6.4 12.8-19.2 17.1-32 17.1-12.8 0-25.6-4.2-38.4-34.1z" fill="#38BDF8" />
  </svg>
);

const GSAPLogo: React.FC = () => (
  <svg className="w-5 h-5 rounded shrink-0" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="128" height="128" rx="16" fill="#00E676" />
    <text x="64" y="80" textAnchor="middle" fill="#000" fontSize="38" fontWeight="900" fontFamily="sans-serif">GSAP</text>
  </svg>
);

const GitLogo: React.FC = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M122.7 57.1L70.9 5.3a12.8 12.8 0 00-18.1 0L37.1 21a12.9 12.9 0 00-3.3 14.1l-14 14a12.8 12.8 0 00-14.5 3L2.5 54.9a12.8 12.8 0 000 18.1l51.8 51.8a12.8 12.8 0 0018.1 0l50.3-50.3a12.8 12.8 0 000-17.4z" fill="#F05032" />
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
      { name: 'React', logo: ReactLogo },
      { name: 'TypeScript', logo: TSLogo },
      { name: 'JavaScript', logo: JSLogo },
    ],
  },
  {
    category: 'STYLING & MOTION',
    items: [
      { name: 'Tailwind CSS', logo: TailwindLogo },
      { name: 'GSAP', logo: GSAPLogo },
    ],
  },
  {
    category: 'BUILD TOOL',
    items: [{ name: 'Vite', logo: ViteLogo }],
  },
  {
    category: 'VCS',
    items: [{ name: 'Git / GitHub', logo: GitLogo }],
  },
];

export const PortfolioTechStack: React.FC = () => {
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
        Verified Tech Stack
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
