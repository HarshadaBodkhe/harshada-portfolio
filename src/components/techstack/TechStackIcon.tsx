import React, { useState } from 'react';
import type { TechItem } from './techStackData';

interface TechStackIconProps {
  item: TechItem;
  className?: string;
}

export const TechStackIcon: React.FC<TechStackIconProps> = ({ item, className = 'w-6 h-6' }) => {
  const [hasError, setHasError] = useState(false);

  const logoUrl = item.slug
    ? `https://cdn.simpleicons.org/${item.slug}/${item.customColor || '6DB8F5'}`
    : null;

  return (
    <div className="relative w-7 h-7 flex items-center justify-center shrink-0">
      {logoUrl && !hasError ? (
        <img
          src={logoUrl}
          alt={`${item.name} logo`}
          onError={() => setHasError(true)}
          className={`${className} object-contain transition-transform duration-300 group-hover:scale-[1.08]`}
          loading="lazy"
        />
      ) : (
        /* Fallback for unmapped or failed logos: clean tech badge with initial */
        <div className={`${className} rounded-md bg-[#0F223A] border border-[#1B3047] flex items-center justify-center text-[10px] font-mono font-bold text-[#6DB8F5]`}>
          {item.name.charAt(0)}
        </div>
      )}
    </div>
  );
};
