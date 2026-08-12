import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { FolderGit2, ArrowLeft } from 'lucide-react';
import { EngineeringIntro } from './EngineeringIntro';
import { DomainSelectorBar } from './DomainSelectorBar';
import { FloatingDomainSelector } from './FloatingDomainSelector';
import type { ProjectType, DomainType } from './engineerProjectsData';
import { ENGINEER_PROJECTS, DOMAIN_LABELS } from './engineerProjectsData';

interface EngineerWorkspaceContainerProps {
  projectType: ProjectType;
  onProjectTypeChange: (type: ProjectType) => void;
  domain: DomainType;
  onDomainChange: (domain: DomainType) => void;
  onBackToFeaturedProjects?: () => void;
}

export const EngineerWorkspaceContainer: React.FC<EngineerWorkspaceContainerProps> = ({
  projectType,
  domain,
  onDomainChange,
  onBackToFeaturedProjects,
}) => {
  const collectionRef = useRef<HTMLDivElement>(null);

  // Smooth GSAP transition whenever projectType or domain changes
  useEffect(() => {
    if (!collectionRef.current) return;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    gsap.fromTo(
      collectionRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    );
  }, [projectType, domain]);

  const currentProjects = ENGINEER_PROJECTS[projectType][domain];

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* 1. Engineering Intro Hero Section */}
      <EngineeringIntro />

      {/* 2. Dynamic Section Heading */}
      <DomainSelectorBar domain={domain} />

      {/* 3. Floating Right-Side Sticky Domain Indicator */}
      <FloatingDomainSelector domain={domain} onDomainChange={onDomainChange} />

      {/* 4. Optional Top Back Navigation Bar */}
      {onBackToFeaturedProjects && (
        <div className="w-full max-w-[880px] mx-auto px-4 pt-4 pb-2 flex items-center justify-start">
          <button
            type="button"
            onClick={onBackToFeaturedProjects}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#0F223A] hover:bg-[#152D4F] border border-[#1B3047] hover:border-[#6DB8F5]/60 text-[#6DB8F5] text-xs font-mono font-semibold shadow-md transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-[#6DB8F5]"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Feature project</span>
          </button>
        </div>
      )}

      {/* 4. Active Project Collection Render Container */}
      <div ref={collectionRef} className="w-full flex flex-col items-center min-h-[400px] transition-opacity">
        {currentProjects.length > 0 ? (
          currentProjects.map((project) => {
            const ProjectComponent = project.component;
            return <ProjectComponent key={project.id} />;
          })
        ) : (
          /* Editorial Empty State for Mini Projects or Future Collections */
          <div className="w-full max-w-[880px] mx-auto py-20 px-4 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#081324] border border-[#1B3047] flex items-center justify-center mx-auto text-[#6DB8F5]">
              <FolderGit2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#E8EEF5]">
              Future Mini Projects under {DOMAIN_LABELS[domain]}
            </h3>
            <p className="text-xs sm:text-sm text-[#A7B5C7]/70 font-mono max-w-md mx-auto leading-relaxed">
              Modular utilities, experimental micro-tools, and open-source packages will be showcased in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
