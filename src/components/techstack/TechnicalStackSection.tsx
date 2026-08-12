import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TECH_STACK_CATEGORIES } from './techStackData';
import { TechStackIcon } from './TechStackIcon';

gsap.registerPlugin(ScrollTrigger);

export const TechnicalStackSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const columnRefs = useRef<(HTMLDivElement | null)[]>([]);

  const isReducedMotion = useRef(false);

  const setColumnRef = (index: number) => (el: HTMLDivElement | null) => {
    columnRefs.current[index] = el;
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
          start: 'top 75%',
          once: true,
        },
      });

      // 1. Eyebrow label reveal
      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );

      // Line expansion
      tl.fromTo(
        lineRef.current,
        { width: 0, opacity: 0 },
        { width: 36, opacity: 1, duration: 0.5, ease: 'power2.out' },
        '-=0.4'
      );

      // 2. Heading & Introduction reveal
      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 20, filter: 'blur(4px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' },
        '-=0.3'
      );

      // 3. Staggered reveal of the 3 Columns
      const validColumns = columnRefs.current.filter(Boolean);
      tl.fromTo(
        validColumns,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
        },
        '-=0.3'
      );

      // 4. Subtle accent line expand under category headings
      const categoryLines = sectionRef.current?.querySelectorAll('.category-line');
      if (categoryLines && categoryLines.length > 0) {
        tl.fromTo(
          categoryLines,
          { width: 0, opacity: 0 },
          { width: 48, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out' },
          '-=0.5'
        );
      }

      // 5. Tech items reveal inside each category
      const techItems = sectionRef.current?.querySelectorAll('.tech-item');
      if (techItems && techItems.length > 0) {
        tl.fromTo(
          techItems,
          { opacity: 0, y: 8 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.04,
            ease: 'power2.out',
          },
          '-=0.4'
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  // EXACT THREE-COLUMN GROUPING:
  // COLUMN 1: LANGUAGES, AI / MACHINE LEARNING
  // COLUMN 2: FRONTEND, DATABASES
  // COLUMN 3: BACKEND, TOOLS & PLATFORMS
  const column1 = [TECH_STACK_CATEGORIES[0], TECH_STACK_CATEGORIES[3]]; // LANGUAGES, AI / ML
  const column2 = [TECH_STACK_CATEGORIES[1], TECH_STACK_CATEGORIES[4]]; // FRONTEND, DATABASES
  const column3 = [TECH_STACK_CATEGORIES[2], TECH_STACK_CATEGORIES[5]]; // BACKEND, TOOLS & PLATFORMS

  return (
    <section
      id="tech-stack"
      ref={sectionRef}
      className="relative w-full py-28 sm:py-36 px-4 sm:px-8 lg:px-10 flex flex-col items-center justify-center z-10 overflow-hidden"
    >
      {/* Accessibility */}
      <div className="sr-only">
        <h2>Technical Stack</h2>
        <p>
          Technologies and tools I use to build full-stack applications, AI-powered systems, and practical software solutions.
        </p>
        <ul>
          {TECH_STACK_CATEGORIES.map((cat) => (
            <li key={cat.title}>
              {cat.title}: {cat.skills.map((s) => s.name).join(', ')}
            </li>
          ))}
        </ul>
      </div>

      <div className="max-w-6xl w-full mx-auto flex flex-col items-center text-center" aria-hidden="true">
        {/* Centered Eyebrow Label */}
        <div ref={eyebrowRef} className="flex items-center gap-3 mb-4 justify-center">
          <span className="text-xs font-mono font-medium tracking-[0.25em] text-[var(--accent)] uppercase">
            TECHNICAL STACK
          </span>
          <div
            ref={lineRef}
            className="h-[1px] bg-[var(--accent)]/60 rounded-full will-change-[width]"
          />
        </div>

        {/* Centered Section Heading / Short Intro */}
        <div ref={headingRef} className="max-w-2xl text-center mb-16 sm:mb-20">
          <p className="text-base sm:text-lg md:text-xl font-normal text-[var(--text-primary)] leading-relaxed font-sans">
            Technologies and tools I use to build full-stack applications, AI-powered systems, and practical software solutions.
          </p>
        </div>

        {/* THREE EQUAL COLUMNS - CENTERED DIRECTLY BELOW HEADING */}
        <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-14 justify-items-center text-left">
          {/* COLUMN 1 */}
          <div ref={setColumnRef(0)} className="flex flex-col gap-12 sm:gap-14 w-full max-w-[210px] sm:max-w-[220px]">
            {column1.map((category) => (
              <div key={category.title} className="flex flex-col items-start text-left w-full">
                <h3 className="text-xs font-mono font-semibold tracking-[0.2em] text-[var(--accent)] uppercase mb-1.5">
                  {category.title}
                </h3>
                {/* Accent Line aligned left with category header */}
                <div className="category-line h-[1px] bg-[var(--accent)]/50 rounded-full mb-5 w-12" />

                {/* Left-Aligned Vertical Technology List */}
                <div className="flex flex-col space-y-3.5 w-full items-start">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="tech-item group flex items-center gap-3 cursor-default transition-colors duration-300"
                    >
                      <TechStackIcon item={skill} className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />
                      <span className="text-sm sm:text-base font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-300">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* COLUMN 2 */}
          <div ref={setColumnRef(1)} className="flex flex-col gap-12 sm:gap-14 w-full max-w-[210px] sm:max-w-[220px]">
            {column2.map((category) => (
              <div key={category.title} className="flex flex-col items-start text-left w-full">
                <h3 className="text-xs font-mono font-semibold tracking-[0.2em] text-[var(--accent)] uppercase mb-1.5">
                  {category.title}
                </h3>
                {/* Accent Line aligned left with category header */}
                <div className="category-line h-[1px] bg-[var(--accent)]/50 rounded-full mb-5 w-12" />

                {/* Left-Aligned Vertical Technology List */}
                <div className="flex flex-col space-y-3.5 w-full items-start">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="tech-item group flex items-center gap-3 cursor-default transition-colors duration-300"
                    >
                      <TechStackIcon item={skill} className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />
                      <span className="text-sm sm:text-base font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-300">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* COLUMN 3 */}
          <div ref={setColumnRef(2)} className="flex flex-col gap-12 sm:gap-14 w-full max-w-[210px] sm:max-w-[220px]">
            {column3.map((category) => (
              <div key={category.title} className="flex flex-col items-start text-left w-full">
                <h3 className="text-xs font-mono font-semibold tracking-[0.2em] text-[var(--accent)] uppercase mb-1.5">
                  {category.title}
                </h3>
                {/* Accent Line aligned left with category header */}
                <div className="category-line h-[1px] bg-[var(--accent)]/50 rounded-full mb-5 w-12" />

                {/* Left-Aligned Vertical Technology List */}
                <div className="flex flex-col space-y-3.5 w-full items-start">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="tech-item group flex items-center gap-3 cursor-default transition-colors duration-300"
                    >
                      <TechStackIcon item={skill} className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />
                      <span className="text-sm sm:text-base font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-300">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
