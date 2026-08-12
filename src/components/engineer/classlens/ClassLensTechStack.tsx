import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Clean SVG Logo Components
const PythonLogo: React.FC = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M62.6 2C32.7 2 34.5 15 34.5 15l.1 13.5h28.7v4.1H23.5S2 30.6 2 61c0 30.3 17.5 29.2 17.5 29.2h10.4V75.6s-.6-17.5 17.2-17.5h29.3s16.7.3 16.7-16.1V23.7S95.5 2 62.6 2zm-15 9.4c2.8 0 5 2.2 5 5s-2.2 5-5 5-5-2.2-5-5 2.2-5 5-5z" fill="#3776AB" />
    <path d="M65.4 126c29.9 0 28.1-13 28.1-13l-.1-13.5H64.7v-4.1h39.8s21.5 2 21.5-28.4c0-30.3-17.5-29.2-17.5-29.2h-10.4v14.6s.6 17.5-17.2 17.5H52.1s-16.7-.3-16.7 16.1v17.7S32.5 126 65.4 126zm15-9.4c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z" fill="#FFD43B" />
  </svg>
);

const StreamlitLogo: React.FC = () => (
  <svg className="w-5 h-5 shrink-0 text-[#FF4B4B]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7l10 5 10-5-10-5zm0 9L2 6v11l10 5 10-5V6l-10 5z" />
  </svg>
);

const OpenCVLogo: React.FC = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="64" cy="36" r="24" stroke="#FF2400" strokeWidth="16" />
    <circle cx="36" cy="88" r="24" stroke="#029600" strokeWidth="16" />
    <circle cx="92" cy="88" r="24" stroke="#0000D0" strokeWidth="16" />
  </svg>
);

const DlibLogo: React.FC = () => (
  <svg className="w-5 h-5 shrink-0 text-[#6DB8F5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="18" height="18" rx="4" />
    <circle cx="9" cy="9" r="2" />
    <path d="M15 9h.01" />
    <path d="M8 15s1.5 2 4 2 4-2 4-2" />
  </svg>
);

const FaceRecLogo: React.FC = () => (
  <svg className="w-5 h-5 shrink-0 text-[#6DB8F5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 7V5a2 2 0 0 1 2-2h2" />
    <path d="M17 3h2a2 2 0 0 1 2 2v2" />
    <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
    <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
    <circle cx="12" cy="10" r="3" />
    <path d="M7 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
  </svg>
);

const ScikitLogo: React.FC = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="44" cy="64" r="32" fill="#F7931E" />
    <circle cx="84" cy="64" r="32" fill="#3499CC" />
  </svg>
);

const NumpyLogo: React.FC = () => (
  <svg className="w-5 h-5 shrink-0 text-[#4D77CF]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 3h16v18H4V3zm2 2v14h12V5H6zm2 2h3v10H8V7zm5 0h3v10h-3V7z" />
  </svg>
);

const PilLogo: React.FC = () => (
  <svg className="w-5 h-5 shrink-0 text-[#6DB8F5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <path d="M21 15l-5-5L5 21" />
  </svg>
);

const SupabaseLogo: React.FC = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M69.8 125.8c-2.3 2.9-6.9 1.3-7-2.4l-1.7-48.4H10.6c-4.4 0-7-4.9-4.3-8.3L60.6 2.2c2.3-2.9 6.9-1.3 7 2.4l1.4 48.4h50.8c4.4 0 7 4.9 4.3 8.3L69.8 125.8z" fill="url(#supa-grad-open)" />
    <defs>
      <linearGradient id="supa-grad-open" x1="64" y1="2" x2="64" y2="126" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3ECF8E" />
        <stop offset="1" stopColor="#1C9E62" />
      </linearGradient>
    </defs>
  </svg>
);

const BcryptLogo: React.FC = () => (
  <svg className="w-5 h-5 shrink-0 text-[#A7B5C7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
);

const SegnoLogo: React.FC = () => (
  <svg className="w-5 h-5 shrink-0 text-[#E8EEF5]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm13-2h3v3h-3v-3zm0 5h3v3h-3v-3zm-5-5h3v8h-3v-8z" />
  </svg>
);

