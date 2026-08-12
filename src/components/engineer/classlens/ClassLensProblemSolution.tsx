import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ClassLensProblemSolution: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 20 },
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
      {/* 1. Engineering Challenges Section */}
      <div className="space-y-2.5 w-full">
        <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#E8EEF5]">
          Engineering Challenges
        </h2>
        <div className="space-y-2 font-sans text-sm text-[#A7B5C7]/90 leading-relaxed">
          <p>
            Manual roll-call attendance consumes lecture time and suffers from proxy attendance and fragmented spreadsheet logging. Technically, an automated biometric system must process real-time video frames, extract 128-dimensional facial embeddings, support voice verification, and enforce subject enrollment boundaries without retraining overhead.
          </p>
        </div>
      </div>

      {/* 2. Technical Approach Section */}
      <div className="space-y-2.5 w-full">
        <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#E8EEF5]">
          Technical Approach
        </h2>
        <div className="space-y-2 font-sans text-sm text-[#A7B5C7]/90 leading-relaxed">
          <p>
            Engineered as an intelligent multimodal system using a Streamlit interface linked directly to Python machine learning pipelines. The computer vision backend uses dlib facial landmark extraction and Linear SVMs for sub-second classification, backed by Supabase PostgreSQL for biometric embedding storage and real-time logs.
          </p>
        </div>
      </div>
    </div>
  );
};
