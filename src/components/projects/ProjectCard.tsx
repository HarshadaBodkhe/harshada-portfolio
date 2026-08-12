import { forwardRef } from 'react';
import type { Project } from './projects';
import { ProjectImage } from './ProjectImage';

interface ProjectCardProps {
  project: Project;
  isActive: boolean;
  isAnyActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onFocus: () => void;
  onClick: () => void;
}

export const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(
  (
    {
      project,
      isActive,
      isAnyActive,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onClick,
    },
    ref
  ) => {
    const isInactive = isAnyActive && !isActive;

    return (
      <div
        ref={ref}
        tabIndex={0}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onFocus={onFocus}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        }}
        aria-expanded={isActive}
        aria-label={`${project.name} project preview`}
        className={`group relative flex flex-col items-center text-center space-y-3 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#6DB8F5]/80 transition-all duration-500 ease-out ${
          isActive
            ? 'opacity-100 scale-100 blur-0 z-20'
            : isInactive
            ? 'opacity-25 blur-[1px] scale-[0.97] z-0 pointer-events-auto'
            : 'opacity-100 scale-100 blur-0 z-10'
        } w-full max-w-[235px] sm:max-w-[255px] lg:max-w-[265px]`}
      >
        {/* 4:3 Rectangular Image Container */}
        <div className="w-full">
          <ProjectImage
            src={project.image}
            alt={`Screenshot of ${project.name}`}
            name={project.name}
            isActive={isActive}
          />
        </div>

        {/* Text Information Below Image (No Project Numbers) */}
        <div className="w-full space-y-1 text-center">
          <h4 className="text-sm sm:text-base font-semibold text-[var(--text-primary)] tracking-tight group-hover:text-[var(--accent)] transition-colors duration-300">
            {project.name}
          </h4>
          <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed font-sans max-w-[230px] mx-auto">
            {project.shortDescription}
          </p>
        </div>
      </div>
    );
  }
);

ProjectCard.displayName = 'ProjectCard';
