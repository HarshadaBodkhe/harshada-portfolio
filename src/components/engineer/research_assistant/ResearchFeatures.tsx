import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageSquare, FileText, Key, GitCompare, BookOpen } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FeatureItem {
  id: string;
  title: string;
  desc: string;
  icon: React.ElementType;
}

const FEATURES: FeatureItem[] = [
  {
    id: 'f1',
    title: 'Document Q&A',
    desc: 'Ask natural-language questions about uploaded PDFs and technical notes, receiving grounded answers with page-level citations.',
    icon: MessageSquare,
  },
  {
    id: 'f2',
    title: 'Automated Summarization',
    desc: 'Transform dense multi-page academic papers into concise executive summaries, abstract overviews, and section breakdowns.',
    icon: FileText,
  },
  {
    id: 'f3',
    title: 'Key Point Extraction',
    desc: 'Automatically extract research objectives, core methodology, empirical findings, limitations, and mathematical concepts.',
    icon: Key,
  },
  {
    id: 'f4',
    title: 'Multi-Document Comparison',
    desc: 'Cross-reference findings and methodologies across multiple uploaded research papers to highlight agreements and trade-offs.',
    icon: GitCompare,
  },
  {
    id: 'f5',
    title: 'Structured Study Material',
    desc: 'Generate structured revision notes, flashcards, key definition lists, and self-assessment questions directly from document text.',
    icon: BookOpen,
  },
];

export const ResearchFeatures: React.FC = () => {
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
    <div ref={containerRef} className="w-full max-w-[880px] mx-auto space-y-6">
      <div className="flex flex-col space-y-1 text-left">
        <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-[#6DB8F5] uppercase">
          SYSTEM CAPABILITIES &amp; FUNCTIONALITIES
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-[#E8EEF5]">
          Core Document Intelligence Features
        </h3>
        <p className="text-xs sm:text-sm text-[#A7B5C7]/80 font-sans">
          Integrated capabilities powered by Retrieval-Augmented Generation and prompt engineering.
        </p>
      </div>

      {/* Grid of 5 Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
        {FEATURES.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="group p-5 rounded-[12px] bg-[#060c18] border border-[#1B3047]/50 hover:border-[#6DB8F5]/50 transition-all duration-200 hover:-translate-y-0.5 space-y-2.5"
            >
              <div className="w-8 h-8 rounded-lg bg-[#081324] border border-[#1B3047] flex items-center justify-center text-[#6DB8F5] group-hover:scale-105 transition-transform">
                <Icon className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-[#E8EEF5]">
                {item.title}
              </h4>
              <p className="text-xs text-[#A7B5C7]/80 font-sans leading-relaxed">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
