import React, { useState } from 'react';

interface InstitutionLogoProps {
  src: string;
  alt: string;
  size?: number; // width in px
  height?: number; // optional height override
  className?: string;
  variant?: 'primary' | 'secondary' | 'board';
}

export const InstitutionLogo: React.FC<InstitutionLogoProps> = ({
  src,
  alt,
  size = 52,
  height,
  className = '',
  variant = 'board',
}) => {
  const [hasError, setHasError] = useState(false);

  // Padding & Border styling per variant
  const getContainerStyle = () => {
    if (variant === 'primary') {
      return 'p-2 rounded-xl bg-[#0A1628] border border-[#6DB8F5]/35 shadow-[0_0_20px_rgba(109,184,245,0.12)] group-hover:border-[#6DB8F5]/60 group-hover:shadow-[0_0_30px_rgba(109,184,245,0.25)] group-hover:scale-[1.04] transition-all duration-300';
    }
    if (variant === 'secondary') {
      return 'p-1.5 rounded-lg bg-[#0A1628] border border-[#6DB8F5]/20 shadow-[0_0_12px_rgba(109,184,245,0.08)] group-hover:border-[#6DB8F5]/40 group-hover:scale-[1.03] transition-all duration-300';
    }
    // Board logo (Square shape with rounded corners like DYP logo)
    return 'p-2 rounded-xl bg-[#0A1628] border border-[#6DB8F5]/35 shadow-[0_0_20px_rgba(109,184,245,0.12)] group-hover:border-[#6DB8F5]/60 group-hover:shadow-[0_0_30px_rgba(109,184,245,0.25)] group-hover:scale-[1.04] transition-all duration-300';
  };

  return (
    <div
      style={{ width: size, height: height || size }}
      className={`relative flex items-center justify-center shrink-0 ${getContainerStyle()} ${className}`}
      title={alt}
    >
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          onError={() => setHasError(true)}
          className="max-w-full max-h-full object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
        />
      ) : (
        /* Clean minimal image placeholder per rule 9 */
        <div className="w-full h-full flex items-center justify-center text-[10px] font-mono text-[#64748B] border border-dashed border-[#1B3047] rounded-xl">
          <span>Asset</span>
        </div>
      )}
    </div>
  );
};
