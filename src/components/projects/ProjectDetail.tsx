import React from 'react';
import type { Project } from './projects';
import { TechnologyLogo } from './TechnologyLogo';

interface ProjectDetailProps {
  project: Project;
  onNavigateToEngineerProject?: (projectId: string) => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({
  project,
  onNavigateToEngineerProject,
}) => {
  return (
    <div className="flex flex-col justify-center h-full space-y-4 sm:space-y-5 text-left">
      {/* Title Header (No Project Numbers) */}
      <div>
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
          {project.title}
        </h3>
      </div>

      {/* Detailed Description */}
      <p className="text-sm sm:text-base text-[var(--text-secondary)] font-sans leading-relaxed">
        {project.description}
      </p>

      {/* Real Technology Logos Display */}
      <div>
        <div className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider mb-2">
          Technologies
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {project.technologies.map((tech) => (
            <TechnologyLogo key={tech} name={tech} />
          ))}
        </div>
      </div>

      {/* Verified Editorial Links & Actions */}
      <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--bg-surface)] hover:bg-[var(--bg-surface)]/80 border border-[var(--border-subtle)] hover:border-[var(--accent)]/50 text-xs sm:text-sm font-mono text-[var(--text-primary)] hover:text-[var(--accent)] transition-all duration-300 group"
          >
            <span>GitHub</span>
            <span className="text-xs text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">↗</span>
          </a>
        )}

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--bg-surface)] hover:bg-[var(--bg-surface)]/80 border border-[var(--border-subtle)] hover:border-[var(--accent)]/50 text-xs sm:text-sm font-mono text-[var(--text-primary)] hover:text-[var(--accent)] transition-all duration-300 group"
          >
            <span>{project.liveUrlLabel || 'Live Demo'}</span>
            <span className="text-xs text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">↗</span>
          </a>
        )}

        <button
          type="button"
          onClick={() => onNavigateToEngineerProject?.(project.id)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--accent)]/10 hover:bg-[var(--accent)]/20 border border-[var(--accent)]/40 hover:border-[var(--accent)]/80 text-xs sm:text-sm font-mono font-medium text-[var(--accent)] transition-all duration-300 group hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
        >
          <span>Details</span>
          <span className="text-xs group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">↗</span>
        </button>
      </div>
    </div>
  );
};
