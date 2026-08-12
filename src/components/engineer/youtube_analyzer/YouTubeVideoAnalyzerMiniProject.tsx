import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ExternalLink, ArrowRight, ArrowDown, Cpu, Server, Bot, Video } from 'lucide-react';

const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

const WORKFLOW_STEPS = [
  'YouTube Video / URL',
  'Content Extraction',
  'Agent Processing',
  'LLM Analysis',
  'Insights / Answer',
];

const TECH_STACK = [
  'Python',
  'AI Agent Architecture',
  'LLM Integration',
  'YouTube Video Processing',
];

const TECHNICAL_DETAILS = [
  {
    category: 'AGENT ORCHESTRATION',
    name: 'AI Agent Architecture',
    desc: 'Autonomous agent design that coordinates content parsing, contextual query execution, and multi-step reasoning.',
    icon: Bot,
  },
  {
    category: 'CONTENT ENGINE',
    name: 'YouTube Content Extraction',
    desc: 'Extracts and preprocesses video metadata and transcripts to convert unstructured video streams into structured text context.',
    icon: Video,
  },
  {
    category: 'REASONING ENGINE',
    name: 'LLM Analysis & Synthesis',
    desc: 'Leverages large language models to analyze deep video content, answer questions, and summarize key concepts.',
    icon: Cpu,
  },
  {
    category: 'RUNTIME ENVIRONMENT',
    name: 'Python Orchestration',
    desc: 'Provides script orchestration, API handling, data transformation pipelines, and agent state execution.',
    icon: Server,
  },
];

