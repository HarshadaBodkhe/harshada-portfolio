import React, { useEffect, useState, useRef } from 'react';

const ROLES = [
  'Artificial Intelligence & Data Science Undergraduate',
  'Full Stack Developer',
  'AI Engineer',
];

export const RoleAnimation: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const isReducedMotion = useRef(false);

  useEffect(() => {
    isReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isReducedMotion.current) {
      setDisplayText(ROLES[roleIndex]);
      const timer = setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
      }, 4000);
      return () => clearTimeout(timer);
    }

    const currentFullRole = ROLES[roleIndex];
    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      // TYPE PHASE (60ms per character)
      if (displayText.length < currentFullRole.length) {
        timer = setTimeout(() => {
          setDisplayText(currentFullRole.substring(0, displayText.length + 1));
        }, 60);
      } else {
        // HOLD PHASE (2.2 seconds pause)
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      // ERASE PHASE (35ms per character)
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentFullRole.substring(0, displayText.length - 1));
        }, 35);
      } else {
        // TYPE NEXT ROLE PHASE (pause before next role)
        timer = setTimeout(() => {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
        }, 300);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <div className="inline-flex items-center min-h-[1.75rem]">
      <span className="font-mono text-[var(--text-secondary)] text-xs sm:text-sm mr-2 select-none font-semibold">
        &gt;
      </span>
      <span className="font-mono text-xs sm:text-sm md:text-base font-semibold text-[var(--accent)] tracking-tight">
        {displayText}
      </span>
      {/* Smooth Blinking Light-Blue Cursor */}
      <span className="inline-block w-1.5 h-3.5 ml-1 bg-[var(--accent)] animate-pulse rounded-sm" />
    </div>
  );
};
