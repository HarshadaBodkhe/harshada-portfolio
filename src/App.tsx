import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AtmosphericBackground } from './components/background/AtmosphericBackground';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/hero/Hero';
import { AboutSection } from './components/about/AboutSection';
import { ExperienceSection } from './components/experience/ExperienceSection';
import { FeaturedProjects } from './components/projects/FeaturedProjects';
import { TechnicalOrbitSection } from './components/techstack/TechnicalOrbitSection';
import { EducationSection } from './components/education/EducationSection';
import { ContactSection } from './components/contact/ContactSection';
import { EngineerWorkspaceContainer } from './components/engineer/EngineerWorkspaceContainer';
import type { ProjectType, DomainType } from './components/engineer/engineerProjectsData';
import type { WorkspaceMode } from './components/ui/WorkspaceSelector';

export const AppContent: React.FC = () => {
  const [workspaceMode, setWorkspaceMode] = useState<WorkspaceMode>('recruiter');
  const [projectType, setProjectType] = useState<ProjectType>('major');
  const [domain, setDomain] = useState<DomainType>('fullstack');
  const [navigatedFromRecruiter, setNavigatedFromRecruiter] = useState<boolean>(false);

  const handleWorkspaceChange = (mode: WorkspaceMode) => {
    setWorkspaceMode(mode);
    setNavigatedFromRecruiter(false);
  };

  const handleNavigateToEngineerProject = (projectId: string) => {
    let targetType: ProjectType = 'major';
    let targetDomain: DomainType = 'fullstack';

    if (projectId === 'dwello' || projectId === 'sliceit') {
      targetType = 'major';
      targetDomain = 'fullstack';
    } else if (projectId === 'classlens' || projectId === 'ai-research-assistant') {
      targetType = 'major';
      targetDomain = 'aiml';
    }

    setProjectType(targetType);
    setDomain(targetDomain);
    setWorkspaceMode('engineer');
    setNavigatedFromRecruiter(true);

    const targetElementId = `${projectId}-case-study`;

    const scrollToTarget = (attemptsLeft = 15) => {
      const el = document.getElementById(targetElementId);
      if (el) {
        const navbarOffset = 90; // Accounts for sticky top navbar height + padding
        const elementPosition = el.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = Math.max(0, elementPosition - navbarOffset);

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      } else if (attemptsLeft > 0) {
        setTimeout(() => scrollToTarget(attemptsLeft - 1), 40);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    setTimeout(() => scrollToTarget(), 60);
  };

  const handleRedirectToRecruiter = () => {
    setWorkspaceMode('recruiter');
    setNavigatedFromRecruiter(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToFeaturedProjects = () => {
    setWorkspaceMode('recruiter');
    setNavigatedFromRecruiter(false);

    const scrollToProjects = (attemptsLeft = 15) => {
      const el = document.getElementById('projects');
      if (el) {
        const navbarOffset = 80;
        const elementPosition = el.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = Math.max(0, elementPosition - navbarOffset);

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      } else if (attemptsLeft > 0) {
        setTimeout(() => scrollToProjects(attemptsLeft - 1), 40);
      }
    };

    setTimeout(() => scrollToProjects(), 60);
  };

  return (
    <div className="relative min-h-screen bg-[var(--bg-dark)] text-[var(--text-primary)] flex flex-col font-sans selection:bg-[var(--accent)]/20 selection:text-[var(--accent)] transition-colors duration-300">
      {/* Ambient dark navy & light blue background */}
      <AtmosphericBackground />

      {/* Single Top Navigation Bar */}
      <Navbar
        workspaceMode={workspaceMode}
        projectType={projectType}
        onProjectTypeChange={setProjectType}
        onBackToFeaturedProjects={
          navigatedFromRecruiter ? handleBackToFeaturedProjects : undefined
        }
        onRedirectToRecruiter={handleRedirectToRecruiter}
        onSelectWorkspace={handleWorkspaceChange}
      />

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col">
        {/* Recruiter / Landing Hero */}
        <Hero workspaceMode={workspaceMode} onWorkspaceChange={handleWorkspaceChange} />

        {/* Recruiter Workspace Journey */}
        {workspaceMode === 'recruiter' && (
          <>
            <AboutSection />
            <ExperienceSection />
            <FeaturedProjects onNavigateToEngineerProject={handleNavigateToEngineerProject} />
            <TechnicalOrbitSection />
            <EducationSection />
            <ContactSection />
          </>
        )}

        {/* Engineer Workspace Journey */}
        {workspaceMode === 'engineer' && (
          <EngineerWorkspaceContainer
            projectType={projectType}
            onProjectTypeChange={setProjectType}
            domain={domain}
            onDomainChange={setDomain}
            onBackToFeaturedProjects={
              navigatedFromRecruiter ? handleBackToFeaturedProjects : undefined
            }
          />
        )}
      </main>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
