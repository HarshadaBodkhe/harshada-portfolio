import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { RoleAnimation } from './RoleAnimation';
import { ProfilePlaceholder } from './ProfilePlaceholder';
import type { WorkspaceMode } from '../ui/WorkspaceSelector';

export interface HeroProps {
  workspaceMode?: WorkspaceMode;
  onWorkspaceChange?: (mode: WorkspaceMode) => void;
}

export const Hero: React.FC<HeroProps> = ({
  workspaceMode: propWorkspaceMode,
}) => {
  const [internalWorkspaceMode] = useState<WorkspaceMode>('recruiter');
  const workspaceMode = propWorkspaceMode !== undefined ? propWorkspaceMode : internalWorkspaceMode;
  const [displayedMode, setDisplayedMode] = useState<WorkspaceMode>('recruiter');

  const heroRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const dynamicContentRef = useRef<HTMLDivElement>(null);

  const activeTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const isInitialRender = useRef(true);

  // Sync displayedMode when propWorkspaceMode changes initially or externally
  useEffect(() => {
    if (propWorkspaceMode !== undefined) {
      setDisplayedMode(propWorkspaceMode);
    }
  }, [propWorkspaceMode]);

  // Initial Entrance Animation on Page Mount
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });
      activeTimelineRef.current = tl;

      // 1. Eyebrow label reveal
      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 1.1, ease: 'power2.out' }
      );

      // 2. Main heading entrance
      tl.fromTo(
        nameRef.current,
        { opacity: 0, y: 30, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.6, ease: 'power3.out' },
        '-=0.4'
      );

      // 3. Dynamic Content Area reveal
      tl.fromTo(
        dynamicContentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.4, ease: 'power2.out' },
        '-=0.6'
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Sync displayedMode when workspaceMode changes
  useEffect(() => {
    setDisplayedMode(workspaceMode);
  }, [workspaceMode]);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
    }
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-[calc(100vh-5rem)] flex items-center justify-center py-16 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-10"
    >
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        {/* TEXT COLUMN: Second on mobile, First on desktop */}
        <div className="lg:col-span-7 flex flex-col justify-center z-10 order-2 lg:order-1">
          {/* Eyebrow Label - Anchored */}
          <div ref={eyebrowRef} className="mb-4">
            <p className="text-xs sm:text-sm font-mono font-bold tracking-[0.22em] text-[var(--accent)] uppercase">
              {displayedMode === 'engineer' ? 'ENGINEER WORKSPACE' : "HI, I'M"}
            </p>
          </div>

          {/* Main Editorial Heading - Dynamic per Workspace Mode */}
          <div className="mb-6">
            {displayedMode === 'engineer' ? (
              <h1
                ref={nameRef}
                className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-[var(--text-primary)] leading-[1.1]"
              >
                BUILDING SYSTEMS,{' '}
                <span className="text-[var(--accent)] font-normal block sm:inline">
                  NOT JUST INTERFACES.
                </span>
              </h1>
            ) : (
              <h1
                ref={nameRef}
                className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-[var(--text-primary)] leading-[1.08]"
              >
                Harshada <span className="text-[var(--accent)] font-normal">Bodkhe</span>
              </h1>
            )}
          </div>

          {/* Dynamic Content Area (Copy per Workspace Mode) */}
          <div ref={dynamicContentRef} className="w-full">
            {displayedMode === 'engineer' ? (
              <>
                {/* ENGINEER WORKSPACE HERO CONTENT */}
                <div className="space-y-4 max-w-xl font-sans mt-2">
                  <p className="text-base sm:text-lg text-[var(--text-primary)] leading-relaxed font-medium">
                    I enjoy turning complex problems into reliable software, from designing the architecture to implementing the final system.
                  </p>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    This workspace explores the engineering behind my projects: architecture, workflows, technical decisions, implementation, and the problems solved along the way.
                  </p>
                </div>
              </>
            ) : (
              <>
                {/* RECRUITER WORKSPACE (FORMER LANDING PAGE) HERO CONTENT */}
                <div className="my-6 py-3 border-y border-[var(--border-subtle)]">
                  <RoleAnimation />
                </div>

                <div className="space-y-4 max-w-xl text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed font-sans mt-4">
                  <p>
                    Building intelligent, practical applications across AI, full-stack development, and modern web technologies, with a focus on solving real-world problems.
                  </p>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                    This portfolio showcases projects, technical journey, and the engineering approach behind what I build.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Profile Picture */}
        <div className="lg:col-span-5 flex items-center justify-center lg:justify-start lg:-ml-6 z-10 w-full py-4 lg:py-0 order-1 lg:order-2">
          {/* Profile Picture with continuous subtle floating animation */}
          <ProfilePlaceholder imageSrc="/profile_portrait.png" altText="Harshada Bodkhe" />
        </div>

        {/* Full 12-Column Centered Scroll Cue Row Directly Below Hero Section */}
        {displayedMode === 'recruiter' && (
          <div
            id="hero-scroll-cue"
            className="col-span-1 lg:col-span-12 order-3 w-full flex flex-col items-center justify-center text-center pt-4 sm:pt-5 mt-1 sm:mt-2 z-20"
          >
            <p className="text-base sm:text-lg md:text-xl text-[var(--text-primary)] font-sans font-medium tracking-tight">
              A closer look at my work.
            </p>
            <p className="text-xs sm:text-sm font-mono text-[var(--accent)] flex items-center justify-center gap-1.5 tracking-wide font-semibold mt-1.5">
              <span>Scroll to continue</span>
              <span className="animate-bounce inline-block text-sm sm:text-base">↓</span>
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
