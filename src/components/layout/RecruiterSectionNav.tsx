import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface NavItem {
  id: string;
  label: string;
}

const SECTION_ITEMS: NavItem[] = [
  { id: 'about', label: 'ABOUT' },
  { id: 'experience', label: 'EXPERIENCE' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'tech-stack', label: 'TECH STACK' },
  { id: 'education', label: 'EDUCATION' },
  { id: 'contact', label: 'CONNECT' },
];

export const RecruiterSectionNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('about');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const navRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Track scroll position to adjust background opacity
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // GSAP ScrollTrigger active section detector
    const triggers: ScrollTrigger[] = [];
    SECTION_ITEMS.forEach((item) => {
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

    // Subtle fade in entrance animation
    if (!isReducedMotion && navRef.current) {
      gsap.fromTo(
        navRef.current,
        { opacity: 0, y: -6 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      );
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      triggers.forEach((st) => st.kill());
    };
  }, []);

  // Ensure active tab stays in view inside horizontally scrollable container on mobile
  useEffect(() => {
    if (scrollContainerRef.current) {
      const activeEl = scrollContainerRef.current.querySelector<HTMLElement>(
        `a[href="#${activeSection}"]`
      );
      if (activeEl) {
        const container = scrollContainerRef.current;
        const elLeft = activeEl.offsetLeft;
        const elWidth = activeEl.offsetWidth;
        const containerWidth = container.offsetWidth;

        if (elLeft < container.scrollLeft || elLeft + elWidth > container.scrollLeft + containerWidth) {
          container.scrollTo({
            left: elLeft - containerWidth / 2 + elWidth / 2,
            behavior: 'smooth',
          });
        }
      }
    }
  }, [activeSection]);

  // Smooth scroll handler with offset for sticky section bar height
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const navbarOffset = 70; // Accounts for sticky bar height so section heading is not hidden
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
    <nav
      ref={navRef}
      aria-label="Recruiter Workspace section navigation"
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#060b14]/85 backdrop-blur-md border-b border-white/[0.08] shadow-[0_4px_20px_rgba(2,7,17,0.7)]'
          : 'bg-[#060b14]/75 backdrop-blur-md border-b border-white/[0.06]'
      }`}
    >
      <div
        ref={scrollContainerRef}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-center overflow-x-auto scrollbar-none space-x-1 sm:space-x-3 md:space-x-6"
      >
        {SECTION_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => scrollToSection(e, item.id)}
              className={`relative px-2.5 py-1 font-mono text-[11px] sm:text-xs font-semibold tracking-wider transition-all duration-200 shrink-0 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-[#6DB8F5] ${
                isActive
                  ? 'text-[#6DB8F5]'
                  : 'text-[#A7B5C7]/80 hover:text-[#E8EEF5]'
              }`}
            >
              <span>{item.label}</span>
              {isActive && (
                <span className="absolute bottom-0 left-1.5 right-1.5 h-[2px] bg-[#6DB8F5] rounded-full shadow-[0_0_8px_rgba(109,184,245,0.8)]" />
              )}
            </a>
          );
        })}
      </div>
    </nav>
  );
};
