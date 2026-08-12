import React, { useState, useEffect } from 'react';

export interface DocumentPreviewProps {
  title: string;
  image?: string;
  altText?: string;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const DocumentPreview: React.FC<DocumentPreviewProps> = ({
  title,
  image,
  altText,
  onClick,
  className = '',
  style,
}) => {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [image]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      tabIndex={0}
      role={onClick ? 'button' : 'region'}
      aria-label={altText || `${title} document preview`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      style={style}
      className={`relative w-[190px] sm:w-[210px] h-[265px] sm:h-[295px] rounded-[12px] bg-[var(--bg-surface)] backdrop-blur-md border border-[var(--border-subtle)] shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden transition-all duration-500 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] cursor-pointer ${className}`}
    >
      {/* Subtle blue atmospheric background glow inside document frame */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent)]/5 via-transparent to-transparent pointer-events-none" />

      {image && !imgError ? (
        /* Actual Document Image (rendered directly in transparent card frame) */
        <div className="relative w-full h-full p-2.5 flex items-center justify-center">
          <img
            src={image}
            alt={altText || `${title} preview`}
            onError={() => setImgError(true)}
            className="w-full h-full object-contain rounded-[8px]"
          />
        </div>
      ) : (
        /* Minimal Document Placeholder (Subtle font-mono text, centered, no upload buttons/emojis) */
        <div className="relative w-full h-full p-5 flex flex-col items-center justify-center text-center">
          {/* Subtle document top border line graphic element */}
          <div className="w-8 h-[2px] bg-[var(--accent)]/30 rounded-full mb-6" />

          {/* Minimal Document Title & Subtitle */}
          <span className="text-xs font-mono font-medium tracking-[0.2em] text-[var(--text-primary)] uppercase mb-2">
            {title}
          </span>
          <span className="text-[10px] font-mono tracking-widest text-[var(--text-muted)] uppercase">
            DOCUMENT PREVIEW
          </span>

          {/* Subtle bottom accent line */}
          <div className="w-12 h-[1px] bg-[var(--border-subtle)] rounded-full mt-8" />
        </div>
      )}
    </div>
  );
};
