import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ShoppingCart, Lock, CreditCard, RefreshCw, Mail, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CART_PROPERTIES = [
  { key: '_id', type: 'String', desc: 'Unique MongoDB ObjectIdentifier for pizza item' },
  { key: 'name', type: 'String', desc: 'Display title of selected pizza' },
  { key: 'imageUrl', type: 'String', desc: 'Asset URI for item thumbnail rendering' },
  { key: 'price', type: 'Number', desc: 'Unit cost corresponding to selected variant size' },
  { key: 'size', type: 'String', desc: 'Portion metric ("Small" | "Medium" | "Large")' },
  { key: 'qty', type: 'Number', desc: 'Selected item quantity count' },
];

const ORDER_STATUS_STEPS = [
  { status: 'Pending', desc: 'Order initialized, payment authorized' },
  { status: 'Processing', desc: 'Kitchen preparing pizza order' },
  { status: 'Out for Delivery', desc: 'Dispatched with courier' },
  { status: 'Delivered', desc: 'Order handed over & completed' },
];

export const SliceItECommerceEngine: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCartProp, setActiveCartProp] = useState<number | null>(null);

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
    <div className="w-full max-w-[880px] space-y-12 pb-10 border-b border-[#1B3047]/40" ref={containerRef}>
      {/* 1. CART ARCHITECTURE */}
      <div className="space-y-4">
        <div>
          <span className="font-mono text-xs font-semibold tracking-[0.2em] text-[#6DB8F5] uppercase block mb-1">
            CLIENT STATE STORAGE
          </span>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#E8EEF5]">
            Cart Architecture &amp; Persistence Flow
          </h2>
        </div>

        {/* Cart Flow Banner */}
        <div className="p-3 bg-[#030914] border border-[#1B3047]/40 rounded-md font-mono text-xs flex flex-wrap items-center gap-2 text-[#A7B5C7]">
          <ShoppingCart className="w-4 h-4 text-[#6DB8F5] shrink-0" />
          <span className="px-2 py-0.5 rounded bg-[#060c18] border border-[#1B3047] text-[#E8EEF5]">Add to Cart</span>
          <ArrowRight className="w-3 h-3 text-[#6DB8F5]" />
          <span className="px-2 py-0.5 rounded bg-[#060c18] border border-[#1B3047] text-[#E8EEF5]">addToCart thunk</span>
          <ArrowRight className="w-3 h-3 text-[#6DB8F5]" />
          <span className="px-2 py-0.5 rounded bg-[#060c18] border border-[#1B3047] text-[#E8EEF5]">GET /api/pizzas/:id</span>
          <ArrowRight className="w-3 h-3 text-[#6DB8F5]" />
          <span className="px-2 py-0.5 rounded bg-[#6DB8F5]/10 text-[#6DB8F5] font-bold">Redux cart state</span>
          <ArrowRight className="w-3 h-3 text-[#6DB8F5]" />
          <span className="px-2 py-0.5 rounded bg-[#060c18] border border-[#1B3047] text-[#E8EEF5]">localStorage</span>
        </div>

        {/* Cart Item Payload Structure */}
        <div className="border-t border-[#1B3047]/40 font-mono text-xs divide-y divide-[#1B3047]/30">
          {CART_PROPERTIES.map((prop, idx) => (
            <div
              key={prop.key}
              onMouseEnter={() => setActiveCartProp(idx)}
              onMouseLeave={() => setActiveCartProp(null)}
              className={`py-2 px-2 transition-colors duration-150 ${
                activeCartProp === idx ? 'bg-[#6DB8F5]/5 text-[#E8EEF5]' : 'text-[#A7B5C7]'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-[#E8EEF5]">{prop.key}</span>
                  <span className="text-[10px] text-[#6DB8F5] font-mono uppercase px-1.5 py-0.5 bg-[#030914] rounded border border-[#1B3047]/40">
                    {prop.type}
                  </span>
                </div>
                <span className="font-sans text-xs text-[#A7B5C7]/80">{prop.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. AUTHENTICATION & ADMIN AUTHORIZATION */}
      <div className="space-y-4">
        <div>
          <span className="font-mono text-xs font-semibold tracking-[0.2em] text-[#6DB8F5] uppercase block mb-1">
            SECURITY PIPELINE
          </span>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#E8EEF5]">
            JWT Authentication &amp; Role-Based Authorization
          </h2>
        </div>

        {/* Auth Pipeline Banner */}
        <div className="p-3 bg-[#030914] border border-[#1B3047]/40 rounded-md font-mono text-xs flex flex-wrap items-center gap-2 text-[#A7B5C7]">
          <Lock className="w-4 h-4 text-[#6DB8F5] shrink-0" />
          <span className="px-2 py-0.5 rounded bg-[#060c18] text-[#E8EEF5]">User Login</span>
          <ArrowRight className="w-3 h-3 text-[#6DB8F5]" />
          <span className="px-2 py-0.5 rounded bg-[#060c18] text-[#E8EEF5]">bcrypt verify</span>
          <ArrowRight className="w-3 h-3 text-[#6DB8F5]" />
          <span className="px-2 py-0.5 rounded bg-[#6DB8F5]/10 text-[#6DB8F5] font-bold">JWT Token</span>
          <ArrowRight className="w-3 h-3 text-[#6DB8F5]" />
          <span className="px-2 py-0.5 rounded bg-[#060c18] text-[#E8EEF5]">
            Authorization: Bearer &lt;token&gt;
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-xs text-[#A7B5C7]/90 leading-relaxed pt-1">
          <div className="space-y-1">
            <h3 className="font-mono text-xs sm:text-sm font-bold text-[#E8EEF5]">User Authentication</h3>
            <p className="text-xs sm:text-sm text-[#A7B5C7]/80">
              Validates credentials against MongoDB user collections via bcrypt hashing and attaches a signed JSON Web Token to subsequent client requests.
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="font-mono text-xs sm:text-sm font-bold text-[#E8EEF5]">Admin Authorization</h3>
            <p className="text-xs sm:text-sm text-[#A7B5C7]/80">
              Middlewares verify the decoded JWT payload for <span className="font-mono text-[#6DB8F5]">isAdmin: true</span> claims before permitting catalog mutation or status updates.
            </p>
          </div>
        </div>
      </div>

      {/* 3. RAZORPAY PAYMENT SYSTEM INTEGRATION */}
      <div className="space-y-4">
        <div>
          <span className="font-mono text-xs font-semibold tracking-[0.2em] text-[#6DB8F5] uppercase block mb-1">
            PAYMENT ORCHESTRATION
          </span>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#E8EEF5]">
            Razorpay Gateway Integration Workflow
          </h2>
        </div>

        {/* Razorpay Flow */}
        <div className="p-4 bg-[#030914] border border-[#1B3047]/50 rounded-md font-mono text-xs space-y-3">
          <div className="flex items-center gap-2 text-[#E8EEF5] font-bold text-xs sm:text-sm">
            <CreditCard className="w-4 h-4 text-[#6DB8F5]" />
            <span>Two-Phase Payment &amp; Order Commitment Sequence:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-2 py-1 rounded bg-[#060c18] text-[#E8EEF5]">POST /api/orders/checkout</span>
            <ArrowRight className="w-3 h-3 text-[#6DB8F5]" />
            <span className="px-2 py-1 rounded bg-[#060c18] text-[#E8EEF5]">Razorpay API</span>
            <ArrowRight className="w-3 h-3 text-[#6DB8F5]" />
            <span className="px-2 py-1 rounded bg-[#6DB8F5]/10 text-[#6DB8F5] font-bold">Razorpay Order ID</span>
            <ArrowRight className="w-3 h-3 text-[#6DB8F5]" />
            <span className="px-2 py-1 rounded bg-[#060c18] text-[#E8EEF5]">Razorpay Checkout Modal</span>
            <ArrowRight className="w-3 h-3 text-[#6DB8F5]" />
            <span className="px-2 py-1 rounded bg-[#060c18] text-[#E8EEF5]">SliceIt Application Order</span>
          </div>

          <div className="pt-2 border-t border-[#1B3047]/40 text-[#E8EEF5]/90 font-sans text-xs sm:text-sm">
            <span className="font-mono text-xs font-bold text-[#6DB8F5] uppercase">ENGINEERING DECISION: </span>
            Separate the initial Razorpay Gateway transaction initialization from the final SliceIt database order record creation, ensuring database commits occur only after verified payment response metadata is received.
          </div>
        </div>
      </div>

      {/* 4. INVENTORY & ORDER MANAGEMENT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* INVENTORY FLOW */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-[#6DB8F5]" />
            <span className="font-mono text-xs font-bold text-[#E8EEF5] uppercase tracking-wider">
              INVENTORY DEDUCTION
            </span>
          </div>
          <div className="p-3 bg-[#030914] border border-[#1B3047]/40 rounded-md font-mono text-xs space-y-1.5 text-[#A7B5C7]">
            <div>1. Order Created</div>
            <div>2. Iterate cart pizza items</div>
            <div>3. Query pizza document by _id</div>
            <div>4. Deduct ordered quantity from stock</div>
            <div>5. Save updated stock count to MongoDB</div>
          </div>
        </div>

        {/* NODEMAILER EMAIL PIPELINE */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#6DB8F5]" />
            <span className="font-mono text-xs font-bold text-[#E8EEF5] uppercase tracking-wider">
              EMAIL NOTIFICATIONS
            </span>
          </div>
          <div className="p-3 bg-[#030914] border border-[#1B3047]/40 rounded-md font-mono text-xs space-y-1.5 text-[#A7B5C7]">
            <div>1. Order committed to database</div>
            <div>2. Retrieve authenticated customer email</div>
            <div>3. Construct HTML receipt template</div>
            <div>4. Dispatch via Nodemailer SMTP transport</div>
            <div>5. Customer receives confirmation receipt</div>
          </div>
        </div>
      </div>

      {/* 5. ORDER STATUS PROGRESSION */}
      <div className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold tracking-tight text-[#E8EEF5]">
          Order Fulfillment Status Progression
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
          {ORDER_STATUS_STEPS.map((step) => (
            <div key={step.status} className="p-3 bg-[#030914] border border-[#1B3047]/40 rounded space-y-1">
              <div className="flex items-center gap-1.5 text-[#6DB8F5] font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{step.status}</span>
              </div>
              <p className="font-sans text-[11px] text-[#A7B5C7]/80">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
