import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Layers, Database, CreditCard, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const REDUX_FLOW_STEPS = [
  { step: 1, label: 'React Component', desc: 'Triggers action from UI event' },
  { step: 2, label: 'dispatch()', desc: 'Dispatches thunk action to Redux store' },
  { step: 3, label: 'Redux Async Thunk', desc: 'Handles asynchronous side-effect lifecycle' },
  { step: 4, label: 'Axios', desc: 'Executes HTTP request to backend endpoint' },
  { step: 5, label: 'Express API', desc: 'Processes request, validates & queries DB' },
  { step: 6, label: 'MongoDB', desc: 'Persists or reads document data' },
  { step: 7, label: 'API Response', desc: 'Returns HTTP payload to client application' },
  { step: 8, label: 'Redux Slice', desc: 'Reducers update immutable state tree' },
  { step: 9, label: 'React UI', desc: 'Re-renders connected components smoothly' },
];

export const SliceItArchitecture: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const flowContainerRef = useRef<HTMLDivElement>(null);
  const [activeReduxStep, setActiveReduxStep] = useState<number | null>(null);

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

      // Staggered highlight sequence for Redux flow (single run)
      if (flowContainerRef.current) {
        ScrollTrigger.create({
          trigger: flowContainerRef.current,
          start: 'top 75%',
          onEnter: () => {
            REDUX_FLOW_STEPS.forEach((_, idx) => {
              setTimeout(() => {
                setActiveReduxStep(idx);
              }, idx * 250);
            });
            setTimeout(() => {
              setActiveReduxStep(null);
            }, REDUX_FLOW_STEPS.length * 250 + 500);
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      id="sliceit-architecture"
      ref={containerRef}
      className="w-full max-w-[880px] space-y-12 pb-10 border-b border-[#1B3047]/40"
    >
      {/* 1. SYSTEM ARCHITECTURE DIAGRAM */}
      <div className="space-y-6">
        <div>
          <span className="font-mono text-xs font-semibold tracking-[0.2em] text-[#6DB8F5] uppercase block mb-1">
            FULL-STACK TOPOLOGY
          </span>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#E8EEF5]">
            System Architecture &amp; Service Connections
          </h2>
        </div>

        {/* Connected System Diagram */}
        <div className="p-6 bg-[#030914] border border-[#1B3047]/50 rounded-lg space-y-6 font-mono text-xs">
          {/* Top Level: React UI */}
          <div className="flex flex-col items-center">
            <div className="px-4 py-2 bg-[#060c18] border border-[#6DB8F5]/40 rounded-md text-[#E8EEF5] font-bold text-xs sm:text-sm flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#6DB8F5]" />
              <span>REACT SINGLE PAGE APPLICATION (Vite + Redux)</span>
            </div>
            <div className="h-6 w-px bg-[#6DB8F5]/40 my-1" />
            <span className="text-[10px] text-[#6DB8F5] uppercase tracking-wider font-semibold">
              Axios / HTTP REST
            </span>
            <ArrowDown className="w-3.5 h-3.5 text-[#6DB8F5] my-1" />
          </div>

          {/* Middle Level: Express API */}
          <div className="flex flex-col items-center">
            <div className="px-5 py-2.5 bg-[#060c18] border border-[#1B3047] rounded-md text-[#E8EEF5] font-bold text-xs sm:text-sm">
              EXPRESS.JS REST API (Node.js Engine)
            </div>
            <div className="h-6 w-px bg-[#1B3047] my-1" />
          </div>

          {/* Bottom Level: Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            {/* Database Node */}
            <div className="p-3 bg-[#060c18] border border-[#1B3047]/60 rounded space-y-1.5">
              <div className="flex items-center justify-center gap-1.5 text-[#6DB8F5] font-bold">
                <Database className="w-3.5 h-3.5" />
                <span>MongoDB (Mongoose ORM)</span>
              </div>
              <p className="text-[11px] text-[#A7B5C7]/80 font-sans">
                Users &bull; Admins &bull; Pizzas &bull; Orders
              </p>
            </div>

            {/* Payment Node */}
            <div className="p-3 bg-[#060c18] border border-[#1B3047]/60 rounded space-y-1.5">
              <div className="flex items-center justify-center gap-1.5 text-[#6DB8F5] font-bold">
                <CreditCard className="w-3.5 h-3.5" />
                <span>Razorpay Gateway</span>
              </div>
              <p className="text-[11px] text-[#A7B5C7]/80 font-sans">
                Order creation &amp; payment verification
              </p>
            </div>

            {/* Email Node */}
            <div className="p-3 bg-[#060c18] border border-[#1B3047]/60 rounded space-y-1.5">
              <div className="flex items-center justify-center gap-1.5 text-[#6DB8F5] font-bold">
                <Mail className="w-3.5 h-3.5" />
                <span>Nodemailer Service</span>
              </div>
              <p className="text-[11px] text-[#A7B5C7]/80 font-sans">
                Order confirmation email dispatch
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. FRONTEND ARCHITECTURE HIERARCHY */}
      <div className="space-y-4">
        <div>
          <span className="font-mono text-xs font-semibold tracking-[0.2em] text-[#6DB8F5] uppercase block mb-1">
            CLIENT STRUCTURE
          </span>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#E8EEF5]">
            Frontend Module Hierarchy
          </h2>
        </div>

        <div className="py-3 px-4 bg-[#030914] border border-[#1B3047]/40 rounded-md font-mono text-xs space-y-2">
          <div className="font-bold text-[#E8EEF5] text-xs sm:text-sm">React Application</div>
          <div className="pl-4 space-y-1 text-[#A7B5C7]/90 border-l border-[#1B3047]/50 ml-1">
            <div>├── <span className="text-[#6DB8F5] font-semibold">Components</span> (UI Cards, Modals, Navbar, Footer)</div>
            <div>├── <span className="text-[#6DB8F5] font-semibold">Screens</span> (HomeScreen, CartScreen, OrderScreen, AdminScreen)</div>
            <div>├── <span className="text-[#6DB8F5] font-semibold">Redux</span> (Store configuration, Slices, Async Thunks)</div>
            <div>└── <span className="text-[#6DB8F5] font-semibold">App / Routing</span> (React Router declarative routes)</div>
          </div>
        </div>
      </div>

      {/* 3. REDUX DATA FLOW */}
      <div className="space-y-4">
        <div>
          <span className="font-mono text-xs font-semibold tracking-[0.2em] text-[#6DB8F5] uppercase block mb-1">
            STATE LIFECYCLE
          </span>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#E8EEF5]">
            Redux Toolkit Async Data Flow
          </h2>
        </div>

        <div
          ref={flowContainerRef}
          className="border-t border-[#1B3047]/40 font-mono text-xs divide-y divide-[#1B3047]/30"
        >
          {REDUX_FLOW_STEPS.map((item, idx) => {
            const isActive = activeReduxStep === idx;
            return (
              <div
                key={item.step}
                onMouseEnter={() => setActiveReduxStep(idx)}
                onMouseLeave={() => setActiveReduxStep(null)}
                className={`py-2 px-2 transition-all duration-200 cursor-pointer outline-none ${
                  isActive
                    ? 'bg-[#6DB8F5]/10 text-[#E8EEF5] pl-3 border-l-2 border-[#6DB8F5]'
                    : 'text-[#A7B5C7]'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-[#6DB8F5] shrink-0">
                      STEP 0{item.step}
                    </span>
                    <span className="font-mono text-xs sm:text-sm font-bold text-[#E8EEF5]">
                      {item.label}
                    </span>
                  </div>
                  <span className="font-sans text-xs text-[#A7B5C7]/80">{item.desc}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
