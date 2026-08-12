import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ClassLensResultsFuture: React.FC = () => {
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
    <div ref={containerRef} className="w-full max-w-[880px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* LEFT: Key Results */}
        <div className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold tracking-tight text-[#E8EEF5] font-mono uppercase">
            Key Results
          </h2>
          <ul className="space-y-2 font-sans text-xs sm:text-sm text-[#A7B5C7]/90 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-[#6DB8F5] shrink-0 font-bold">&bull;</span>
              <span>Automated 128-D facial classification &amp; speaker voice verification.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6DB8F5] shrink-0 font-bold">&bull;</span>
              <span>Double-pass roster verification preventing duplicate daily scans.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6DB8F5] shrink-0 font-bold">&bull;</span>
              <span>RAM model caching (<code className="text-[#6DB8F5] font-mono text-xs">@st.cache_resource</code>) and instant Supabase attendance logging.</span>
            </li>
          </ul>
        </div>

        {/* RIGHT: Future Scope */}
        <div className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold tracking-tight text-[#E8EEF5] font-mono uppercase">
            Future Scope
          </h2>
          <ul className="space-y-2 font-sans text-xs sm:text-sm text-[#A7B5C7]/90 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-[#6DB8F5] shrink-0 font-bold">&bull;</span>
              <span>Adaptive Euclidean distance thresholds for unknown face rejection.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6DB8F5] shrink-0 font-bold">&bull;</span>
              <span>Parallel video stream processing across multiple classroom cameras.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6DB8F5] shrink-0 font-bold">&bull;</span>
              <span>Anti-spoofing micro-expression checks against presentation attacks.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
