import React from 'react';

interface TechIconProps {
  name: string;
  className?: string;
}

export const TechIcon: React.FC<TechIconProps> = ({ name, className = 'w-4 h-4' }) => {
  const normalized = name.toLowerCase().trim();

  switch (normalized) {
    case 'python':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.927 0c-5.474 0-5.13 2.378-5.13 2.378l.006 2.46h5.214v.74H4.761S2 5.247 2 10.742c0 5.496 2.41 5.305 2.41 5.305h1.442v-2.032s-.08-2.43 2.39-2.43h4.088s2.3.018 2.3-2.222V4.761S15.068 0 11.927 0zm-2.85 1.576a.91.91 0 1 1 0 1.82.91.91 0 0 1 0-1.82zm10.162 6.742h-1.442v2.032s.08 2.43-2.39 2.43h-4.088s-2.3-.018-2.3 2.222v4.619S9.68 24 12.82 24c5.474 0 5.13-2.378 5.13-2.378l-.006-2.46h-5.214v-.74h7.256S22 18.753 22 13.258c0-5.496-2.41-5.305-2.41-5.305zm-4.462 14.106a.91.91 0 1 1 0-1.82.91.91 0 0 1 0 1.82z" />
        </svg>
      );

    case 'streamlit':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z" />
        </svg>
      );

    case 'opencv':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="7" r="4" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="7" cy="16" r="4" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="17" cy="16" r="4" fill="none" stroke="currentColor" strokeWidth="2.5" />
        </svg>
      );

    case 'supabase':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.35 21a.75.75 0 0 1-.6-1.2l5.4-7.2h-6.9a.75.75 0 0 1-.6-1.2l5.4-7.2A.75.75 0 0 0 15.45 3H4.75a.75.75 0 0 0-.6 1.2l5.4 7.2h-6.9a.75.75 0 0 0-.6 1.2l5.4 7.2a.75.75 0 0 0 .6.3h9.7a.75.75 0 0 0 .6-1.2l-5.4-7.2z" />
        </svg>
      );

    case 'voice recognition':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" y1="19" x2="12" y2="22" />
        </svg>
      );

    case 'react':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <ellipse cx="12" cy="12" rx="10" ry="4.5" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
      );

    case 'javascript':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 3h18v18H3V3zm11.5 13.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5v-6h-2v6c0 .28-.22.5-.5.5s-.5-.22-.5-.5v-4h-2v4zm-7 0c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5-2.5 1.12-2.5 2.5z" />
        </svg>
      );

    case 'node.js':
    case 'node':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7.8v8.4L12 22l10-5.8V7.8L12 2zm-1 14.5v-5l4 2.3v5l-4-2.3z" />
        </svg>
      );

    case 'express.js':
    case 'express':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 12h16M12 4v16" />
        </svg>
      );

    case 'mongodb':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2a9.5 9.5 0 0 0-3.5 18.3c.7.4 1.5-.1 1.5-.9v-2.1c0-1.8.8-3.4 2-4.3 1.2.9 2 2.5 2 4.3v2.1c0 .8.8 1.3 1.5.9A9.5 9.5 0 0 0 12 2z" />
        </svg>
      );

    case 'tailwind css':
    case 'tailwind':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 12.001 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
        </svg>
      );

    case 'redux toolkit':
    case 'redux':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
        </svg>
      );

    case 'razorpay':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M22 4L8 20H2L16 4h6zM13 4L2 20h6l8-16h-3z" />
        </svg>
      );

    case 'ejs':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      );

    case 'langchain':
    case 'agentic rag':
    case 'generative ai':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      );

    default:
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      );
  }
};