const LibrosaLogo: React.FC = () => (
  <svg className="w-5 h-5 shrink-0 text-[#6DB8F5]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
  </svg>
);

const ResemblyzerLogo: React.FC = () => (
  <svg className="w-5 h-5 shrink-0 text-[#6DB8F5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 12h3l2-6 4 12 4-12 2 6h5" />
  </svg>
);

const GitLogo: React.FC = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M123.6 57.6L70.4 4.4c-4.4-4.4-11.5-4.4-15.9 0L39.8 19.1l20 20c4.7-1.6 10.1-.5 13.8 3.2 3.7 3.7 4.8 9.1 3.2 13.8l19.3 19.3c4.7-1.6 10.1-.5 13.8 3.2 5.5 5.5 5.5 14.4 0 19.9-5.5 5.5-14.4 5.5-19.9 0-4.1-4.1-5-10.2-2.7-15.1L69.3 62.3v30.9c1.4.8 2.7 2 3.6 3.5 3.3 5.5 1.5 12.6-3.9 15.9-5.5 3.3-12.6 1.5-15.9-3.9-3.3-5.5-1.5-12.6 3.9-15.9 1.9-1.1 4-1.6 6.1-1.6V59.4L44.1 40.3c-2 .6-4.2.7-6.2.2L19.1 59.3c-4.4 4.4-4.4 11.5 0 15.9l53.2 53.2c4.4 4.4 11.5 4.4 15.9 0l35.4-35.4c4.4-4.4 4.4-11.5 0-15.4z" fill="#F05032" />
  </svg>
);

const GitHubLogo: React.FC = () => (
  <svg className="w-5 h-5 shrink-0 text-[#E8EEF5]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

interface TechItem {
  name: string;
  logo: React.FC;
}

const ALL_TECHS: TechItem[] = [
  { name: 'Python', logo: PythonLogo },
  { name: 'Streamlit', logo: StreamlitLogo },
  { name: 'OpenCV', logo: OpenCVLogo },
  { name: 'dlib', logo: DlibLogo },
  { name: 'face-recognition', logo: FaceRecLogo },
  { name: 'scikit-learn', logo: ScikitLogo },
  { name: 'NumPy', logo: NumpyLogo },
  { name: 'PIL', logo: PilLogo },
  { name: 'librosa', logo: LibrosaLogo },
  { name: 'Resemblyzer', logo: ResemblyzerLogo },
  { name: 'Supabase', logo: SupabaseLogo },
  { name: 'bcrypt', logo: BcryptLogo },
  { name: 'Segno (QR)', logo: SegnoLogo },
  { name: 'Git', logo: GitLogo },
  { name: 'GitHub', logo: GitHubLogo },
];

export const ClassLensTechStack: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 20 },
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
    <div ref={containerRef} className="w-full max-w-[880px] space-y-4">
      <div className="space-y-1">
        <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#E8EEF5]">
          Verified Engineering Stack
        </h2>
      </div>

      {/* Clean Open Grid (NO Large Background Cards or Category Boxes!) */}
      <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs">
        {ALL_TECHS.map((item) => {
          const Logo = item.logo;
          const isHovered = hoveredTech === item.name;
          const isOtherHovered = hoveredTech !== null && !isHovered;

          return (
            <div
              key={item.name}
              onMouseEnter={() => setHoveredTech(item.name)}
              onMouseLeave={() => setHoveredTech(null)}
              onFocus={() => setHoveredTech(item.name)}
              onBlur={() => setHoveredTech(null)}
              tabIndex={0}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded transition-all duration-200 cursor-pointer outline-none ${
                isHovered
                  ? 'text-[#E8EEF5] bg-[#6DB8F5]/10 scale-[1.08]'
                  : isOtherHovered
                  ? 'text-[#A7B5C7]/40 opacity-40'
                  : 'text-[#A7B5C7] opacity-100'
              }`}
            >
              <Logo />
              <span className={`font-semibold text-xs transition-colors ${isHovered ? 'text-[#E8EEF5]' : 'text-[#A7B5C7]'}`}>
                {item.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