export const YouTubeVideoAnalyzerMiniProject: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const workflowRef = useRef<HTMLDivElement>(null);
  const techDetailsRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        const badge = headerRef.current.querySelector('.num-badge');
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
        );
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
              delay: 0.1,
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

      if (workflowRef.current) {
        const steps = workflowRef.current.querySelectorAll('.workflow-step');
        gsap.fromTo(
          steps,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.08,
            ease: 'power2.out',
            delay: 0.2,
          }
        );
      }

      if (techDetailsRef.current) {
        const items = techDetailsRef.current.querySelectorAll('.tech-detail-card');
        gsap.fromTo(
          items,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.06,
            ease: 'power2.out',
            delay: 0.3,
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="youtube-video-analyzer-mini-project"
      ref={containerRef}
      className="relative w-full py-8 sm:py-12 px-4 sm:px-8 flex flex-col items-center bg-transparent"
    >
      {/* OPEN EDITORIAL LAYOUT MATCHING MINI PROJECT COLLECTION */}
      <div className="w-full max-w-[880px] mx-auto flex flex-col space-y-10 sm:space-y-12">
        {/* 1. Header Section */}
        <div ref={headerRef} className="flex flex-col space-y-4">
          <div className="group/num flex items-center gap-4 sm:gap-6 sm:-ml-20">
            {/* Prominent Circular Number Badge on Far Left with Motion & Glowing Pulsing Halo */}
            <div className="num-badge relative w-12 h-12 sm:w-15 sm:h-15 rounded-full border-2 border-[#6DB8F5]/40 bg-[#060c18] flex items-center justify-center font-mono text-base sm:text-xl font-extrabold text-[#6DB8F5] shrink-0 shadow-lg shadow-[#6DB8F5]/10 hover:scale-115 hover:-translate-y-1 hover:rotate-6 hover:border-[#6DB8F5] hover:bg-[#6DB8F5]/20 hover:text-[#E8EEF5] hover:shadow-xl hover:shadow-[#6DB8F5]/30 transition-all duration-300 ease-out cursor-pointer">
              <span className="absolute -inset-1 rounded-full border border-[#6DB8F5]/30 animate-ping opacity-25 pointer-events-none" />
              03
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#E8EEF5] leading-tight">
              YouTube Video Analyzer Agent
            </h1>
          </div>

          <p className="font-sans text-sm sm:text-base text-[#A7B5C7]/90 leading-relaxed max-w-3xl">
            An AI agent that analyzes YouTube video content and transforms it into useful, contextual insights through automated content processing and LLM-powered analysis.
          </p>

          {/* Metadata & GitHub Action Link */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-mono border-t border-[#1B3047]/40 pt-4">
            {/* Category */}
            <div className="flex flex-col space-y-0.5">
              <span className="text-[10px] font-semibold text-[#6DB8F5] uppercase tracking-wider">
                CATEGORY
              </span>
              <span className="text-[#E8EEF5] text-xs font-sans font-medium">
                AI Agents &amp; Video Intelligence
              </span>
            </div>

            <span className="hidden sm:inline text-[#1B3047] font-normal">&bull;</span>

            {/* Architecture */}
            <div className="flex flex-col space-y-0.5">
              <span className="text-[10px] font-semibold text-[#6DB8F5] uppercase tracking-wider">
                ARCHITECTURE
              </span>
              <span className="text-[#A7B5C7] text-xs font-sans">
                Agent Processing + LLM Analysis
              </span>
            </div>

            <span className="hidden sm:inline text-[#1B3047] font-normal">&bull;</span>

            {/* View on GitHub */}
            <div className="flex flex-col space-y-0.5">
              <span className="text-[10px] font-semibold text-[#6DB8F5] uppercase tracking-wider">
                SOURCE CODE
              </span>
              <a
                href="https://github.com/HarshadaBodkhe/Youtube-Video-Analyzer-Agent"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-[#6DB8F5] hover:text-[#E8EEF5] text-xs font-semibold transition-colors focus:outline-none focus:underline"
              >
                <GithubIcon className="w-3.5 h-3.5 text-[#6DB8F5] group-hover:scale-110 transition-transform" />
                <span>View on GitHub</span>
                <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* 2. Workflow Pipeline */}
        <div className="space-y-4 pt-2 border-t border-[#1B3047]/40">
          <div className="space-y-1">
            <span className="font-mono text-xs font-semibold tracking-[0.2em] text-[#6DB8F5] uppercase block">
              WORKFLOW PIPELINE
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#E8EEF5]">
              Video Processing &amp; Agent Analysis Flow
            </h2>
          </div>

          <div
            ref={workflowRef}
            className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-2 w-full pt-2"
          >
            {WORKFLOW_STEPS.map((step, idx) => (
              <React.Fragment key={step}>
                <div className="workflow-step w-full md:w-auto flex-1 flex items-center justify-center text-center px-3.5 py-3 rounded-xl bg-[#060c18] border border-[#1B3047]/70 hover:border-[#6DB8F5]/50 hover:bg-[#091527] transition-all duration-200 shadow-sm group">
                  <span className="font-mono text-xs font-medium text-[#E8EEF5] group-hover:text-[#6DB8F5] transition-colors">
                    {step}
                  </span>
                </div>
                {idx < WORKFLOW_STEPS.length - 1 && (
                  <div className="workflow-step shrink-0 flex items-center justify-center text-[#6DB8F5]/70 py-0.5 md:py-0">
                    <ArrowRight className="hidden md:block w-3.5 h-3.5 text-[#6DB8F5]" />
                    <ArrowDown className="block md:hidden w-3.5 h-3.5 text-[#6DB8F5]" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* 3. Technical Breakdown */}
        <div className="space-y-4 border-t border-[#1B3047]/40 pt-8">
          <div className="space-y-1">
            <span className="font-mono text-xs font-semibold tracking-[0.2em] text-[#6DB8F5] uppercase block">
              SYSTEM ARCHITECTURE
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#E8EEF5]">
              Technical Components &amp; Specifications
            </h2>
          </div>

          <div ref={techDetailsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {TECHNICAL_DETAILS.map((detail) => {
              const Icon = detail.icon;
              return (
                <div
                  key={detail.name}
                  className="tech-detail-card p-4 rounded-xl bg-[#060c18] border border-[#1B3047]/60 hover:border-[#6DB8F5]/40 transition-all duration-200 flex flex-col justify-between space-y-2 group"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold text-[#6DB8F5] uppercase tracking-wider">
                        {detail.category}
                      </span>
                      <Icon className="w-4 h-4 text-[#6DB8F5]/80 group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className="font-sans text-sm font-bold text-[#E8EEF5] group-hover:text-[#6DB8F5] transition-colors">
                      {detail.name}
                    </h3>
                  </div>
                  <p className="font-sans text-xs text-[#A7B5C7]/80 leading-relaxed">
                    {detail.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Verified Tech Stack Tags */}
        <div ref={stackRef} className="space-y-4 border-t border-[#1B3047]/40 pt-8">
          <div className="space-y-1">
            <span className="font-mono text-xs font-semibold tracking-[0.2em] text-[#6DB8F5] uppercase block">
              TECH STACK
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#E8EEF5]">
              Technologies &amp; Frameworks Used
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 pt-2 font-mono text-xs">
            {TECH_STACK.map((tech) => {
              const isHovered = hoveredTech === tech;
              const isOtherHovered = hoveredTech !== null && !isHovered;

              return (
                <div
                  key={tech}
                  onMouseEnter={() => setHoveredTech(tech)}
                  onMouseLeave={() => setHoveredTech(null)}
                  onFocus={() => setHoveredTech(tech)}
                  onBlur={() => setHoveredTech(null)}
                  tabIndex={0}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border transition-all duration-200 cursor-pointer outline-none ${
                    isHovered
                      ? 'text-[#E8EEF5] bg-[#6DB8F5]/10 border-[#6DB8F5]/60 scale-105 shadow-md shadow-[#6DB8F5]/10'
                      : isOtherHovered
                      ? 'text-[#A7B5C7]/40 border-[#1B3047]/30 bg-[#040914]/40 opacity-40'
                      : 'text-[#E8EEF5] border-[#1B3047]/80 bg-[#060c18] hover:border-[#6DB8F5]/40'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6DB8F5]" />
                  <span className="font-semibold text-xs">{tech}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
