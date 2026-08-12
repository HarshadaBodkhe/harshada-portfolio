import React, { useState } from 'react';

interface TechnologyLogoProps {
  name: string;
}

const TECH_SLUG_MAP: Record<string, { slug: string; color?: string }> = {
  python: { slug: 'python', color: '3776AB' },
  javascript: { slug: 'javascript', color: 'F7DF1E' },
  react: { slug: 'react', color: '61DAFB' },
  'node.js': { slug: 'nodedotjs', color: '5FA04E' },
  node: { slug: 'nodedotjs', color: '5FA04E' },
  'express.js': { slug: 'express', color: 'E8EEF5' },
  express: { slug: 'express', color: 'E8EEF5' },
  mongodb: { slug: 'mongodb', color: '47A248' },
  streamlit: { slug: 'streamlit', color: 'FF4B4B' },
  opencv: { slug: 'opencv', color: '5C3EE8' },
  supabase: { slug: 'supabase', color: '3ECF8E' },
  'tailwind css': { slug: 'tailwindcss', color: '06B6D4' },
  tailwind: { slug: 'tailwindcss', color: '06B6D4' },
  'redux toolkit': { slug: 'redux', color: '764ABC' },
  redux: { slug: 'redux', color: '764ABC' },
  razorpay: { slug: 'razorpay', color: '3395FF' },
  langchain: { slug: 'langchain', color: '38BDF8' },
};

export const TechnologyLogo: React.FC<TechnologyLogoProps> = ({ name }) => {
  const [hasError, setHasError] = useState(false);
  const normalized = name.toLowerCase().trim();
  const config = TECH_SLUG_MAP[normalized];

  const logoUrl = config
    ? `https://cdn.simpleicons.org/${config.slug}/${config.color || '6DB8F5'}`
    : null;

  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--bg-surface)] text-xs font-mono text-[var(--text-primary)] border border-[var(--border-subtle)]">
      {logoUrl && !hasError ? (
        <img
          src={logoUrl}
          alt={`${name} logo`}
          onError={() => setHasError(true)}
          className="w-4 h-4 object-contain shrink-0"
        />
      ) : null}
      <span className="font-medium tracking-tight text-[var(--text-primary)]">{name}</span>
    </div>
  );
};
