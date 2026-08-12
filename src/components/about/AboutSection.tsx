import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Clean configurable resume paths (ready for user to link actual PDF later)
export const RESUME_CONFIG = {
  viewUrl: '/resume/Harshada_Bodkhe_Resume.pdf',
  downloadUrl: '/resume/Harshada_Bodkhe_Resume.pdf',
  downloadFilename: 'Harshada_Bodkhe_Resume.pdf',
};

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const p1Ref = useRef<HTMLParagraphElement>(null);
  const p2Ref = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

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
          start: 'top 70%',
          once: true,
        },
      });

      // 1. Heading & Opening Thought reveal
      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      );

      // 2. Short 2 Paragraphs reveal
      const paragraphs = [p1Ref.current, p2Ref.current].filter(Boolean);
      tl.fromTo(
        paragraphs,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.16,
          ease: 'power3.out',
        },
        '-=0.3'
      );

      // 3. Resume Actions reveal
      if (buttonsRef.current) {
        const btns = buttonsRef.current.querySelectorAll('.about-resume-btn');
        tl.fromTo(
          btns,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power3.out',
          },
          '-=0.3'
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full py-24 sm:py-32 md:py-36 px-4 sm:px-8 lg:px-12 flex flex-col items-center justify-center z-10 overflow-hidden text-left"
    >
      {/* Screen Reader Accessibility */}
      <div className="sr-only">
        <h2>ABOUT ME</h2>
        <p>
          Building intelligent applications at the intersection of AI and full-stack development.
        </p>
        <p>
          I am an Artificial Intelligence &amp; Data Science undergraduate at Dr. D. Y. Patil Institute of Engineering, Management &amp; Research, Pune. My technical direction combines Full-Stack Development with AI, engineering software solutions using Java, Python, React, and REST APIs.
        </p>
        <p>
          Through projects like Dwello, SliceIt, and AI-driven platforms, I build web applications featuring secure authentication, automated workflows, and database optimization—driven by clean code principles and continuous learning.
        </p>
      </div>

      <div className="max-w-3xl w-full mx-auto space-y-8">
        {/* Header Block: Section Title & Subheading */}
        <div ref={headingRef} className="space-y-3">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold tracking-tight text-[var(--text-primary)] uppercase">
            ABOUT ME
          </h2>
          <p className="text-base sm:text-lg md:text-xl font-sans font-medium tracking-tight text-[var(--text-secondary)] leading-relaxed">
            Building intelligent applications at the intersection of{' '}
            <span className="text-[var(--accent)] font-semibold">AI</span> and{' '}
            <span className="text-[var(--accent)] font-semibold">full-stack development</span>.
          </p>
        </div>

        {/* 2 Clean & Short Paragraphs */}
        <div className="space-y-5 text-base sm:text-[17px] text-[var(--text-secondary)] font-sans leading-[1.75]">
          {/* Paragraph 1 */}
          <p ref={p1Ref}>
            I am an{' '}
            <span className="text-[var(--text-primary)] font-medium">
              Artificial Intelligence &amp; Data Science
            </span>{' '}
            undergraduate at Dr. D. Y. Patil Institute of Engineering, Management &amp; Research, Pune. My technical direction combines{' '}
            <span className="text-[var(--text-primary)] font-medium">Full-Stack Development</span> with AI, backed by strong problem-solving skills and expertise in{' '}
            <span className="text-[var(--text-primary)] font-medium">Data Structures &amp; Algorithms (DSA) in Java</span>.
          </p>

          {/* Paragraph 2 */}
          <p ref={p2Ref}>
            Through projects like{' '}
            <span className="text-[var(--text-primary)] font-medium">Dwello</span>,{' '}
            <span className="text-[var(--text-primary)] font-medium">SliceIt</span>, and{' '}
            <span className="text-[var(--text-primary)] font-medium">AI-driven platforms</span>, I build complete web applications using{' '}
            <span className="text-[var(--text-primary)] font-medium">Python</span>,{' '}
            <span className="text-[var(--text-primary)] font-medium">React</span>, and{' '}
            <span className="text-[var(--text-primary)] font-medium">REST APIs</span> featuring secure authentication, automated workflows, and database optimization—driven by clean code principles and continuous learning.
          </p>
        </div>

        {/* EDITORIAL RESUME ACTIONS */}
        <div
          ref={buttonsRef}
          className="flex flex-wrap items-center gap-3.5 pt-6 border-t border-[var(--border-subtle)]"
        >
          {/* VIEW RESUME (Primary Button) */}
          <a
            href={RESUME_CONFIG.viewUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Harshada Bodkhe resume"
            className="about-resume-btn inline-flex items-center gap-2 h-9 px-4 rounded-lg bg-[var(--accent)] text-white font-mono text-xs font-bold shadow-sm hover:bg-[var(--accent-hover)] hover:-translate-y-0.5 hover:scale-[1.02] transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          >
            <svg
              className="w-3.5 h-3.5 text-white group-hover:scale-110 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span className="keep-white">VIEW RESUME</span>
          </a>

          {/* DOWNLOAD RESUME (Secondary Button) */}
          <a
            href={RESUME_CONFIG.downloadUrl || '#'}
            download={RESUME_CONFIG.downloadFilename}
            aria-label="Download Harshada Bodkhe resume"
            className="about-resume-btn inline-flex items-center gap-2 h-9 px-4 rounded-lg bg-[var(--bg-surface)] border border-[var(--accent)]/40 text-[var(--accent)] font-mono text-xs font-semibold shadow-sm hover:bg-[var(--accent)]/15 hover:border-[var(--accent)]/70 hover:-translate-y-0.5 hover:scale-[1.02] transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          >
            <svg
              className="w-3.5 h-3.5 text-[var(--accent)] group-hover:translate-y-0.5 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>DOWNLOAD RESUME</span>
          </a>
        </div>
      </div>
    </section>
  );
};
