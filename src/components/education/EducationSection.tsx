import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BE_EDUCATION_DATA, SECONDARY_EDUCATION_DATA } from './educationData';
import { InstitutionLogo } from './InstitutionLogo';

gsap.registerPlugin(ScrollTrigger);

export const EducationSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const hscRef = useRef<HTMLDivElement>(null);
  const sscRef = useRef<HTMLDivElement>(null);

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

      // 2. Heading & Introduction reveal
      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 20, filter: 'blur(4px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, ease: 'power3.out' },
        '-=0.3'
      );

      // 3. Left Column (Current Education) progressive reveal
      if (leftColRef.current) {
        tl.fromTo(
          leftColRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.3'
        );
      }

      // 4. Right Column 12th entry reveal
      if (hscRef.current) {
        tl.fromTo(
          hscRef.current,
          { opacity: 0, y: 20, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' },
          '-=0.5'
        );
      }

      // 5. Right Column 10th entry reveal
      if (sscRef.current) {
        tl.fromTo(
          sscRef.current,
          { opacity: 0, y: 20, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' },
          '-=0.4'
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative w-full py-28 sm:py-36 px-4 sm:px-8 lg:px-10 flex flex-col items-center justify-center z-10 overflow-hidden"
    >
      {/* Screen Reader Accessibility */}
      <div className="sr-only">
        <h2>Academic Journey</h2>
        <p>
          Combining a strong foundation in engineering with a focused path in Artificial Intelligence and Data Science.
        </p>
        <article>
          <h3>{BE_EDUCATION_DATA.degree}</h3>
          <p>{BE_EDUCATION_DATA.institute}, {BE_EDUCATION_DATA.location}</p>
          <p>Duration: {BE_EDUCATION_DATA.duration} | CGPA: {BE_EDUCATION_DATA.cgpa}</p>
          <p>{BE_EDUCATION_DATA.description}</p>
          <p>{BE_EDUCATION_DATA.universityAffiliation.label} {BE_EDUCATION_DATA.universityAffiliation.name}</p>
        </article>
        <ul>
          {SECONDARY_EDUCATION_DATA.map((entry) => (
            <li key={entry.id}>
              {entry.title} - {entry.institution ? `${entry.institution} | ` : ''}{entry.qualification} | {entry.board} ({entry.divisionalBoard}) | {entry.passingYear} - {entry.resultScore} ({entry.resultStatus})
            </li>
          ))}
        </ul>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl w-full mx-auto flex flex-col items-center text-center">
        {/* Eyebrow Label - Updated to avoid repetition */}
        <div ref={eyebrowRef} className="flex items-center gap-3 mb-4 justify-center">
          <span className="text-xs font-mono font-medium tracking-[0.25em] text-[#6DB8F5] uppercase">
            EDUCATION &amp; QUALIFICATIONS
          </span>
          <div
            ref={lineRef}
            className="h-[1px] bg-[#6DB8F5]/60 rounded-full will-change-[width]"
          />
        </div>

        {/* Section Heading & Introduction */}
        <div ref={headingRef} className="max-w-2xl text-center mb-16 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold tracking-tight text-[#E8EEF5] mb-4 uppercase">
            ACADEMIC JOURNEY
          </h2>
          <p className="text-base sm:text-lg font-normal text-[#E8EEF5]/80 leading-relaxed font-sans">
            Combining a strong foundation in engineering with a focused path in Artificial Intelligence and Data Science.
          </p>
        </div>

        {/* TWO-COLUMN EDITORIAL COMPOSITION (55% LEFT / 45% RIGHT) */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 lg:gap-20 items-start text-left">
          
          {/* LEFT COLUMN: CURRENT / HIGHER EDUCATION (PRIMARY FOCUS ~55%) */}
          <div
            ref={leftColRef}
            className="lg:col-span-7 flex flex-col items-start text-left w-full"
          >
            {/* DYP Institute Logo */}
            <div className="group mb-6">
              <InstitutionLogo
                src={BE_EDUCATION_DATA.logoPath}
                alt={BE_EDUCATION_DATA.institute}
                size={64}
                height={64}
                variant="primary"
              />
            </div>

            {/* Degree Title */}
            <h3 className="text-lg sm:text-xl font-mono font-bold tracking-tight text-[#E8EEF5] mb-1.5 leading-snug">
              {BE_EDUCATION_DATA.degree}
            </h3>

            {/* Institute Name */}
            <p className="text-sm sm:text-base font-medium text-[#E8EEF5]/90 mb-1 max-w-xl">
              {BE_EDUCATION_DATA.institute}
            </p>

            {/* Location */}
            <p className="text-xs font-mono text-[#64748B] mb-3">
              {BE_EDUCATION_DATA.location}
            </p>

            {/* Duration & CGPA - Clean Editorial Text */}
            <p className="text-xs sm:text-sm font-mono text-[#6DB8F5] font-semibold mb-6">
              {BE_EDUCATION_DATA.duration}
              <span className="text-[#64748B] mx-2.5">&bull;</span>
              <span>CGPA {BE_EDUCATION_DATA.cgpa}</span>
            </p>

            {/* Editorial Description */}
            <p className="text-sm sm:text-base text-[#E8EEF5]/80 leading-relaxed max-w-xl font-sans mb-8">
              {BE_EDUCATION_DATA.description}
            </p>

            {/* SPPU Affiliation */}
            <div className="flex items-center gap-3.5 pt-6 border-t border-[#1B3047]/60 w-full max-w-xl group">
              <InstitutionLogo
                src={BE_EDUCATION_DATA.universityAffiliation.logoPath}
                alt={BE_EDUCATION_DATA.universityAffiliation.name}
                size={38}
                height={38}
                variant="secondary"
              />
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-mono font-semibold tracking-wider text-[#64748B] uppercase">
                  {BE_EDUCATION_DATA.universityAffiliation.label}
                </span>
                <span className="text-xs sm:text-sm font-mono font-medium text-[#E8EEF5]/85 group-hover:text-[#6DB8F5] transition-colors duration-300">
                  {BE_EDUCATION_DATA.universityAffiliation.name}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: ACADEMIC FOUNDATION (12th & 10th ~45%) */}
          <div
            ref={rightColRef}
            className="lg:col-span-5 flex flex-col items-start text-left w-full space-y-12 relative pt-2 lg:pt-0"
          >
            {/* Subtle Vertical Connecting Line */}
            <div className="absolute left-[29px] top-14 bottom-14 w-[1px] bg-gradient-to-b from-[#6DB8F5]/30 via-[#6DB8F5]/15 to-transparent pointer-events-none" />

            {/* 12TH ENTRY (TOP) */}
            <div ref={hscRef} className="group relative flex flex-col items-start text-left w-full z-10">
              {/* Junior College Emblem Icon */}
              <div className="mb-3.5">
                <InstitutionLogo
                  src={SECONDARY_EDUCATION_DATA[0].logoPath}
                  alt={SECONDARY_EDUCATION_DATA[0].institution || SECONDARY_EDUCATION_DATA[0].board}
                  size={60}
                  height={60}
                  variant="board"
                />
              </div>
              {/* Education Title */}
              <h4 className="text-base sm:text-lg font-mono font-bold text-[#E8EEF5] leading-tight">
                {SECONDARY_EDUCATION_DATA[0].title}
              </h4>
              {/* Junior College Name */}
              {SECONDARY_EDUCATION_DATA[0].institution && (
                <p className="text-xs sm:text-sm font-mono font-semibold text-[#6DB8F5] mt-1">
                  {SECONDARY_EDUCATION_DATA[0].institution}
                </p>
              )}
              {/* Qualification / Stream */}
              <p className="text-xs font-mono text-[#E8EEF5]/85 mt-0.5 font-medium">
                {SECONDARY_EDUCATION_DATA[0].qualification}
              </p>
              {/* Board Name */}
              <p className="text-[11px] font-mono text-[#64748B] mt-0.5 max-w-sm">
                {SECONDARY_EDUCATION_DATA[0].board} ({SECONDARY_EDUCATION_DATA[0].divisionalBoard})
              </p>
              {/* Year & Score Result - Clean Editorial Text */}
              <p className="text-xs font-mono text-[#6DB8F5] mt-2 font-medium">
                {SECONDARY_EDUCATION_DATA[0].resultScore}
                <span className="text-[#64748B] mx-2">&bull;</span>
                <span className="text-[#A7B5C7]">{SECONDARY_EDUCATION_DATA[0].passingYear}</span>
              </p>
            </div>

            {/* 10TH ENTRY (BOTTOM) */}
            <div ref={sscRef} className="group relative flex flex-col items-start text-left w-full z-10">
              {/* Board Seal Logo */}
              <div className="mb-3.5">
                <InstitutionLogo
                  src={SECONDARY_EDUCATION_DATA[1].logoPath}
                  alt={SECONDARY_EDUCATION_DATA[1].institution || SECONDARY_EDUCATION_DATA[1].board}
                  size={60}
                  height={60}
                  variant="board"
                />
              </div>
              {/* Education Title */}
              <h4 className="text-base sm:text-lg font-mono font-bold text-[#E8EEF5] leading-tight">
                {SECONDARY_EDUCATION_DATA[1].title}
              </h4>
              {/* School Name */}
              {SECONDARY_EDUCATION_DATA[1].institution && (
                <p className="text-xs sm:text-sm font-mono font-semibold text-[#6DB8F5] mt-1">
                  {SECONDARY_EDUCATION_DATA[1].institution}
                </p>
              )}
              {/* Qualification */}
              <p className="text-xs font-mono text-[#E8EEF5]/85 mt-0.5 font-medium">
                {SECONDARY_EDUCATION_DATA[1].qualification}
              </p>
              {/* Board Name */}
              <p className="text-[11px] font-mono text-[#64748B] mt-0.5 max-w-sm">
                {SECONDARY_EDUCATION_DATA[1].board} ({SECONDARY_EDUCATION_DATA[1].divisionalBoard})
              </p>
              {/* Year & Score Result - Clean Editorial Text */}
              <p className="text-xs font-mono text-[#6DB8F5] mt-2 font-medium">
                {SECONDARY_EDUCATION_DATA[1].resultScore}
                <span className="text-[#64748B] mx-2">&bull;</span>
                <span className="text-[#A7B5C7]">{SECONDARY_EDUCATION_DATA[1].passingYear}</span>
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
