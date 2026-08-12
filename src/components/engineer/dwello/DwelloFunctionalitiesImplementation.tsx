import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FUNCTIONALITIES = [
  {
    name: 'Property Discovery & Filtering',
    desc: 'Real-time property search enabling guests to filter by location, category, and price parameters.',
  },
  {
    name: 'Listing & Asset Showcase',
    desc: 'Detailed view cards with amenity highlights, photo galleries, host info, and pricing rules.',
  },
  {
    name: 'Reservation Engine',
    desc: 'Date picker booking selection calculating stay totals and managing property availability state.',
  },
  {
    name: 'User Session & Account Management',
    desc: 'Authentication pipelines allowing property hosts to manage listings and guests to track bookings.',
  },
];

export const DwelloFunctionalitiesImplementation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
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
    <div ref={containerRef} className="w-full max-w-[880px] space-y-8">
      {/* 1. Core Functionalities */}
      <div className="space-y-3 max-w-[780px]">
        <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#E8EEF5]">
          Core Functionalities
        </h2>

        <div className="space-y-3 border-l border-[#1B3047]/60 pl-4">
          {FUNCTIONALITIES.map((func) => (
            <div key={func.name} className="space-y-0.5">
              <h4 className="font-mono text-xs sm:text-sm font-bold text-[#E8EEF5]">
                {func.name}
              </h4>
              <p className="font-sans text-xs sm:text-sm text-[#A7B5C7]/80 leading-relaxed">
                {func.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Technical Implementation */}
      <div className="space-y-3">
        <h3 className="text-base sm:text-lg font-bold tracking-tight text-[#E8EEF5]">
          Technical Implementation
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans text-xs sm:text-sm">
          <div className="space-y-1">
            <span className="font-mono text-xs font-bold text-[#6DB8F5] uppercase tracking-wider block">
              FRONTEND UI &amp; STATE
            </span>
            <p className="text-[#A7B5C7]/85 leading-relaxed">
              EJS templating and client JavaScript managing view state and search filters dynamically.
            </p>
          </div>

          <div className="space-y-1">
            <span className="font-mono text-xs font-bold text-[#6DB8F5] uppercase tracking-wider block">
              BACKEND REST API
            </span>
            <p className="text-[#A7B5C7]/85 leading-relaxed">
              Node.js and Express RESTful controllers handling request validation and routing.
            </p>
          </div>

          <div className="space-y-1">
            <span className="font-mono text-xs font-bold text-[#6DB8F5] uppercase tracking-wider block">
              DATABASE SCHEMA DESIGN
            </span>
            <p className="text-[#A7B5C7]/85 leading-relaxed">
              MongoDB document models via Mongoose schemas for listing metadata and reservations.
            </p>
          </div>

          <div className="space-y-1">
            <span className="font-mono text-xs font-bold text-[#6DB8F5] uppercase tracking-wider block">
              DEPLOYMENT &amp; HOSTING
            </span>
            <p className="text-[#A7B5C7]/85 leading-relaxed">
              Deployed on Render web services with automatic environment configuration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
