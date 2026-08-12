import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TechStackIcon } from './TechStackIcon';
import type { TechItem } from './techStackData';

gsap.registerPlugin(ScrollTrigger);

interface OrbitTechNode extends TechItem {
  orbit: 1 | 2 | 3;
  angle: number; // Degrees
  category: string;
}

const ORBIT_TECH_DATA: OrbitTechNode[] = [
  // Orbit 1 (Inner Radius ~145px on Desktop) - 6 Core
  { name: 'Python', slug: 'python', customColor: '3776AB', category: 'AI / Language', orbit: 1, angle: 270 },
  { name: 'React', slug: 'react', customColor: '61DAFB', category: 'Frontend', orbit: 1, angle: 30 },
  { name: 'Node.js', slug: 'nodedotjs', customColor: '5FA04E', category: 'Backend', orbit: 1, angle: 90 },
  { name: 'Java', slug: 'java', customColor: 'ED8B00', category: 'Language', orbit: 1, angle: 150 },
  { name: 'JavaScript', slug: 'javascript', customColor: 'F7DF1E', category: 'Frontend / JS', orbit: 1, angle: 210 },
  { name: 'SQL', slug: 'mysql', customColor: '4479A1', category: 'Database', orbit: 1, angle: 330 },

  // Orbit 2 (Middle Radius ~235px on Desktop) - 8 Frameworks & AI
  { name: 'OpenCV', slug: 'opencv', customColor: '5C3EE8', category: 'AI / Computer Vision', orbit: 2, angle: 285 },
  { name: 'LangChain', slug: 'langchain', customColor: '1C3C3C', category: 'AI / LLM Framework', orbit: 2, angle: 345 },
  { name: 'RAG', slug: 'openai', customColor: '6DB8F5', category: 'AI Architecture', orbit: 2, angle: 45 },
  { name: 'Google Gemini API', slug: 'googlegemini', customColor: '8E75B2', category: 'AI / LLM Model', orbit: 2, angle: 105 },
  { name: 'Express.js', slug: 'express', customColor: 'E8EEF5', category: 'Backend Framework', orbit: 2, angle: 165 },
  { name: 'Scikit-learn', slug: 'scikitlearn', customColor: 'F7931E', category: 'AI / Machine Learning', orbit: 2, angle: 225 },
  { name: 'MongoDB', slug: 'mongodb', customColor: '47A248', category: 'NoSQL Database', orbit: 2, angle: 135 },
  { name: 'Supabase', slug: 'supabase', customColor: '3ECF8E', category: 'Database / Backend', orbit: 2, angle: 195 },

  // Orbit 3 (Outer Radius ~325px on Desktop) - 6 Tools & Cloud
  { name: 'Git', slug: 'git', customColor: 'F05032', category: 'Version Control', orbit: 3, angle: 15 },
  { name: 'GitHub', slug: 'github', customColor: 'E8EEF5', category: 'DevOps / Platform', orbit: 3, angle: 75 },
  { name: 'VS Code', slug: 'visualstudiocode', customColor: '007ACC', category: 'Developer Tool', orbit: 3, angle: 135 },
  { name: 'Streamlit', slug: 'streamlit', customColor: 'FF4B4B', category: 'AI App UI Framework', orbit: 3, angle: 195 },
  { name: 'Render', slug: 'render', customColor: '46E3B7', category: 'Cloud Deployment', orbit: 3, angle: 255 },
  { name: 'Vercel', slug: 'vercel', customColor: 'E8EEF5', category: 'Cloud Hosting', orbit: 3, angle: 315 },
];

const MOBILE_CATEGORIES = [
  {
    title: 'Languages & Core Web',
    items: ORBIT_TECH_DATA.filter((t) =>
      ['Python', 'Java', 'JavaScript', 'React', 'Node.js', 'SQL'].includes(t.name)
    ),
  },
  {
    title: 'AI & Machine Learning',
    items: ORBIT_TECH_DATA.filter((t) =>
      ['OpenCV', 'LangChain', 'RAG', 'Google Gemini API', 'Scikit-learn', 'Streamlit'].includes(t.name)
    ),
  },
  {
    title: 'Backend & Databases',
    items: ORBIT_TECH_DATA.filter((t) =>
      ['Express.js', 'MongoDB', 'Supabase'].includes(t.name)
    ),
  },
  {
    title: 'DevOps & Tools',
    items: ORBIT_TECH_DATA.filter((t) =>
      ['Git', 'GitHub', 'VS Code', 'Render', 'Vercel'].includes(t.name)
    ),
  },
];

