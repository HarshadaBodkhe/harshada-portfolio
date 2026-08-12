import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Database, ShieldCheck, Wrench, Sparkles, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const API_GROUPS = [
  {
    group: 'AUTHENTICATION',
    endpoints: [
      { method: 'POST', path: '/api/users/login', desc: 'Authenticate user & return JWT token' },
      { method: 'POST', path: '/api/users/register', desc: 'Register new customer account' },
      { method: 'GET', path: '/api/users/profile', desc: 'Fetch authenticated user profile' },
    ],
  },
  {
    group: 'PIZZA CATALOG',
    endpoints: [
      { method: 'GET', path: '/api/pizzas', desc: 'Fetch all available pizzas' },
      { method: 'GET', path: '/api/pizzas/:id', desc: 'Fetch single pizza details by ID' },
      { method: 'POST', path: '/api/pizzas', desc: 'Admin: Add new pizza item' },
      { method: 'PUT', path: '/api/pizzas/:id', desc: 'Admin: Update existing pizza item' },
      { method: 'DELETE', path: '/api/pizzas/:id', desc: 'Admin: Delete pizza item' },
    ],
  },
  {
    group: 'ORDERS & PAYMENTS',
    endpoints: [
      { method: 'POST', path: '/api/orders', desc: 'Create application order' },
      { method: 'POST', path: '/api/orders/checkout', desc: 'Initialize Razorpay payment order' },
      { method: 'GET', path: '/api/orders', desc: 'Admin: Fetch all system orders' },
      { method: 'GET', path: '/api/orders/user', desc: 'Fetch customer order history' },
      { method: 'GET', path: '/api/orders/:id', desc: 'Fetch specific order details' },
      { method: 'PUT', path: '/api/orders/:id', desc: 'Admin: Update order fulfillment status' },
      { method: 'DELETE', path: '/api/orders/:id', desc: 'Admin: Delete order record' },
    ],
  },
];

const SECURITY_ITEMS = [
  {
    title: 'PASSWORD HASHING',
    tech: 'bcrypt',
    desc: 'Salted, one-way password hashing before persistence in MongoDB collections.',
  },
  {
    title: 'JWT AUTHENTICATION',
    tech: 'JSON Web Tokens',
    desc: 'Stateless session tokens passed via Bearer authorization headers.',
  },
  {
    title: 'ADMIN AUTHORIZATION',
    tech: 'Middleware Guards',
    desc: 'Role validation middleware restricting catalog & order mutations to authorized admins.',
  },
  {
    title: 'ENVIRONMENT VARIABLES',
    tech: 'dotenv',
    desc: 'Secure isolation of MongoDB URI credentials, JWT secret keys, and Razorpay API keys.',
  },
  {
    title: 'SERVER-SIDE VALIDATION',
    tech: 'Express Middlewares',
    desc: 'Strict request payload validation prior to executing database updates or API calls.',
  },
];

const DEBUGGING_STORIES = [
  {
    title: 'PAYMENT INTEGRATION SYNCHRONIZATION',
    flow: 'FRONTEND ↕ REDUX ↕ BACKEND ↕ RAZORPAY',
    desc: 'Resolving state desynchronization between Razorpay checkout modal completion and backend order state dispatch. Implemented two-phase creation where the order record is committed only after verified Razorpay transaction signatures return.',
  },
  {
    title: 'CURRENCY & PRICE CONSISTENCY',
    flow: 'USD values → INR → Razorpay paise',
    desc: 'Fixing currency calculation discrepancies when converting float price inputs into integer paise values required by Razorpay API endpoints to prevent rounding mismatches.',
  },
  {
    title: 'ORDER CREATION 500 FAILURE ("No recipients defined")',
    flow: 'Payment Success → POST /api/orders → 500 Error',
    desc: 'Identified a bug where successful payments failed to commit order records due to an unhandled Nodemailer SMTP exception when customer email fields were missing. Wrapped email dispatch in isolated try/catch blocks to ensure order persistence succeeds even if email transport fails.',
  },
];

const FUTURE_IMPROVEMENTS = [
  'Server-side Razorpay signature verification',
  'Razorpay webhook event handlers for async payment confirmation',
  'MongoDB transaction handling (session.startTransaction)',
  'Background email processing queue (BullMQ / Redis)',
  'Cloudinary / S3 object storage for pizza asset uploads',
  'Admin analytics dashboard with revenue metrics',
];

