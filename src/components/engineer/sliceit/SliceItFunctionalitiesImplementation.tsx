import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FUNCTIONALITIES = [
  {
    name: 'Menu Exploration & Customization',
    desc: 'Interactive pizza catalog supporting variant sizes, custom toppings, and real-time price calculation.',
  },
  {
    name: 'Cart & Order Persistence',
    desc: 'Redux store managing cart state, quantities, and local storage fallback across client sessions.',
  },
  {
    name: 'Razorpay Payment Gateway',
    desc: 'Two-phase checkout integration initializing Razorpay transactions and committing orders upon payment completion.',
  },
  {
    name: 'Admin Order & Inventory Control',
    desc: 'Centralized admin workflow for adding/editing pizzas, monitoring orders, and updating delivery progression.',
  },
];

export const SliceItFunctionalitiesImplementation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 15 },
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
    <div ref={containerRef} className="w-full max-w-[880px] space-y-8">
      {/* 1. Core Functionalities */}
      <div className="space-y-3 max-w-[780px]">
        <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#E8EEF5]">
          Core Functionalities
        </h2>

        <div className="space-y-3 border-l border-[#1B3047]/60 pl-4">
          {FUNCTIONALITIES.map((func) => (
            <div key={func.name} className="space-y-0.5">
              <h4 className="font-mono text-xs sm:text-sm font-bold text-[#E8EEF5]">
                {func.name}
              </h4>
              <p className="font-sans text-xs sm:text-sm text-[#A7B5C7]/80 leading-relaxed">
                {func.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Technical Implementation */}
      <div className="space-y-3">
        <h3 className="text-base sm:text-lg font-bold tracking-tight text-[#E8EEF5]">
          Technical Implementation
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans text-xs sm:text-sm">
          <div className="space-y-1">
            <span className="font-mono text-xs font-bold text-[#6DB8F5] uppercase tracking-wider block">
              FRONTEND UI &amp; STATE
            </span>
            <p className="text-[#A7B5C7]/85 leading-relaxed">
              React SPA built with Vite, Tailwind CSS, and Redux Toolkit managing client-side data flows.
            </p>
          </div>

          <div className="space-y-1">
            <span className="font-mono text-xs font-bold text-[#6DB8F5] uppercase tracking-wider block">
              BACKEND REST API
            </span>
            <p className="text-[#A7B5C7]/85 leading-relaxed">
              Node.js and Express API routing endpoints for authentication, order processing, and payment initialization.
            </p>
          </div>

          <div className="space-y-1">
            <span className="font-mono text-xs font-bold text-[#6DB8F5] uppercase tracking-wider block">
              DATABASE SCHEMA DESIGN
            </span>
            <p className="text-[#A7B5C7]/85 leading-relaxed">
              MongoDB Mongoose schemas modeling Users, Admins, Pizzas, and Order documents with reference links.
            </p>
          </div>

          <div className="space-y-1">
            <span className="font-mono text-xs font-bold text-[#6DB8F5] uppercase tracking-wider block">
              SECURITY &amp; INTEGRATIONS
            </span>
            <p className="text-[#A7B5C7]/85 leading-relaxed">
              JWT token validation, bcrypt password hashing, Nodemailer receipt dispatch, and Razorpay API integration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
