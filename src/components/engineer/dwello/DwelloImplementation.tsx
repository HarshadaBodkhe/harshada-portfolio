import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const DwelloImplementation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const colRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        colRefs.current,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full max-w-3xl">
      <div className="mb-3">
        <span className="font-mono text-xs font-semibold tracking-[0.2em] text-[#6DB8F5] uppercase">
          TECHNICAL IMPLEMENTATION
        </span>
      </div>

      <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#E8EEF5] mb-6">
        Engineering &amp; Code Structure
      </h2>

      {/* Unboxed 2-Column Editorial Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 font-sans text-xs sm:text-sm">
        {/* Left Column: Frontend */}
        <div
          ref={(el) => {
            colRefs.current[0] = el;
          }}
          className="space-y-2"
        >
          <span className="font-mono text-xs font-bold text-[#E8EEF5] uppercase tracking-wider block">
            FRONTEND UI &amp; STATE
          </span>
          <p className="text-[#A7B5C7]/85 leading-relaxed">
            Built with EJS server-side templating and client-side JavaScript, managing view state and dynamic search filters for fast rendering.
          </p>
        </div>

        {/* Right Column: Backend */}
        <div
          ref={(el) => {
            colRefs.current[1] = el;
          }}
          className="space-y-2"
        >
          <span className="font-mono text-xs font-bold text-[#E8EEF5] uppercase tracking-wider block">
            BACKEND REST API
          </span>
          <p className="text-[#A7B5C7]/85 leading-relaxed">
            Structured with Node.js and Express RESTful controllers, handling HTTP request validation, route handling, and error middleware.
          </p>
        </div>

        {/* Bottom Left: Database */}
        <div
          ref={(el) => {
            colRefs.current[2] = el;
          }}
          className="space-y-2"
        >
          <span className="font-mono text-xs font-bold text-[#E8EEF5] uppercase tracking-wider block">
            DATABASE SCHEMA DESIGN
          </span>
          <p className="text-[#A7B5C7]/85 leading-relaxed">
            Leveraged MongoDB document models via Mongoose schemas to store flexible property listing metadata, pricing structures, and booking documents.
          </p>
        </div>

        {/* Bottom Right: Deployment */}
        <div
          ref={(el) => {
            colRefs.current[3] = el;
          }}
          className="space-y-2"
        >
          <span className="font-mono text-xs font-bold text-[#E8EEF5] uppercase tracking-wider block">
            DEPLOYMENT &amp; HOSTING
          </span>
          <p className="text-[#A7B5C7]/85 leading-relaxed">
            Deployed on Render web services with automatic builds and environment configuration for reliable full-stack hosting.
          </p>
        </div>
      </div>
    </div>
  );
};
