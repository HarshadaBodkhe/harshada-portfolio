import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const AtmosphericBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef1 = useRef<HTMLDivElement>(null);
  const glowRef2 = useRef<HTMLDivElement>(null);
  const svgLinesRef = useRef<SVGSVGElement>(null);
  const path1Ref = useRef<SVGPathElement>(null);
  const path2Ref = useRef<SVGPathElement>(null);
  const path3Ref = useRef<SVGPathElement>(null);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isReduced) {
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Continuous streaming motion for existing SVG connection paths
      gsap.to(path1Ref.current, {
        strokeDashoffset: -1200,
        duration: 25,
        repeat: -1,
        ease: 'none',
      });

      gsap.to(path2Ref.current, {
        strokeDashoffset: 1200,
        duration: 30,
        repeat: -1,
        ease: 'none',
      });

      gsap.to(path3Ref.current, {
        strokeDashoffset: -1000,
        duration: 22,
        repeat: -1,
        ease: 'none',
      });

      // Subtle breathing motion for line height
      gsap.to(path2Ref.current, {
        y: 20,
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // 2. Continuous floating drift & scale motion for existing atmospheric glow blobs
      gsap.to(glowRef1.current, {
        x: '70px',
        y: '50px',
        scale: 1.15,
        opacity: 0.14,
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to(glowRef2.current, {
        x: '-60px',
        y: '-40px',
        scale: 1.12,
        opacity: 0.12,
        duration: 15,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 2,
      });

      // 3. Scroll-linked motion (Background elements shift smoothly with page scroll)
      gsap.to([glowRef1.current, glowRef2.current], {
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
        },
        y: '-=120px',
        ease: 'none',
      });

      gsap.to(svgLinesRef.current, {
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 2,
        },
        y: '-=80px',
        ease: 'none',
      });

      // 4. Desktop Mouse Parallax (smooth response to cursor)
      const handleMouseMove = (e: MouseEvent) => {
        if (window.innerWidth < 1024) return;
        const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;

        gsap.to([glowRef1.current, glowRef2.current], {
          x: `+=${mouseX * 10}`,
          y: `+=${mouseY * 10}`,
          duration: 1.6,
          ease: 'power1.out',
          overwrite: 'auto',
        });

        gsap.to(svgLinesRef.current, {
          x: mouseX * 6,
          y: mouseY * 6,
          duration: 2.0,
          ease: 'power1.out',
          overwrite: 'auto',
        });
      };

      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[var(--bg-dark)] transition-colors duration-300"
    >
      {/* Dark/Light Radial Base Vignette */}
      <div className="absolute inset-0 bg-radial-vignette opacity-95 transition-all duration-300" />

      {/* Subtle Grain Dot Pattern */}
      <div
        className="absolute inset-0 opacity-[var(--dot-opacity)] transition-opacity duration-300"
        style={{
          backgroundImage: `radial-gradient(var(--text-primary) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Atmospheric Breathing Light-Blue Glow Blobs */}
      <div
        ref={glowRef1}
        className="absolute top-[15%] left-[10%] w-[550px] h-[550px] sm:w-[700px] sm:h-[700px] rounded-full blur-[160px] opacity-[0.09] bg-[var(--accent)] will-change-transform transition-colors duration-300"
      />
      <div
        ref={glowRef2}
        className="absolute top-[25%] right-[10%] w-[650px] h-[650px] sm:w-[750px] sm:h-[750px] rounded-full blur-[180px] opacity-[0.08] bg-[var(--accent)] will-change-transform transition-colors duration-300"
      />

      {/* Flowing Curved Connection Lines (SVG) */}
      <svg
        ref={svgLinesRef}
        className="absolute inset-0 w-full h-full opacity-35 will-change-transform"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1440 900"
      >
        {/* Curved Path 1 */}
        <path
          ref={path1Ref}
          d="M -100 200 C 350 120, 650 380, 1100 220 C 1300 150, 1500 280, 1600 240"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.2"
          strokeDasharray="20 40 180 60"
          opacity="0.25"
        />

        {/* Curved Path 2 */}
        <path
          ref={path2Ref}
          d="M -50 450 C 400 320, 700 580, 1150 400 C 1350 320, 1550 450, 1650 420"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeDasharray="30 50 220 80"
          opacity="0.3"
        />

        {/* Curved Path 3 */}
        <path
          ref={path3Ref}
          d="M -150 700 C 300 550, 600 780, 1050 620 C 1280 540, 1480 680, 1600 640"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1"
          strokeDasharray="15 35 150 50"
          opacity="0.2"
        />
      </svg>
    </div>
  );
};

export const AtmosphericTechnicalBackground = AtmosphericBackground;
