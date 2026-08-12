import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ExternalLink, Calendar, Layers, ArrowDown } from 'lucide-react';

export const PortfolioHeader: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);

  const mainImagePath = '/projects/harshada-portfolio.png';

  useEffect(() => {
    if (imgRef.current?.complete) {
      setImageLoaded(true);
    }
  }, []);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      tl.fromTo(
        imageWrapperRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      );

      tl.fromTo(
        contentRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.6'
      );

      if (contentRef.current) {
        const badge = contentRef.current.querySelector('.num-badge');
        if (badge) {
          gsap.fromTo(
            badge,
            { scale: 0.3, opacity: 0, rotate: -25 },
            {
              scale: 1,
              opacity: 1,
              rotate: 0,
              duration: 0.75,
              ease: 'back.out(2)',
              delay: 0.2,
              onComplete: () => {
                gsap.to(badge, {
                  y: -6,
                  duration: 2,
                  repeat: -1,
                  yoyo: true,
                  ease: 'sine.inOut',
                });
              },
            }
          );
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleScrollToArchitecture = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById('portfolio-architecture');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div ref={containerRef} className="w-full max-w-[880px] mx-auto mb-10 sm:mb-12">
      {/* HEADER GRID: CONTENT LEFT (7 cols) with FAR-LEFT NUMBER BADGE | IMAGE RIGHT (5 cols) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* LEFT COLUMN: Project Information (7 Cols) */}
        <div ref={contentRef} className="md:col-span-7 flex flex-col justify-center text-left space-y-2.5">
          {/* Title & Subtitle with Far-Left Circular Number Badge (matching other projects) */}
          <div className="group/num flex items-center gap-4 sm:gap-6 sm:-ml-20 mb-1">
            <div className="num-badge relative w-12 h-12 sm:w-15 sm:h-15 rounded-full border-2 border-[#6DB8F5]/40 bg-[#060c18] flex items-center justify-center font-mono text-base sm:text-xl font-extrabold text-[#6DB8F5] shrink-0 shadow-lg shadow-[#6DB8F5]/10 transition-all duration-300 ease-out">
              <span className="absolute -inset-1 rounded-full border border-[#6DB8F5]/30 animate-ping opacity-25 pointer-events-none" />
              03
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#E8EEF5] leading-none mb-1">
                Personal Portfolio
              </h1>
              <p className="font-mono text-xs sm:text-sm text-[#6DB8F5] font-medium">
                Interactive Full-Stack Portfolio &amp; Engineering Showcase
              </p>
            </div>
          </div>

          {/* Short Overview */}
          <p className="font-sans text-xs sm:text-sm text-[#A7B5C7]/90 leading-relaxed">
            A modern interactive portfolio built to present technical projects, engineering work, and AI-focused development through dedicated recruiter and engineer experiences.
          </p>

          {/* Explore Cue Link */}
          <div>
            <a
              href="#portfolio-architecture"
              onClick={handleScrollToArchitecture}
              className="group inline-flex items-center gap-1.5 text-xs font-mono text-[#6DB8F5] hover:text-[#E8EEF5] transition-colors focus:outline-none focus:ring-1 focus:ring-[#6DB8F5]"
            >
              <span>Explore how it works</span>
              <ArrowDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-y-0.5" />
            </a>
          </div>

          {/* Timeline & Metadata */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-mono border-t border-[#1B3047]/40 pt-3">
            {/* Timeline */}
            <div className="flex flex-col space-y-0.5">
              <span className="text-[10px] font-semibold text-[#6DB8F5] uppercase tracking-wider">
                TIMELINE
              </span>
              <div className="flex items-center gap-1.5 text-[#E8EEF5] text-xs font-sans font-medium">
                <Calendar className="w-3.5 h-3.5 text-[#6DB8F5]" />
                <span>Feb 2026</span>
              </div>
            </div>

            <span className="hidden sm:inline text-[#1B3047] font-normal">&bull;</span>

            {/* Role */}
            <div className="flex flex-col space-y-0.5">
              <span className="text-[10px] font-semibold text-[#6DB8F5] uppercase tracking-wider">
                ROLE
              </span>
              <div className="flex items-center gap-1.5 text-[#A7B5C7] text-xs font-sans">
                <Layers className="w-3.5 h-3.5 text-[#6DB8F5]" />
                <span>Full Stack / UI</span>
              </div>
            </div>

            <span className="hidden sm:inline text-[#1B3047] font-normal">&bull;</span>

            {/* Source GitHub */}
            <div className="flex flex-col space-y-0.5">
              <span className="text-[10px] font-semibold text-[#6DB8F5] uppercase tracking-wider">
                SOURCE
              </span>
              <a
                href="https://github.com/HarshadaBodkhe/harshada-portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#6DB8F5] hover:text-[#E8EEF5] text-xs font-semibold transition-colors focus:outline-none focus:underline"
              >
                <span>GitHub Repository</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Static Main Project Image (5 Cols, No Motion) */}
        <div className="md:col-span-5 w-full flex justify-center md:justify-end">
          <div
            ref={imageWrapperRef}
            tabIndex={0}
            className="relative w-full max-w-[360px] aspect-[16/9] rounded-[12px] overflow-hidden bg-[#060c18] border border-[#1B3047]/60 shadow-md focus:outline-none focus:ring-2 focus:ring-[#6DB8F5]/60"
          >
            {!imageError ? (
              <img
                ref={imgRef}
                src={mainImagePath}
                alt="Personal Portfolio Platform"
                className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-90'
                  }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-[#050b16]">
                <div className="w-10 h-10 rounded-lg bg-[#0D1F34] flex items-center justify-center mb-1.5 shadow-md">
                  <span className="font-mono text-sm font-bold text-[#6DB8F5]">HP</span>
                </div>
                <span className="font-mono text-xs font-semibold text-[#6DB8F5] tracking-wider uppercase">
                  PORTFOLIO PREVIEW
                </span>
                <span className="font-mono text-[10px] text-[#A7B5C7]/60 mt-1">
                  public/projects/harshada-portfolio.png
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
