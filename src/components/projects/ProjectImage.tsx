import React, { useState } from 'react';

interface ProjectImageProps {
  src: string;
  alt: string;
  name: string;
  isActive?: boolean;
}

export const ProjectImage: React.FC<ProjectImageProps> = ({
  src,
  alt,
  name,
  isActive = false,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Clean initials for placeholder
  const initials = name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <div
      className={`relative w-full aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-[#0A1628]/95 transition-all duration-500 ${
        isActive
          ? 'shadow-[0_12px_35px_rgba(0,0,0,0.5),0_0_30px_rgba(109,184,245,0.16)] scale-100'
          : 'shadow-[0_6px_20px_rgba(0,0,0,0.3),0_0_12px_rgba(109,184,245,0.04)] lg:group-hover:shadow-[0_10px_25px_rgba(0,0,0,0.4),0_0_20px_rgba(109,184,245,0.12)] lg:group-hover:scale-[1.03]'
      }`}
    >
      {/* Top subtle glow highlight */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#6DB8F5]/30 to-transparent z-10" />

      {!hasError ? (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-all duration-700 ease-out ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          } lg:group-hover:scale-[1.03] lg:group-hover:brightness-105`}
        />
      ) : null}

      {/* Atmospheric 4:3 Placeholder (rendered when image is missing or loading) */}
      {(hasError || !isLoaded) && (
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-[#0B1728] via-[#0A1628] to-[#050E1C] select-none transition-opacity duration-500 ${
            hasError ? 'opacity-100' : 'opacity-90 pointer-events-none'
          }`}
        >
          {/* Subtle grid pattern background */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: `radial-gradient(#6DB8F5 1px, transparent 1px)`,
              backgroundSize: '16px 16px',
            }}
          />

          <div className="relative flex flex-col items-center z-10 text-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#0F223A]/90 flex items-center justify-center mb-2 shadow-[0_0_15px_rgba(109,184,245,0.12)] group-hover:bg-[#132A47] transition-colors duration-500">
              <span className="text-lg sm:text-xl font-mono font-bold text-[#6DB8F5] tracking-wider">
                {initials}
              </span>
            </div>

            <span className="text-xs font-semibold text-[#E8EEF5] tracking-tight mb-0.5">
              {name}
            </span>

            <span className="text-[9px] font-mono tracking-widest text-[#64748B] uppercase">
              SHOWCASE PREVIEW
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
