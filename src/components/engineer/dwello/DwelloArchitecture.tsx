import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Monitor, Server, Database } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const DwelloArchitecture: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        nodeRefs.current,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
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
    <div ref={containerRef} className="w-full max-w-2xl">
      <div className="mb-3">
        <span className="font-mono text-xs font-semibold tracking-[0.2em] text-[#6DB8F5] uppercase">
          SYSTEM ARCHITECTURE
        </span>
      </div>

      <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#E8EEF5] mb-6">
        Decoupled 3-Tier Data Pipeline
      </h2>

      {/* Unboxed Technical Diagram directly on page background */}
      <div className="flex flex-col items-start gap-4 font-mono text-xs">
        {/* Tier 1: Frontend */}
        <div
          ref={(el) => {
            nodeRefs.current[0] = el;
          }}
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-[#060c18] border border-[#1B3047]/60"
        >
          <Monitor className="w-4 h-4 text-[#6DB8F5]" />
          <div>
            <div className="font-bold text-[#E8EEF5]">FRONTEND CLIENT</div>
            <div className="text-[10px] text-[#A7B5C7]/70 font-sans">
              EJS Dynamic Templates &bull; Client JS Interactivity
            </div>
          </div>
        </div>

        {/* Thin Vector Vertical Line 1 */}
        <div className="w-0.5 h-6 bg-[#6DB8F5]/40 ml-6" />

        {/* Tier 2: API */}
        <div
          ref={(el) => {
            nodeRefs.current[1] = el;
          }}
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-[#060c18] border border-[#1B3047]/60"
        >
          <Server className="w-4 h-4 text-[#6DB8F5]" />
          <div>
            <div className="font-bold text-[#E8EEF5]">REST API / EXPRESS</div>
            <div className="text-[10px] text-[#A7B5C7]/70 font-sans">
              Node.js Backend Services &bull; Property &amp; Booking Endpoints
            </div>
          </div>
        </div>

        {/* Thin Vector Vertical Line 2 */}
        <div className="w-0.5 h-6 bg-[#6DB8F5]/40 ml-6" />

        {/* Tier 3: Database */}
        <div
          ref={(el) => {
            nodeRefs.current[2] = el;
          }}
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-[#060c18] border border-[#1B3047]/60"
        >
          <Database className="w-4 h-4 text-[#6DB8F5]" />
          <div>
            <div className="font-bold text-[#E8EEF5]">MONGODB DATABASE</div>
            <div className="text-[10px] text-[#A7B5C7]/70 font-sans">
              Property Listings &bull; User Accounts &bull; Bookings
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
