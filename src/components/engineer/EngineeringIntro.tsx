import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Cpu, GitBranch, Layers, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const EngineeringIntro: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const transitionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      // 1. Eyebrow entrance
      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      );

      // 2. Heading reveal
      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 25, filter: 'blur(6px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out' },
        '-=0.4'
      );

      // 3. Supporting text reveal
      tl.fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' },
        '-=0.6'
      );

      // 4. Bottom transition indicator reveal
      tl.fromTo(
        transitionRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.4'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="engineering-intro"
      ref={sectionRef}
      className="relative w-full py-16 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-10 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Eyebrow */}
        <div ref={eyebrowRef} className="mb-3">
          <p className="text-[11px] sm:text-xs font-mono font-medium tracking-[0.25em] text-[#6DB8F5] uppercase">
            ENGINEERING WORKSPACE
          </p>
        </div>

        {/* Main Heading */}
        <div className="mb-6">
          <h2
            ref={headingRef}
            className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#E8EEF5] leading-[1.08]"
          >
            HOW I <span className="text-[#6DB8F5] font-normal">BUILD</span>
          </h2>
        </div>

        {/* Supporting Copy */}
        <div ref={textRef} className="space-y-6 text-base sm:text-lg max-w-2xl font-sans text-center">
          <p className="text-[#E8EEF5]/90 font-medium leading-relaxed">
            I build intelligent applications by combining software engineering, AI, and practical problem solving.
          </p>
          <p className="text-sm sm:text-base text-[#A7B5C7]/80 leading-relaxed">
            While resumes highlight outcomes, this workspace explores the engineering behind my projects—examining system architecture, technical decisions, implementation details, and trade-offs.
          </p>

          {/* Engineering Pillars Micro Grid */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-[#1B3047]/60 max-w-xl mx-auto">
            <div className="flex items-center justify-center gap-2">
              <Layers className="w-4 h-4 text-[#6DB8F5]" />
              <span className="font-mono text-xs text-[#A7B5C7]">Architecture</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <GitBranch className="w-4 h-4 text-[#6DB8F5]" />
              <span className="font-mono text-xs text-[#A7B5C7]">Workflows</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Cpu className="w-4 h-4 text-[#6DB8F5]" />
              <span className="font-mono text-xs text-[#A7B5C7]">AI Engine</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#6DB8F5]" />
              <span className="font-mono text-xs text-[#A7B5C7]">Decisions</span>
            </div>
          </div>
        </div>

        {/* Scroll Transition Toward Projects */}
        <div
          ref={transitionRef}
          className="mt-16 sm:mt-24 w-full flex flex-col items-center justify-center text-center space-y-2 pt-10"
        >
          <span className="font-mono text-sm sm:text-base font-bold tracking-[0.25em] text-[#E8EEF5] uppercase">
            PROJECTS
          </span>
          <p className="text-xs text-[#A7B5C7]/70 font-mono tracking-wide">
            Technical breakdowns &bull; System design &bull; Architecture
          </p>
          <ChevronDown className="w-4 h-4 text-[#6DB8F5] animate-bounce mt-1 opacity-80" />
        </div>
      </div>
    </section>
  );
};
