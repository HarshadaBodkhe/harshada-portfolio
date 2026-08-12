import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ExternalLink, Calendar, Layers, ArrowDown, FileText, Bot, CheckCircle2 } from 'lucide-react';

export const ResearchHeader: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);

  const mainImagePath = '/projects/ai-research-assistant.png';

  useEffect(() => {
    if (imgRef.current?.complete) {
      setImageLoaded(true);
    }
  }, []);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      tl.fromTo(
        imageWrapperRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      );

      tl.fromTo(
        contentRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.6'
      );

      if (contentRef.current) {
        const badge = contentRef.current.querySelector('.num-badge');
        if (badge) {
          gsap.fromTo(
            badge,
            { scale: 0.3, opacity: 0, rotate: -25 },
            {
              scale: 1,
              opacity: 1,
              rotate: 0,
              duration: 0.75,
              ease: 'back.out(2)',
              delay: 0.2,
              onComplete: () => {
                gsap.to(badge, {
                  y: -6,
                  duration: 2,
                  repeat: -1,
                  yoyo: true,
                  ease: 'sine.inOut',
                });
              },
            }
          );
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleScrollToArchitecture = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById('research-architecture');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div ref={containerRef} className="w-full max-w-[880px] mx-auto mb-10 sm:mb-12">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* LEFT COLUMN: Project Information (7 Cols) */}
        <div ref={contentRef} className="md:col-span-7 flex flex-col justify-center text-left space-y-2.5">
          {/* Title & Subtitle with Far-Left Circular Number Badge */}
          <div className="group/num flex items-center gap-4 sm:gap-6 sm:-ml-20 mb-1">
            <div className="num-badge relative w-12 h-12 sm:w-15 sm:h-15 rounded-full border-2 border-[#6DB8F5]/40 bg-[#060c18] flex items-center justify-center font-mono text-base sm:text-xl font-extrabold text-[#6DB8F5] shrink-0 shadow-lg shadow-[#6DB8F5]/10 hover:scale-115 hover:-translate-y-1 hover:rotate-6 hover:border-[#6DB8F5] hover:bg-[#6DB8F5]/20 hover:text-[#E8EEF5] hover:shadow-xl hover:shadow-[#6DB8F5]/30 transition-all duration-300 ease-out cursor-pointer">
              <span className="absolute -inset-1 rounded-full border border-[#6DB8F5]/30 animate-ping opacity-25 pointer-events-none" />
              04
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#E8EEF5] leading-none mb-1">
                AI-Powered Research Assistant
              </h1>
              <p className="font-mono text-xs sm:text-sm text-[#6DB8F5] font-medium">
                RAG &bull; DOCUMENT INTELLIGENCE &bull; GENERATIVE AI
              </p>
            </div>
          </div>

          {/* Short Introduction */}
          <p className="font-sans text-xs sm:text-sm text-[#A7B5C7]/90 leading-relaxed">
            An AI-powered document intelligence system that uses Retrieval-Augmented Generation (RAG) to understand, search, summarize, compare, and answer complex queries from user-uploaded research papers and technical documents.
          </p>

          {/* Core Concept Cue */}
          <p className="font-sans text-xs sm:text-sm text-[#A7B5C7]/80 leading-relaxed">
            Built with LangChain, ChromaDB vector database, Sentence Transformers, and Google Gemini API, enabling semantic context retrieval and grounded responses with page-level source attributions.
          </p>

          {/* Explore Cue Link */}
          <div>
            <a
              href="#research-architecture"
              onClick={handleScrollToArchitecture}
              className="group inline-flex items-center gap-1.5 text-xs font-mono text-[#6DB8F5] hover:text-[#E8EEF5] transition-colors focus:outline-none focus:ring-1 focus:ring-[#6DB8F5]"
            >
              <span>Explore RAG pipeline</span>
              <ArrowDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-y-0.5" />
            </a>
          </div>

          {/* Timeline & Metadata */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-mono border-t border-[#1B3047]/40 pt-3">
            {/* Timeline */}
            <div className="flex flex-col space-y-0.5">
              <span className="text-[10px] font-semibold text-[#6DB8F5] uppercase tracking-wider">
                TIMELINE
              </span>
              <div className="flex items-center gap-1.5 text-[#E8EEF5] text-xs font-sans font-medium">
                <Calendar className="w-3.5 h-3.5 text-[#6DB8F5]" />
                <span>April – May 2026</span>
              </div>
            </div>

            <span className="hidden sm:inline text-[#1B3047] font-normal">&bull;</span>

            {/* Role */}
            <div className="flex flex-col space-y-0.5">
              <span className="text-[10px] font-semibold text-[#6DB8F5] uppercase tracking-wider">
                ROLE
              </span>
              <div className="flex items-center gap-1.5 text-[#A7B5C7] text-xs font-sans">
                <Layers className="w-3.5 h-3.5 text-[#6DB8F5]" />
                <span>AI &amp; Full Stack</span>
              </div>
            </div>

            <span className="hidden sm:inline text-[#1B3047] font-normal">&bull;</span>

            {/* Source GitHub */}
            <div className="flex flex-col space-y-0.5">
              <span className="text-[10px] font-semibold text-[#6DB8F5] uppercase tracking-wider">
                SOURCE
              </span>
              <a
                href="https://github.com/HarshadaBodkhe/ai-research-assistant"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#6DB8F5] hover:text-[#E8EEF5] text-xs font-semibold transition-colors focus:outline-none focus:underline"
              >
                <span>GitHub Repository</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive UI Demo Card / Main Image (5 Cols) */}
        <div className="md:col-span-5 w-full flex justify-center md:justify-end">
          <div
            ref={imageWrapperRef}
            tabIndex={0}
            className="group relative w-full max-w-[360px] aspect-[16/9] rounded-[12px] overflow-hidden bg-[#060c18] border border-[#1B3047]/60 shadow-lg transition-all duration-300 ease-out hover:scale-[1.02] hover:-translate-y-1 hover:brightness-105 hover:shadow-2xl hover:border-[#6DB8F5]/50 focus:outline-none focus:ring-2 focus:ring-[#6DB8F5]/60 will-change-transform"
          >
            {!imageError ? (
              <img
                ref={imgRef}
                src={mainImagePath}
                alt="AI-Powered Research Assistant Interface"
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-90'
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="absolute inset-0 flex flex-col justify-between p-3.5 bg-[#050b16] font-mono text-left">
                {/* Header bar */}
                <div className="flex items-center justify-between border-b border-[#1B3047]/50 pb-2">
                  <div className="flex items-center gap-1.5">
                    <Bot className="w-3.5 h-3.5 text-[#6DB8F5]" />
                    <span className="text-[11px] font-bold text-[#E8EEF5]">KnowledgeLens</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[9px] text-emerald-400 font-semibold uppercase">RAG Active</span>
                  </div>
                </div>

                {/* Simulated Documents & Interaction */}
                <div className="space-y-2 my-auto">
                  <div className="flex items-center gap-1.5 bg-[#081324] px-2 py-1 rounded border border-[#1B3047]/60">
                    <FileText className="w-3 h-3 text-[#6DB8F5]" />
                    <span className="text-[10px] text-[#A7B5C7] truncate">transformer-research-paper.pdf</span>
                  </div>

                  <div className="bg-[#0b1b30] p-2 rounded border border-[#6DB8F5]/30 space-y-1">
                    <p className="text-[9px] text-[#6DB8F5] font-semibold">Q: What methodology does this paper propose?</p>
                    <p className="text-[9px] text-[#A7B5C7] leading-tight">
                      A: Self-attention transformer mechanisms for context modeling.
                    </p>
                    <div className="flex gap-1 pt-0.5">
                      <span className="px-1 py-0.5 text-[8px] bg-[#1B3047]/60 text-[#6DB8F5] rounded">Page 4</span>
                      <span className="px-1 py-0.5 text-[8px] bg-[#1B3047]/60 text-[#6DB8F5] rounded">Page 7</span>
                    </div>
                  </div>
                </div>

                {/* Footer status */}
                <div className="flex items-center justify-between border-t border-[#1B3047]/50 pt-1.5 text-[9px] text-[#A7B5C7]/70">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" /> ChromaDB Vector Search
                  </span>
                  <span>Google Gemini API</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
