import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { UserCheck, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CUSTOMER_ROLE_CAPABILITIES = [
  'Register user account',
  'Login & JWT token persistence',
  'Browse available pizza items',
  'View item details & customizations',
  'Add to shopping cart',
  'Checkout & shipping address entry',
  'Online payment via Razorpay',
  'Track order status & view order history',
];

const ADMIN_ROLE_CAPABILITIES = [
  'Admin role login authentication',
  'Centralized admin dashboard',
  'Manage pizzas (Add new pizza)',
  'Manage pizzas (Edit details)',
  'Manage pizzas (Delete pizza)',
  'View all customer orders',
  'Update order status progression',
  'Manage operational workflow & delete orders',
];

const CUSTOMER_FLOW = [
  { step: '01', label: 'Register', desc: 'New user account creation with hashed credentials' },
  { step: '02', label: 'Login', desc: 'Authentication and JWT token retrieval' },
  { step: '03', label: 'Browse Pizzas', desc: 'Filter and inspect available pizza catalog' },
  { step: '04', label: 'View Pizza', desc: 'Inspect pricing, sizes, and topping options' },
  { step: '05', label: 'Add to Cart', desc: 'Persist item state to Redux store & localStorage' },
  { step: '06', label: 'Enter Address', desc: 'Provide recipient address and contact details' },
  { step: '07', label: 'Select Payment', desc: 'Choose online payment gateway option' },
  { step: '08', label: 'Razorpay Payment', desc: 'Secure payment execution & transaction verification' },
  { step: '09', label: 'Create Order', desc: 'Commit verified order to MongoDB and update inventory' },
  { step: '10', label: 'Order History', desc: 'Track real-time delivery status and view past purchases' },
];

const ADMIN_FLOW = [
  { step: '01', label: 'Admin Login', desc: 'Privileged admin credential verification' },
  { step: '02', label: 'Admin Dashboard', desc: 'Centralized overview of catalog and customer activity' },
  { step: '03', label: 'Manage Pizzas', desc: 'CRUD operations: Add new, edit details, or remove pizzas' },
  { step: '04', label: 'Manage Orders', desc: 'View orders, update delivery status (Pending → Delivered), or remove records' },
];

export const SliceItRolesWorkflow: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCustomerStep, setActiveCustomerStep] = useState<number | null>(null);
  const [activeAdminStep, setActiveAdminStep] = useState<number | null>(null);

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
      {/* 1. DUAL USER ROLES (Customer vs Admin) */}
      <div className="space-y-6">
        <div>
          <span className="font-mono text-xs font-semibold tracking-[0.2em] text-[#6DB8F5] uppercase block mb-1">
            ACCESS CONTROLS
          </span>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#E8EEF5]">
            User Roles &amp; System Capabilities
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
          {/* Thin Vertical Divider for Desktop */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-[#1B3047]/40" />

          {/* CUSTOMER ROLE */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-[#1B3047]/40 pb-2">
              <UserCheck className="w-4 h-4 text-[#6DB8F5]" />
              <span className="font-mono text-xs font-bold text-[#E8EEF5] uppercase tracking-wider">
                CUSTOMER ROLE
              </span>
            </div>
            <ul className="space-y-2 font-sans text-xs sm:text-sm text-[#A7B5C7]/85">
              {CUSTOMER_ROLE_CAPABILITIES.map((cap, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="font-mono text-xs text-[#6DB8F5]">&bull;</span>
                  <span>{cap}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ADMIN ROLE */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-[#1B3047]/40 pb-2">
              <ShieldCheck className="w-4 h-4 text-[#6DB8F5]" />
              <span className="font-mono text-xs font-bold text-[#E8EEF5] uppercase tracking-wider">
                ADMIN ROLE
              </span>
            </div>
            <ul className="space-y-2 font-sans text-xs sm:text-sm text-[#A7B5C7]/85">
              {ADMIN_ROLE_CAPABILITIES.map((cap, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="font-mono text-xs text-[#6DB8F5]">&bull;</span>
                  <span>{cap}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 2. CUSTOMER EXECUTION FLOW */}
      <div className="space-y-4">
        <div>
          <span className="font-mono text-xs font-semibold tracking-[0.2em] text-[#6DB8F5] uppercase block mb-1">
            CUSTOMER JOURNEY
          </span>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#E8EEF5]">
            End-to-End Customer Execution Flow
          </h2>
        </div>

        <div className="border-t border-[#1B3047]/40 font-mono text-xs divide-y divide-[#1B3047]/30">
          {CUSTOMER_FLOW.map((item, idx) => {
            const isHovered = activeCustomerStep === idx;
            return (
              <div
                key={item.step}
                onMouseEnter={() => setActiveCustomerStep(idx)}
                onMouseLeave={() => setActiveCustomerStep(null)}
                className={`py-2.5 px-2 transition-all duration-200 cursor-pointer outline-none ${
                  isHovered ? 'bg-[#6DB8F5]/5 text-[#E8EEF5] pl-3' : 'text-[#A7B5C7]'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-[#6DB8F5] shrink-0">{item.step}</span>
                    <span className="font-mono text-xs sm:text-sm font-bold text-[#E8EEF5]">{item.label}</span>
                  </div>
                  <span className="font-sans text-xs text-[#A7B5C7]/80">{item.desc}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. ADMIN WORKFLOW */}
      <div className="space-y-4">
        <div>
          <span className="font-mono text-xs font-semibold tracking-[0.2em] text-[#6DB8F5] uppercase block mb-1">
            ADMIN WORKFLOW
          </span>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#E8EEF5]">
            Management &amp; Operational Flow
          </h2>
        </div>

        <div className="border-t border-[#1B3047]/40 font-mono text-xs divide-y divide-[#1B3047]/30">
          {ADMIN_FLOW.map((item, idx) => {
            const isHovered = activeAdminStep === idx;
            return (
              <div
                key={item.step}
                onMouseEnter={() => setActiveAdminStep(idx)}
                onMouseLeave={() => setActiveAdminStep(null)}
                className={`py-2.5 px-2 transition-all duration-200 cursor-pointer outline-none ${
                  isHovered ? 'bg-[#6DB8F5]/5 text-[#E8EEF5] pl-3' : 'text-[#A7B5C7]'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-[#6DB8F5] shrink-0">{item.step}</span>
                    <span className="font-mono text-xs sm:text-sm font-bold text-[#E8EEF5]">{item.label}</span>
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