export const SliceItTechnicalDetails: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSecurity, setActiveSecurity] = useState<number | null>(null);

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
    <div ref={containerRef} className="w-full max-w-[880px] space-y-12 pb-10 border-b border-[#1B3047]/40">
      {/* 1. API STRUCTURE */}
      <div className="space-y-4">
        <div>
          <span className="font-mono text-xs font-semibold tracking-[0.2em] text-[#6DB8F5] uppercase block mb-1">
            ENDPOINT SPECIFICATION
          </span>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#E8EEF5]">
            REST API Endpoint Architecture
          </h2>
        </div>

        <div className="space-y-6">
          {API_GROUPS.map((grp) => (
            <div key={grp.group} className="space-y-2 font-mono text-xs">
              <span className="text-[10px] font-bold text-[#6DB8F5] uppercase tracking-wider block">
                {grp.group}
              </span>
              <div className="border-t border-[#1B3047]/40 divide-y divide-[#1B3047]/30">
                {grp.endpoints.map((ep) => (
                  <div key={ep.path + ep.method} className="py-2 px-2 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        ep.method === 'GET' ? 'bg-[#6DB8F5]/10 text-[#6DB8F5]' :
                        ep.method === 'POST' ? 'bg-emerald-500/10 text-emerald-400' :
                        ep.method === 'PUT' ? 'bg-amber-500/10 text-amber-400' : 'bg-rose-500/10 text-rose-400'
                      }`}>
                        {ep.method}
                      </span>
                      <span className="font-bold text-[#E8EEF5]">{ep.path}</span>
                    </div>
                    <span className="font-sans text-xs text-[#A7B5C7]/80">{ep.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. DATABASE DESIGN */}
      <div className="space-y-4">
        <div>
          <span className="font-mono text-xs font-semibold tracking-[0.2em] text-[#6DB8F5] uppercase block mb-1">
            SCHEMA MODEL
          </span>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#E8EEF5]">
            MongoDB Document &amp; Relationship Model
          </h2>
        </div>

        <div className="p-4 bg-[#030914] border border-[#1B3047]/50 rounded-md font-mono text-xs space-y-3">
          <div className="flex items-center gap-2 text-[#E8EEF5] font-bold">
            <Database className="w-4 h-4 text-[#6DB8F5]" />
            <span>MongoDB Collections &amp; Relationships:</span>
          </div>

          <div className="pl-4 border-l border-[#1B3047]/50 space-y-1 text-[#A7B5C7]">
            <div>MongoDB Atlas</div>
            <div>│</div>
            <div>├── <span className="text-[#E8EEF5] font-bold">Users</span> (Name, Email, Password, isAdmin)</div>
            <div>├── <span className="text-[#E8EEF5] font-bold">Admins</span> (Privileged credentials &amp; logs)</div>
            <div>├── <span className="text-[#E8EEF5] font-bold">Pizzas</span> (Name, Prices, Image, Description, Stock)</div>
            <div>└── <span className="text-[#E8EEF5] font-bold">Orders</span> (User Ref, OrderItems, ShippingAddress, PaymentResult, Status)</div>
          </div>

          <div className="pt-2 border-t border-[#1B3047]/40 text-[#6DB8F5] font-semibold text-xs flex items-center gap-2">
            <span>User</span>
            <ArrowRight className="w-3 h-3" />
            <span>Orders (1 : Many)</span>
            <ArrowRight className="w-3 h-3" />
            <span>Pizza Items</span>
          </div>
        </div>
      </div>

      {/* 3. ERROR HANDLING MATRIX */}
      <div className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold tracking-tight text-[#E8EEF5]">
          HTTP Error Handling Categories
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
          <div className="p-3 bg-[#030914] border border-[#1B3047]/40 rounded">
            <span className="text-[#6DB8F5] font-bold block text-sm">400</span>
            <span className="text-[#E8EEF5] font-sans text-xs font-semibold block">Invalid Request</span>
            <span className="text-[#A7B5C7]/70 font-sans text-[11px]">Validation error</span>
          </div>
          <div className="p-3 bg-[#030914] border border-[#1B3047]/40 rounded">
            <span className="text-[#6DB8F5] font-bold block text-sm">401</span>
            <span className="text-[#E8EEF5] font-sans text-xs font-semibold block">Unauthorized</span>
            <span className="text-[#A7B5C7]/70 font-sans text-[11px]">Missing or invalid JWT</span>
          </div>
          <div className="p-3 bg-[#030914] border border-[#1B3047]/40 rounded">
            <span className="text-[#6DB8F5] font-bold block text-sm">404</span>
            <span className="text-[#E8EEF5] font-sans text-xs font-semibold block">Not Found</span>
            <span className="text-[#A7B5C7]/70 font-sans text-[11px]">Resource missing</span>
          </div>
          <div className="p-3 bg-[#030914] border border-[#1B3047]/40 rounded">
            <span className="text-[#6DB8F5] font-bold block text-sm">500</span>
            <span className="text-[#E8EEF5] font-sans text-xs font-semibold block">Server Error</span>
            <span className="text-[#A7B5C7]/70 font-sans text-[11px]">Unhandled exception</span>
          </div>
        </div>
      </div>

      {/* 4. SECURITY PRACTICES */}
      <div className="space-y-4">
        <div>
          <span className="font-mono text-xs font-semibold tracking-[0.2em] text-[#6DB8F5] uppercase block mb-1">
            PROTECTION PROTOCOLS
          </span>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#E8EEF5]">
            Security &amp; Hardening Practices
          </h2>
        </div>

        <div className="space-y-0.5 font-mono text-xs">
          {SECURITY_ITEMS.map((sec, idx) => {
            const isHovered = activeSecurity === idx;
            return (
              <div
                key={sec.title}
                onMouseEnter={() => setActiveSecurity(idx)}
                onMouseLeave={() => setActiveSecurity(null)}
                className={`py-3 px-2 border-b border-[#1B3047]/40 transition-all duration-200 cursor-pointer outline-none ${
                  isHovered ? 'bg-[#6DB8F5]/5 text-[#E8EEF5] pl-3' : 'text-[#A7B5C7]'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#6DB8F5] shrink-0" />
                    <span className="font-bold text-xs sm:text-sm text-[#E8EEF5]">{sec.title}</span>
                  </div>
                  <span className="text-xs text-[#6DB8F5] font-sans">{sec.tech}</span>
                </div>
                {isHovered && (
                  <div className="mt-2 pt-1 font-sans text-xs sm:text-sm text-[#A7B5C7]/80 leading-relaxed">
                    {sec.desc}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. ENGINEERING CHALLENGES & REAL DEBUGGING STORIES */}
      <div className="space-y-4">
        <div>
          <span className="font-mono text-xs font-semibold tracking-[0.2em] text-[#6DB8F5] uppercase block mb-1">
            REAL DEBUGGING EVIDENCE
          </span>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#E8EEF5]">
            Engineering Challenges &amp; Technical Debugging
          </h2>
        </div>

        <div className="space-y-4">
          {DEBUGGING_STORIES.map((story) => (
            <div key={story.title} className="p-4 bg-[#030914] border border-[#1B3047]/50 rounded-md space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-[#1B3047]/40 pb-2">
                <div className="flex items-center gap-2 text-[#E8EEF5] font-bold text-xs sm:text-sm">
                  <Wrench className="w-3.5 h-3.5 text-[#6DB8F5] shrink-0" />
                  <span>{story.title}</span>
                </div>
                <span className="font-mono text-[10px] text-[#6DB8F5]">{story.flow}</span>
              </div>
              <p className="font-sans text-xs sm:text-sm text-[#A7B5C7]/85 leading-relaxed">
                {story.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 6. MONGODB CONNECTION */}
      <div className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold tracking-tight text-[#E8EEF5]">
          Database Connectivity &amp; Network Allowlisting
        </h2>
        <p className="font-sans text-xs sm:text-sm text-[#A7B5C7]/85 leading-relaxed">
          Distinguished between application controller exceptions and network connectivity timeouts by configuring explicit Mongoose connection options, retry intervals, and IP allowlisting in MongoDB Atlas.
        </p>
      </div>

      {/* 7. FUTURE IMPROVEMENTS */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#6DB8F5]" />
          <h2 className="text-base sm:text-lg font-bold tracking-tight text-[#E8EEF5] font-mono uppercase">
            FUTURE IMPROVEMENTS
          </h2>
        </div>

        <div className="border-t border-[#1B3047]/40 pt-3">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-sans text-xs sm:text-sm text-[#A7B5C7]/90">
            {FUTURE_IMPROVEMENTS.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="font-mono text-xs text-[#6DB8F5]">&bull;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
