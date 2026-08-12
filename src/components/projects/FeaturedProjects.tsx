import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X } from 'lucide-react';
import { PROJECTS } from './projects';
import { ProjectCard } from './ProjectCard';
import { ProjectImage } from './ProjectImage';
import { ProjectDetail } from './ProjectDetail';

gsap.registerPlugin(ScrollTrigger);

interface FeaturedProjectsProps {
  onNavigateToEngineerProject?: (projectId: string) => void;
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({
  onNavigateToEngineerProject,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [isEntranceComplete, setIsEntranceComplete] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isReducedMotion = useRef(false);

  const activeProject = PROJECTS.find((p) => p.id === activeProjectId);

  const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
    cardRefs.current[index] = el;
  };

  useEffect(() => {
    const handleResize = () => {
      const isTouchOrSmall = window.innerWidth < 1024 || window.matchMedia('(pointer: coarse)').matches;
      setIsMobile(isTouchOrSmall);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 180ms hover delay handler for desktop (disabled on mobile sizes so projects open on click)
  const handleMouseEnter = (id: string) => {
    if (!isEntranceComplete || isMobile) return;
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      setActiveProjectId(id);
    }, 180);
  };

  const handleMouseLeave = () => {
    if (!isEntranceComplete || isMobile) return;
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    setActiveProjectId(null);
  };

  const handleFocus = (id: string) => {
    if (!isEntranceComplete || isMobile) return;
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    setActiveProjectId(id);
  };

  const handleClick = (id: string) => {
    if (!isEntranceComplete) return;
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    setActiveProjectId((prev) => (prev === id ? null : id));
  };

  // Esc key shortcut to collapse
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeProjectId !== null) {
        setActiveProjectId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeProjectId]);

  // GSAP ScrollTrigger entrance reveal sequence
  useEffect(() => {
    isReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isReducedMotion.current) {
      setIsEntranceComplete(true);
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
        onComplete: () => {
          setIsEntranceComplete(true);
        },
      });

      // 1. Eyebrow reveal
      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
      );

      // 2. Line expansion
      tl.fromTo(
        lineRef.current,
        { width: 0, opacity: 0 },
        { width: 36, opacity: 1, duration: 0.5, ease: 'power2.out' },
        '-=0.4'
      );

      // 3. Section Heading reveal
      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 25, filter: 'blur(4px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' },
        '-=0.3'
      );

      // 4. Sequential 4 project items entrance (Dwello -> ClassLens -> SliceIt -> AI Research)
      const validCards = cardRefs.current.filter(Boolean);
      tl.fromTo(
        validCards,
        { opacity: 0, y: 35, scale: 0.96, filter: 'blur(4px)' },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.7,
          stagger: 0.18,
          ease: 'power3.out',
        },
        '-=0.3'
      );
    }, sectionRef);

    return () => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full py-28 sm:py-36 md:py-44 px-4 sm:px-8 lg:px-10 flex flex-col items-center justify-center z-10 overflow-hidden"
    >
      {/* Hidden Accessible Text for Screen Readers */}
      <div className="sr-only">
        <h2>Featured Projects</h2>
        <p>Dwello — Stay Reservation Platform</p>
        <p>ClassLens — Intelligent Attendance System</p>
        <p>SliceIt — Pizza Delivery System</p>
        <p>AI Research Assistant — Agentic RAG System</p>
        <p>Harshada Portfolio — Personal Portfolio</p>
      </div>

      <div className="max-w-7xl w-full mx-auto flex flex-col items-center text-center" aria-hidden="true">
        {/* Eyebrow Label */}
        <div ref={eyebrowRef} className="flex items-center gap-3 mb-3 justify-center">
          <span className="text-xs font-mono font-medium tracking-[0.25em] text-[var(--accent)] uppercase">
            FEATURED PROJECTS
          </span>
          <div
            ref={lineRef}
            className="h-[1.5px] bg-[var(--accent)] rounded-full will-change-[width]"
          />
        </div>

        {/* Introductory Supporting Sentence */}
        <p
          ref={headingRef}
          className="text-base sm:text-lg md:text-xl font-sans font-normal text-[var(--text-secondary)] leading-relaxed mb-10 sm:mb-14 md:mb-16 max-w-2xl text-center"
        >
          A look at the problems I’ve explored and the solutions I’ve built.
        </p>

        {/* Dedicated Showcase Stage with Stable Height to Prevent Page Jumps */}
        <div
          ref={stageRef}
          className="relative w-full min-h-[560px] sm:min-h-[640px] flex items-center justify-center"
        >
          {/* INITIAL STATE: 3 Projects in Row 1, 2 Projects in Row 2 (Desktop) / Vertical Stack (Mobile) */}
          <div
            className={`w-full max-w-5xl transition-all duration-500 ease-out flex flex-col gap-8 sm:gap-10 lg:gap-12 ${
              activeProjectId ? 'opacity-0 pointer-events-none absolute inset-0' : 'opacity-100 relative'
            }`}
          >
            {/* ROW 1: 3 Projects */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-10">
              {PROJECTS.slice(0, 3).map((project, index) => (
                <ProjectCard
                  key={project.id}
                  ref={setCardRef(index)}
                  project={project}
                  isActive={false}
                  isAnyActive={false}
                  onMouseEnter={() => handleMouseEnter(project.id)}
                  onMouseLeave={() => {}}
                  onFocus={() => handleFocus(project.id)}
                  onClick={() => handleClick(project.id)}
                />
              ))}
            </div>

            {/* ROW 2: 2 Projects */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-10">
              {PROJECTS.slice(3, 5).map((project, index) => (
                <ProjectCard
                  key={project.id}
                  ref={setCardRef(index + 3)}
                  project={project}
                  isActive={false}
                  isAnyActive={false}
                  onMouseEnter={() => handleMouseEnter(project.id)}
                  onMouseLeave={() => {}}
                  onFocus={() => handleFocus(project.id)}
                  onClick={() => handleClick(project.id)}
                />
              ))}
            </div>
          </div>

          {/* ACTIVE EXPANDED STATE LAYER */}
          {activeProject && (
            <div
              onMouseLeave={handleMouseLeave}
              className="relative w-full max-w-4xl transition-all duration-600 ease-out z-20 py-4"
            >
              {/* TOP RIGHT CLOSE 'X' BUTTON */}
              <button
                onClick={() => setActiveProjectId(null)}
                aria-label="Close project preview"
                className="absolute top-0 right-0 z-30 p-2 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all duration-300 shadow-md"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center text-left pt-6 sm:pt-0">
                {/* LEFT: Moderate Project Image (~280-320px wide on desktop, 4:3 ratio) */}
                <div className="md:col-span-5 w-full max-w-[310px] mx-auto md:mx-0 shrink-0">
                  <ProjectImage
                    src={activeProject.image}
                    alt={`Screenshot of ${activeProject.name}`}
                    name={activeProject.name}
                    isActive={true}
                  />
                </div>

                {/* RIGHT: Detailed Project Information (No Outer Border) */}
                <div className="md:col-span-7 w-full">
                  <ProjectDetail
                    project={activeProject}
                    onNavigateToEngineerProject={onNavigateToEngineerProject}
                  />
                </div>
              </div>

              {/* Inactive Row Recede Indicator & Switcher */}
              <div className="mt-8 pt-6 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-start gap-4 sm:gap-6 text-xs font-mono text-[var(--text-muted)]">
                {PROJECTS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleClick(p.id)}
                    className={`transition-colors duration-300 ${
                      p.id === activeProjectId
                        ? 'text-[var(--accent)] font-semibold underline underline-offset-4'
                        : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