export const TechnicalOrbitSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const orbitsSvgRef = useRef<SVGSVGElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [hoveredOrbit, setHoveredOrbit] = useState<number | null>(null);
  const [activeTech, setActiveTech] = useState<OrbitTechNode | null>(null);
  const [centerHovered, setCenterHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const isReducedMotion = useRef(false);

  // Track responsive screen size for dynamic orbit radii
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const setNodeRef = (index: number) => (el: HTMLDivElement | null) => {
    nodeRefs.current[index] = el;
  };

  useEffect(() => {
    isReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isReducedMotion.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      });

      // 1. Eyebrow reveal
      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );

      // Line expansion
      tl.fromTo(
        lineRef.current,
        { width: 0, opacity: 0 },
        { width: 36, opacity: 1, duration: 0.5, ease: 'power2.out' },
        '-=0.3'
      );

      // 2. Heading reveal
      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 20, filter: 'blur(4px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, ease: 'power3.out' },
        '-=0.3'
      );

      // 3. Center Anchor Badge reveal
      if (centerRef.current) {
        tl.fromTo(
          centerRef.current,
          { opacity: 0, scale: 0.82 },
          { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.4)' },
          '-=0.2'
        );
      }

      // 4. Orbit paths reveal
      if (orbitsSvgRef.current) {
        tl.fromTo(
          orbitsSvgRef.current,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' },
          '-=0.6'
        );
      }

      // 5. Tech nodes staggered reveal
      const validNodes = nodeRefs.current.filter(Boolean);
      if (validNodes.length > 0) {
        tl.fromTo(
          validNodes,
          { opacity: 0, scale: 0.85 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.04,
            ease: 'power3.out',
          },
          '-=0.5'
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  // Compute radii based on desktop vs mobile
  const getRadius = (orbit: 1 | 2 | 3) => {
    if (isMobile) {
      if (orbit === 1) return 95;
      if (orbit === 2) return 155;
      return 215;
    }
    if (orbit === 1) return 135;
    if (orbit === 2) return 225;
    return 315;
  };

  const orbitRadii = [getRadius(1), getRadius(2), getRadius(3)];

  return (
    <section
      id="tech-stack"
      ref={sectionRef}
      className="relative w-full py-24 sm:py-32 md:py-40 px-4 sm:px-8 lg:px-10 flex flex-col items-center justify-center z-10 overflow-hidden"
    >
      {/* Screen Reader Accessibility */}
      <div className="sr-only">
        <h2>Technical Stack</h2>
        <p>
          Technologies and tools I use to build full-stack applications, AI-powered systems, and practical software solutions.
        </p>
        <ul>
          {ORBIT_TECH_DATA.map((item) => (
            <li key={item.name}>
              {item.name} ({item.category})
            </li>
          ))}
        </ul>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl w-full mx-auto flex flex-col items-center text-center">
        {/* Eyebrow Label */}
        <div ref={eyebrowRef} className="flex items-center gap-3 mb-4 justify-center">
          <span className="text-xs font-mono font-medium tracking-[0.25em] text-[var(--accent)] uppercase">
            TECHNICAL STACK
          </span>
          <div
            ref={lineRef}
            className="h-[1px] bg-[var(--accent)]/60 rounded-full will-change-[width]"
          />
        </div>

        {/* Section Heading & Intro */}
        <div ref={headingRef} className="max-w-2xl text-center mb-12 sm:mb-16">
          <p className="text-base sm:text-lg md:text-xl font-normal text-[var(--text-primary)] leading-relaxed font-sans">
            Technologies and tools I use to build full-stack applications, AI-powered systems, and practical software solutions.
          </p>
        </div>

        {/* DESKTOP INTERACTIVE ORBIT STAGE (md:flex) */}
        <div
          className="hidden md:flex relative w-full max-w-[850px] min-h-[520px] sm:min-h-[640px] md:min-h-[680px] items-center justify-center my-4"
          aria-hidden="true"
        >
          {/* Background Orbit Ring Paths (SVG) */}
          <svg
            ref={orbitsSvgRef}
            className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-500"
            viewBox="-380 -380 760 760"
          >
            {orbitRadii.map((r, idx) => {
              const orbitNum = (idx + 1) as 1 | 2 | 3;
              const isHighlighted = hoveredOrbit === orbitNum || centerHovered;
              return (
                <circle
                  key={idx}
                  r={r}
                  cx={0}
                  cy={0}
                  fill="none"
                  stroke={isHighlighted ? '#2686D9' : '#6DB8F5'}
                  strokeOpacity={isHighlighted ? 0.35 : 0.1}
                  strokeDasharray={isHighlighted ? '6 6' : '4 6'}
                  strokeWidth={isHighlighted ? 1.5 : 1}
                  className="transition-all duration-300"
                />
              );
            })}
          </svg>

          {/* CENTER ANCHOR ELEMENT */}
          <div
            ref={centerRef}
            onMouseEnter={() => setCenterHovered(true)}
            onMouseLeave={() => setCenterHovered(false)}
            className={`relative z-20 w-36 h-36 sm:w-44 sm:h-44 rounded-full border flex flex-col items-center justify-center text-center p-3 sm:p-4 transition-all duration-500 cursor-default select-none ${
              centerHovered || activeTech
                ? 'border-[var(--accent)]/60 bg-[var(--bg-secondary)] shadow-md scale-105'
                : 'border-[var(--border-subtle)] bg-[var(--bg-surface)]'
            }`}
          >
            {/* Ambient Radial Accent Glow */}
            <div className="absolute inset-0 rounded-full bg-radial from-[var(--accent)]/10 to-transparent pointer-events-none" />

            <span className="text-[9px] sm:text-[10px] font-mono font-semibold tracking-[0.2em] text-[var(--accent)] uppercase mb-0.5">
              {activeTech ? 'TECHNOLOGY' : 'ENGINEERING'}
            </span>
            <h3 className="text-xs sm:text-sm font-mono font-bold tracking-wider text-[var(--text-primary)] leading-tight transition-colors duration-300">
              {activeTech ? activeTech.name : 'AI + FULL STACK'}
            </h3>
            <p className="text-[10px] sm:text-[11px] font-mono text-[var(--accent)] mt-0.5 transition-colors duration-300">
              {activeTech ? activeTech.category : 'Full-Stack & AI Ecosystem'}
            </p>
          </div>

          {/* ORBITING TECHNOLOGY NODES */}
          {ORBIT_TECH_DATA.map((item, idx) => {
            const radius = getRadius(item.orbit);
            const rad = (item.angle * Math.PI) / 180;
            const x = Math.round(radius * Math.cos(rad));
            const y = Math.round(radius * Math.sin(rad));

            const isHovered = activeTech?.name === item.name;

            return (
              <div
                key={item.name}
                ref={setNodeRef(idx)}
                tabIndex={0}
                role="button"
                aria-label={`${item.name}, ${item.category}`}
                onMouseEnter={() => {
                  setActiveTech(item);
                  setHoveredOrbit(item.orbit);
                }}
                onMouseLeave={() => {
                  setActiveTech(null);
                  setHoveredOrbit(null);
                }}
                onFocus={() => {
                  setActiveTech(item);
                  setHoveredOrbit(item.orbit);
                }}
                onBlur={() => {
                  setActiveTech(null);
                  setHoveredOrbit(null);
                }}
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                }}
                className={`absolute z-30 transition-all duration-300 outline-none ${
                  isHovered ? 'z-40 scale-110' : 'scale-100 hover:scale-105'
                }`}
              >
                <div
                  className={`group flex items-center gap-2.5 px-3 py-1.5 rounded-full border backdrop-blur-md cursor-pointer transition-all duration-300 ${
                    isHovered
                      ? 'bg-[var(--bg-surface)] border-[var(--accent)] shadow-md'
                      : 'bg-[var(--bg-secondary)] border-[var(--border-subtle)] hover:border-[var(--accent)]/50'
                  }`}
                >
                  <TechStackIcon item={item} className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
                  <span
                    className={`text-xs sm:text-sm font-medium whitespace-nowrap transition-colors duration-300 ${
                      isHovered ? 'text-[var(--accent)]' : 'text-[var(--text-primary)] group-hover:text-[var(--accent)]'
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* MOBILE CATEGORIZED TECH STACK (< md) */}
        <div className="flex md:hidden flex-col gap-7 w-full text-left mt-4 px-2">
          {MOBILE_CATEGORIES.map((cat) => (
            <div key={cat.title} className="flex flex-col space-y-3">
              <div className="flex items-center gap-2">
                <h3 className="font-mono text-xs font-semibold tracking-[0.2em] text-[var(--accent)] uppercase">
                  {cat.title}
                </h3>
                <div className="h-[1px] flex-grow bg-[var(--accent)]/30 rounded-full" />
              </div>

              <div className="flex flex-wrap gap-x-5 gap-y-3.5 pt-1">
                {cat.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center gap-2 text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
                  >
                    <TechStackIcon item={item} className="w-4 h-4 shrink-0" />
                    <span className="text-sm font-medium font-sans">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
