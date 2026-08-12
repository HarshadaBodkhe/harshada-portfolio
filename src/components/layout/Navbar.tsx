import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, Menu, X } from 'lucide-react';
import { WorkspaceSelector, type WorkspaceMode } from '../ui/WorkspaceSelector';
import { ThemeToggle } from '../ui/ThemeToggle';
import { RESUME_CONFIG } from '../about/AboutSection';

gsap.registerPlugin(ScrollTrigger);

interface NavItem {
  id: string;
  label: string;
}

const SECTION_NAV_ITEMS: NavItem[] = [
  { id: 'about', label: 'ABOUT' },
  { id: 'experience', label: 'EXPERIENCE' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'tech-stack', label: 'TECH STACK' },
  { id: 'education', label: 'EDUCATION' },
  { id: 'contact', label: 'CONNECT' },
];

export interface NavbarProps {
  workspaceMode?: WorkspaceMode;
  projectType?: 'major' | 'mini';
  onProjectTypeChange?: (type: 'major' | 'mini') => void;
  onBackToFeaturedProjects?: () => void;
  onRedirectToRecruiter?: () => void;
  onSelectWorkspace?: (mode: WorkspaceMode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  workspaceMode = 'recruiter',
  projectType = 'major',
  onProjectTypeChange,
  onBackToFeaturedProjects,
  onRedirectToRecruiter,
  onSelectWorkspace,
}) => {
  const brandRef = useRef<HTMLAnchorElement>(null);
  const clickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const [activeSection, setActiveSection] = useState<string>('about');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const handleBrandClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const isAtTop = window.scrollY <= 50;

    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
      clickTimerRef.current = null;
      if (onRedirectToRecruiter) {
        onRedirectToRecruiter();
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    if (isAtTop) {
      if (onRedirectToRecruiter) {
        onRedirectToRecruiter();
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      clickTimerRef.current = setTimeout(() => {
        clickTimerRef.current = null;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 250);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const cueEl = document.getElementById('hero-scroll-cue');
      if (cueEl) {
        const cueTop = cueEl.getBoundingClientRect().top + window.scrollY;
        setIsScrolled(window.scrollY >= cueTop - 120);
      } else {
        const aboutEl = document.getElementById('about');
        const threshold = aboutEl ? aboutEl.offsetTop - 140 : Math.max(window.innerHeight * 0.5, 350);
        setIsScrolled(window.scrollY >= threshold);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && brandRef.current) {
      gsap.fromTo(
        brandRef.current,
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out', delay: 0.2 }
      );
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (workspaceMode !== 'recruiter') return;

    const triggers: ScrollTrigger[] = [];
    SECTION_NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) {
        const st = ScrollTrigger.create({
          trigger: el,
          start: 'top 45%',
          end: 'bottom 45%',
          onToggle: (self) => {
            if (self.isActive) {
              setActiveSection(item.id);
            }
          },
        });
        triggers.push(st);
      }
    });

    return () => {
      triggers.forEach((st) => st.kill());
    };
  }, [workspaceMode]);

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navbarOffset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSection(id);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[var(--bg-nav)]/95 backdrop-blur-xl border-b border-[var(--accent)]/20 shadow-[0_4px_25px_var(--glow-subtle)]'
          : 'bg-[var(--bg-nav)]/90 backdrop-blur-md border-b border-[var(--border-subtle)]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* LEFT: Brand Title + Theme Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            ref={brandRef}
            href="#"
            onClick={handleBrandClick}
            className="group text-[var(--text-primary)] font-mono text-lg sm:text-xl tracking-tight font-bold transition-colors duration-300 hover:text-[var(--accent)] shrink-0 cursor-pointer select-none"
            title="Click to scroll to top • Double-click for Recruiter Page"
          >
            PortFolio
          </a>

          {/* Theme Switcher Toggle */}
          <ThemeToggle />
        </div>

        {/* DESKTOP RIGHT NAVIGATION */}
        <div className="hidden md:flex items-center justify-end">
          {workspaceMode === 'recruiter' && (
            <div className="relative flex items-center justify-end">
              <div
                className={`transition-all duration-300 ease-out ${
                  !isScrolled
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 -translate-y-2 pointer-events-none absolute right-0'
                }`}
              >
                <WorkspaceSelector
                  selectedWorkspace={workspaceMode}
                  onSelectWorkspace={onSelectWorkspace}
                  align="right"
                />
              </div>

              <nav
                aria-label="Recruiter Workspace section navigation"
                className={`flex items-center gap-1 sm:gap-2.5 md:gap-4 overflow-x-auto scrollbar-none py-1 min-w-0 transition-all duration-300 ease-out ${
                  isScrolled
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 translate-y-2 pointer-events-none absolute right-0'
                }`}
              >
                {SECTION_NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={(e) => scrollToSection(e, item.id)}
                      className={`relative px-2.5 py-1 font-mono text-[11px] sm:text-xs font-semibold tracking-wider transition-all duration-200 shrink-0 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-[var(--accent)] ${
                        isActive
                          ? 'text-[var(--accent)]'
                          : 'text-[var(--text-secondary)]/80 hover:text-[var(--text-primary)]'
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && (
                        <span className="absolute bottom-0 left-1.5 right-1.5 h-[2px] bg-[var(--accent)] rounded-full shadow-[0_0_8px_var(--accent)]" />
                      )}
                    </a>
                  );
                })}

                {/* RESUME ↗ ACTION LINK IMMEDIATELY BESIDE CONTACT */}
                <a
                  href={RESUME_CONFIG.viewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View Harshada Bodkhe Resume in new tab"
                  className="relative px-2.5 py-1 font-mono text-[11px] sm:text-xs font-bold tracking-wider text-[var(--accent)] hover:text-[var(--accent)] hover:underline underline-offset-4 transition-all duration-200 shrink-0 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-[var(--accent)] flex items-center gap-0.5"
                >
                  <span>RESUME</span>
                  <span className="text-[11px] font-sans">↗</span>
                </a>
              </nav>
            </div>
          )}

          {workspaceMode === 'engineer' && (
            <div className="relative flex items-center justify-end">
              <div
                className={`transition-all duration-300 ease-out ${
                  !isScrolled
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 -translate-y-2 pointer-events-none absolute right-0'
                }`}
              >
                <WorkspaceSelector
                  selectedWorkspace={workspaceMode}
                  onSelectWorkspace={onSelectWorkspace}
                  align="right"
                />
              </div>

              <nav
                aria-label="Engineer Workspace project category navigation"
                className={`flex items-center gap-1 sm:gap-2.5 md:gap-4 font-mono text-[11px] sm:text-xs font-semibold transition-all duration-300 ease-out ${
                  isScrolled
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 translate-y-2 pointer-events-none absolute right-0'
                }`}
              >
                {onBackToFeaturedProjects && (
                  <button
                    type="button"
                    onClick={onBackToFeaturedProjects}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#6DB8F5]/10 hover:bg-[#6DB8F5]/20 border border-[#6DB8F5]/30 text-[#6DB8F5] text-[11px] sm:text-xs font-mono font-semibold transition-all duration-200 group mr-1 sm:mr-2 cursor-pointer"
                    title="Back to Featured Projects"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform duration-200" />
                    <span>FEATURED PROJECTS</span>
                  </button>
                )}

                <button
                  onClick={() => onProjectTypeChange?.('major')}
                  className={`relative px-2.5 py-1 transition-all duration-200 rounded cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#6DB8F5] ${
                    projectType === 'major'
                      ? 'text-[#6DB8F5] font-bold'
                      : 'text-[#A7B5C7]/80 hover:text-[#E8EEF5]'
                  }`}
                >
                  <span>MAJOR PROJECTS</span>
                  {projectType === 'major' && (
                    <span className="absolute bottom-0 left-1.5 right-1.5 h-[2px] bg-[#6DB8F5] rounded-full shadow-[0_0_8px_rgba(109,184,245,0.8)]" />
                  )}
                </button>

                <button
                  onClick={() => onProjectTypeChange?.('mini')}
                  className={`relative px-2.5 py-1 transition-all duration-200 rounded cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#6DB8F5] ${
                    projectType === 'mini'
                      ? 'text-[#6DB8F5] font-bold'
                      : 'text-[#A7B5C7]/80 hover:text-[#E8EEF5]'
                  }`}
                >
                  <span>MINI PROJECTS</span>
                  {projectType === 'mini' && (
                    <span className="absolute bottom-0 left-1.5 right-1.5 h-[2px] bg-[#6DB8F5] rounded-full shadow-[0_0_8px_rgba(109,184,245,0.8)]" />
                  )}
                </button>

                {/* RESUME ↗ ACTION LINK IN ENGINEER WORKSPACE */}
                <a
                  href={RESUME_CONFIG.viewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View Harshada Bodkhe Resume in new tab"
                  className="relative px-2.5 py-1 font-mono text-[11px] sm:text-xs font-bold tracking-wider text-[#6DB8F5] hover:underline underline-offset-4 transition-all duration-200 shrink-0 whitespace-nowrap focus:outline-none focus:ring-1 focus:ring-[#6DB8F5] flex items-center gap-0.5"
                >
                  <span>RESUME</span>
                  <span className="text-[11px] font-sans">↗</span>
                </a>
              </nav>
            </div>
          )}
        </div>

        {/* MOBILE HAMBURGER BUTTON */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            className="p-2 rounded-lg bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[var(--accent)] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE NAVIGATION DROPDOWN MENU */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden w-full bg-[var(--bg-nav)]/95 backdrop-blur-2xl border-b border-[var(--border-subtle)] shadow-2xl animate-fadeIn px-4 py-5 space-y-5"
        >
          {/* Workspace Mode Switcher */}
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
            <span className="font-mono text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
              WORKSPACE MODE
            </span>
            <WorkspaceSelector
              selectedWorkspace={workspaceMode}
              onSelectWorkspace={(mode) => {
                onSelectWorkspace?.(mode);
                setIsMobileMenuOpen(false);
              }}
              align="right"
            />
          </div>

          {/* Recruiter Navigation Links */}
          {workspaceMode === 'recruiter' && (
            <div className="space-y-1 pt-1">
              <span className="font-mono text-[10px] font-bold text-[var(--accent)] uppercase tracking-widest block mb-2 px-1">
                SECTIONS
              </span>
              <div className="flex flex-col space-y-1">
                {SECTION_NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={(e) => scrollToSection(e, item.id)}
                      className={`px-3 py-2 rounded font-mono text-xs font-semibold tracking-wider transition-colors duration-200 flex items-center justify-between ${
                        isActive
                          ? 'text-[var(--accent)] font-bold'
                          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_6px_var(--accent)]" />
                      )}
                    </a>
                  );
                })}

                {/* RESUME ↗ ACTION LINK IMMEDIATELY BESIDE CONNECT */}
                <a
                  href={RESUME_CONFIG.viewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2 rounded font-mono text-xs font-bold tracking-wider text-[var(--accent)] hover:text-[var(--accent)] transition-colors duration-200 flex items-center justify-between"
                >
                  <span>RESUME ↗</span>
                </a>
              </div>
            </div>
          )}

          {/* Engineer Navigation Links */}
          {workspaceMode === 'engineer' && (
            <div className="space-y-1 pt-1">
              <span className="font-mono text-[10px] font-bold text-[#6DB8F5] uppercase tracking-widest block mb-2 px-1">
                PROJECT CATEGORIES
              </span>
              <div className="flex flex-col space-y-1 font-mono text-xs">
                {onBackToFeaturedProjects && (
                  <button
                    type="button"
                    onClick={() => {
                      onBackToFeaturedProjects();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 px-3 py-2 rounded text-[#6DB8F5] font-semibold hover:bg-[#6DB8F5]/10 transition-colors text-left"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>FEATURED PROJECTS</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    onProjectTypeChange?.('major');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2 rounded font-semibold text-left tracking-wider transition-colors ${
                    projectType === 'major'
                      ? 'text-[#6DB8F5] font-bold'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  MAJOR PROJECTS
                </button>

                <button
                  onClick={() => {
                    onProjectTypeChange?.('mini');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2 rounded font-semibold text-left tracking-wider transition-colors ${
                    projectType === 'mini'
                      ? 'text-[#6DB8F5] font-bold'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  MINI PROJECTS
                </button>

                {/* RESUME ↗ ACTION LINK IN ENGINEER WORKSPACE MOBILE */}
                <a
                  href={RESUME_CONFIG.viewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2 rounded font-mono text-xs font-bold tracking-wider text-[#6DB8F5] hover:text-[#6DB8F5] transition-colors duration-200 flex items-center justify-between"
                >
                  <span>RESUME ↗</span>
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

