import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CONTACT_CONFIG } from './contactData';

gsap.registerPlugin(ScrollTrigger);

export const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const iconsContainerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const isReducedMotion = useRef(false);

  // Phone URL handler (uses tel: if phoneNumber is present)
  const phoneHref = CONTACT_CONFIG.phoneNumber
    ? `tel:${CONTACT_CONFIG.phoneNumber}`
    : 'tel:';

  useEffect(() => {
    isReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isReducedMotion.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      // 1. Radial glow fade in
      if (glowRef.current) {
        tl.fromTo(
          glowRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' }
        );
      }

      // 2. Eyebrow & line reveal
      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        '-=1.0'
      );

      tl.fromTo(
        lineRef.current,
        { width: 0, opacity: 0 },
        { width: 36, opacity: 1, duration: 0.5, ease: 'power2.out' },
        '-=0.3'
      );

      // 3. Heading reveal
      if (headingRef.current) {
        tl.fromTo(
          headingRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          '-=0.3'
        );
      }

      // 4. Supporting text reveal
      if (descRef.current) {
        tl.fromTo(
          descRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
          '-=0.3'
        );
      }

      // 5. Staggered reveal for 4 Contact Icons (GitHub -> LinkedIn -> Email -> Phone)
      if (iconsContainerRef.current) {
        const iconButtons = iconsContainerRef.current.querySelectorAll('.contact-logo-btn');
        tl.fromTo(
          iconButtons,
          { opacity: 0, scale: 0.9, y: 10 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power3.out',
          },
          '-=0.2'
        );
      }

      // 6. Footer fade in
      if (footerRef.current) {
        tl.fromTo(
          footerRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: 'power2.out' },
          '-=0.2'
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full py-28 sm:py-36 px-4 sm:px-8 flex flex-col items-center justify-center z-10 overflow-hidden text-center"
    >
      {/* Subtle Atmospheric Radial Accent Glow */}
      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] sm:w-[700px] sm:h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(109,184,245,0.07)_0%,rgba(2,7,17,0)_70%)] pointer-events-none rounded-full blur-2xl"
      />

      {/* Screen Reader Accessibility */}
      <div className="sr-only">
        <h2>{CONTACT_CONFIG.heading}</h2>
        <p>{CONTACT_CONFIG.description}</p>
        <ul>
          <li>GitHub: {CONTACT_CONFIG.githubUrl}</li>
          <li>LinkedIn: {CONTACT_CONFIG.linkedinUrl}</li>
          <li>Email: {CONTACT_CONFIG.emailAddress}</li>
          <li>Phone: {CONTACT_CONFIG.phoneNumber || 'Available upon request'}</li>
        </ul>
      </div>

      <div className="max-w-2xl w-full mx-auto flex flex-col items-center z-10">
        {/* Eyebrow Label with Accent Line */}
        <div ref={eyebrowRef} className="flex items-center gap-3 mb-4 justify-center">
          <span className="text-xs font-mono font-medium tracking-[0.25em] text-[#6DB8F5] uppercase">
            {CONTACT_CONFIG.eyebrow}
          </span>
          <div
            ref={lineRef}
            className="h-[1px] bg-[#6DB8F5]/60 rounded-full will-change-[width]"
          />
        </div>

        {/* Main Section Heading */}
        <h2
          ref={headingRef}
          className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold tracking-tight text-[#E8EEF5] mb-5 uppercase leading-tight"
        >
          {CONTACT_CONFIG.heading}
        </h2>

        {/* Short Personal Message */}
        <p
          ref={descRef}
          className="text-base sm:text-lg font-normal text-[#E8EEF5]/80 leading-relaxed font-sans max-w-xl mb-12 whitespace-pre-line"
        >
          {CONTACT_CONFIG.description}
        </p>

        {/* 4 CONTACT LOGO BUTTONS IN ORDER: GITHUB -> LINKEDIN -> EMAIL -> PHONE */}
        <div
          ref={iconsContainerRef}
          className="flex flex-row items-center justify-center gap-4 sm:gap-7 mb-16"
        >
          {/* 1. GITHUB LOGO BUTTON */}
          <a
            href={CONTACT_CONFIG.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            title="GitHub"
            className="contact-logo-btn group relative flex items-center justify-center w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-[#0A1628] border border-[#6DB8F5]/30 text-[#E8EEF5] shadow-[0_0_15px_rgba(109,184,245,0.08)] hover:border-[#6DB8F5]/70 hover:shadow-[0_0_24px_rgba(109,184,245,0.3)] hover:-translate-y-0.5 hover:scale-[1.08] hover:brightness-125 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-[#6DB8F5]"
          >
            <svg
              className="w-7 h-7 sm:w-8 sm:h-8 fill-current text-[#E8EEF5] group-hover:text-[#6DB8F5] transition-colors duration-300"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
          </a>

          {/* 2. LINKEDIN LOGO BUTTON */}
          <a
            href={CONTACT_CONFIG.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
            className="contact-logo-btn group relative flex items-center justify-center w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-[#0A1628] border border-[#6DB8F5]/30 text-[#E8EEF5] shadow-[0_0_15px_rgba(109,184,245,0.08)] hover:border-[#6DB8F5]/70 hover:shadow-[0_0_24px_rgba(109,184,245,0.3)] hover:-translate-y-0.5 hover:scale-[1.08] hover:brightness-125 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-[#6DB8F5]"
          >
            <svg
              className="w-6.5 h-6.5 sm:w-7.5 sm:h-7.5 fill-current text-[#E8EEF5] group-hover:text-[#6DB8F5] transition-colors duration-300"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
            </svg>
          </a>

          {/* 3. EMAIL LOGO BUTTON */}
          <a
            href={`mailto:${CONTACT_CONFIG.emailAddress}`}
            aria-label="Email"
            title="Email"
            className="contact-logo-btn group relative flex items-center justify-center w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-[#0A1628] border border-[#6DB8F5]/30 text-[#E8EEF5] shadow-[0_0_15px_rgba(109,184,245,0.08)] hover:border-[#6DB8F5]/70 hover:shadow-[0_0_24px_rgba(109,184,245,0.3)] hover:-translate-y-0.5 hover:scale-[1.08] hover:brightness-125 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-[#6DB8F5]"
          >
            <svg
              className="w-6.5 h-6.5 sm:w-7.5 sm:h-7.5 stroke-current text-[#E8EEF5] group-hover:text-[#6DB8F5] transition-colors duration-300 fill-none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="2" y="4" width="20" height="16" rx="3" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </a>

          {/* 4. PHONE / MOBILE LOGO BUTTON */}
          <a
            href={phoneHref}
            aria-label="Phone"
            title="Phone"
            className="contact-logo-btn group relative flex items-center justify-center w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-[#0A1628] border border-[#6DB8F5]/30 text-[#E8EEF5] shadow-[0_0_15px_rgba(109,184,245,0.08)] hover:border-[#6DB8F5]/70 hover:shadow-[0_0_24px_rgba(109,184,245,0.3)] hover:-translate-y-0.5 hover:scale-[1.08] hover:brightness-125 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-[#6DB8F5]"
          >
            <svg
              className="w-6.5 h-6.5 sm:w-7.5 sm:h-7.5 stroke-current text-[#E8EEF5] group-hover:text-[#6DB8F5] transition-colors duration-300 fill-none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </a>
        </div>

        {/* FINAL SUBTLE FOOTER LINE */}
        <div ref={footerRef} className="pt-8 border-t border-[#1B3047]/40 w-full text-center">
          <p className="text-xs font-mono text-[#64748B] tracking-wider">
            {CONTACT_CONFIG.copyright}
          </p>
        </div>
      </div>
    </section>
  );
};
