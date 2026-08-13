import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { InternshipDocuments } from './InternshipDocuments';

gsap.registerPlugin(ScrollTrigger);

export const ExperienceSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  
  const evidenceRef = useRef<HTMLDivElement>(null);
  const companyRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const projectRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);

  const isReducedMotion = useRef(false);

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

      // 1. Eyebrow & Line animation
      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );

      tl.fromTo(
        lineRef.current,
        { width: 0, opacity: 0 },
        { width: 36, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      );

      // 2. Heading reveal (smooth upward reveal)
      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 20, filter: 'blur(4px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' },
        '-=0.3'
      );

      // 3. Staggered entrance animation for Left Document Stage & Right Experience Info
      const experienceElements = [
        evidenceRef.current,
        companyRef.current,
        roleRef.current,
        projectRef.current,
        techRef.current,
        descRef.current,
      ].filter(Boolean);

      tl.fromTo(
        experienceElements,
        { opacity: 0, y: 20, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
        },
        '-=0.4'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative w-full py-28 sm:py-36 md:py-44 px-4 sm:px-8 lg:px-10 flex flex-col items-center justify-center z-10 overflow-hidden"
    >
      {/* Hidden Accessible Text for Screen Readers */}
      <div className="sr-only">
        <h2>Professional Experience - Oasis Infobyte</h2>
        <p>Full Stack Development Intern, January 2026 to February 2026.</p>
        <p>
          Developed SliceIt, a MERN-stack pizza delivery application as an internship project, implementing authentication, order management, inventory management, and user workflows.
        </p>
        <p>
          Built REST APIs and an admin dashboard, and integrated the Razorpay payment gateway to support the application's ordering and payment flow.
        </p>
      </div>

      <div className="max-w-5xl w-full mx-auto" aria-hidden="true">
        {/* Eyebrow Label with Light-Blue Line Micro-Interaction */}
        <div ref={eyebrowRef} className="flex items-center gap-3 mb-6">
          <span className="text-xs font-mono font-medium tracking-[0.25em] text-[var(--accent)] uppercase">
            EXPERIENCE
          </span>
          <div
            ref={lineRef}
            className="h-[1px] bg-[var(--accent)]/60 rounded-full will-change-[width]"
          />
        </div>

        {/* Section Heading */}
        <h2
          ref={headingRef}
          className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-[var(--text-primary)] leading-tight mb-12 sm:mb-16"
        >
          Building Technical Solutions.
        </h2>

        {/* Two-Column Composition: Left Document Showcase Stage, Right Experience Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* LEFT COLUMN: Compact Overlapping Document Stage */}
          <div ref={evidenceRef} className="lg:col-span-5 flex justify-center lg:justify-start">
            <InternshipDocuments
              offerLetterImage="/offer_letter.png"
              certificateImage="/certificate.png"
            />
          </div>

          {/* RIGHT COLUMN: Primary Experience Information */}
          <div className="lg:col-span-7 space-y-8">
            {/* Company & Role Header */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-6 border-b border-[var(--border-subtle)]">
              <div ref={companyRef}>
                <h3 className="text-2xl sm:text-3xl font-semibold text-[var(--text-primary)] tracking-tight">
                  Oasis Infobyte
                </h3>
                <div ref={roleRef} className="text-base sm:text-lg text-[var(--accent)] font-medium mt-1">
                  Full Stack Development Intern
                </div>
              </div>
              <div className="text-xs sm:text-sm font-mono text-[var(--text-muted)] shrink-0">
                Jan 2026 — Feb 2026
              </div>
            </div>

            {/* Internship Project Details */}
            <div ref={projectRef} className="pt-1 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono tracking-widest text-[var(--accent)] uppercase">
                  INTERNSHIP PROJECT
                </span>
                <span className="text-[var(--border-subtle)]">&bull;</span>
                <span className="text-sm font-semibold text-[var(--text-primary)]">
                  SliceIt
                </span>
                <span className="text-xs text-[var(--text-muted)] font-mono">
                  (Pizza Delivery System)
                </span>
              </div>

              {/* Technical Highlights */}
              <div ref={techRef} className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs sm:text-sm font-mono">
                <span className="text-[var(--accent)] uppercase tracking-wider text-[11px] font-semibold">Technical Highlights:</span>
                <span className="text-[var(--text-primary)] font-medium">MERN Stack</span>
                <span className="text-[var(--border-subtle)]">&bull;</span>
                <span className="text-[var(--text-primary)] font-medium">REST APIs</span>
                <span className="text-[var(--border-subtle)]">&bull;</span>
                <span className="text-[var(--text-primary)] font-medium">MongoDB</span>
                <span className="text-[var(--border-subtle)]">&bull;</span>
                <span className="text-[var(--text-primary)] font-medium">Razorpay</span>
              </div>

              {/* Concise Description */}
              <div ref={descRef} className="space-y-4 text-base sm:text-lg text-[var(--text-secondary)] font-sans leading-relaxed pt-1">
                <p>
                  Developed SliceIt, a MERN-stack pizza delivery application as an internship project, implementing authentication, order management, inventory management, and user workflows.
                </p>
                <p>
                  Built REST APIs and an admin dashboard, and integrated the Razorpay payment gateway to support the application's ordering and payment flow.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
