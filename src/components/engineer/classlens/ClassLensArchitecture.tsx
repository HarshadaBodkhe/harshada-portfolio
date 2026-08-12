import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Layers, Monitor, Cpu, Database, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface LayerNode {
  id: string;
  name: string;
  sublabel: string;
  detail: string;
  icon: React.FC<{ className?: string }>;
}

const LAYERS: LayerNode[] = [
  {
    id: 'experience',
    name: 'EXPERIENCE & GUIDANCE LAYER',
    sublabel: 'Landing Interface & Streamlit Dashboard',
    detail: 'Handles instructor login, student onboarding, and live biometric video feed.',
    icon: Monitor,
  },
  {
    id: 'application',
    name: 'APPLICATION & CONTROLLER LAYER',
    sublabel: 'Streamlit App & @st.cache_resource',
    detail: 'Manages app session state, caches ML models in memory, and triggers verification logic.',
    icon: Layers,
  },
  {
    id: 'biometric',
    name: 'BIOMETRIC RECOGNITION LAYER',
    sublabel: 'Face (dlib/SVM) & Voice (librosa/Resemblyzer)',
    detail: 'Extracts 128-D facial feature vectors and speaker acoustic embeddings for classification.',
    icon: Cpu,
  },
  {
    id: 'data',
    name: 'DATA & PERSISTENCE LAYER',
    sublabel: 'Supabase PostgreSQL Cloud Database',
    detail: 'Persists student metadata, 128-D vectors, subject rosters, and timestamped logs in Supabase.',
    icon: Database,
  },
];

export const ClassLensArchitecture: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeLayer, setActiveLayer] = useState<string | null>(null);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 20 },
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
    <div ref={containerRef} className="w-full max-w-[880px] space-y-6 pb-10 border-b border-[#1B3047]/40">
      <div className="space-y-1">
        <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#E8EEF5]">
          Layered Multimodal System Flow
        </h2>
        <p className="font-sans text-sm sm:text-base text-[#A7B5C7]/80">
          Hover any architectural layer node below to inspect component responsibilities.
        </p>
      </div>

      {/* Connected Architecture Diagram (Vertical Tree Flow with thin lines) */}
      <div className="py-4 space-y-3 font-mono text-xs max-w-2xl mx-auto">
        {LAYERS.map((layer, idx) => {
          const Icon = layer.icon;
          const isHovered = activeLayer === layer.id;
          const isOtherHovered = activeLayer !== null && !isHovered;

          return (
            <React.Fragment key={layer.id}>
              {/* Layer Node Bar */}
              <div
                onMouseEnter={() => setActiveLayer(layer.id)}
                onMouseLeave={() => setActiveLayer(null)}
                onFocus={() => setActiveLayer(layer.id)}
                onBlur={() => setActiveLayer(null)}
                tabIndex={0}
                className={`p-3 rounded-lg border transition-all duration-200 cursor-pointer outline-none ${
                  isHovered
                    ? 'bg-[#081224] border-[#6DB8F5] shadow-md shadow-[#6DB8F5]/10 scale-[1.01]'
                    : isOtherHovered
                    ? 'bg-[#030914]/50 border-[#1B3047]/30 opacity-40'
                    : 'bg-[#030914] border-[#1B3047]/60 opacity-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded bg-[#6DB8F5]/10 text-[#6DB8F5]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-[#6DB8F5] font-bold">0{idx + 1}</span>
                        <span className="font-bold text-[#E8EEF5] text-xs sm:text-sm">
                          {layer.name}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#A7B5C7]/70 font-sans block">
                        {layer.sublabel}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] text-[#6DB8F5]/80 font-mono italic hidden sm:inline">
                    {isHovered ? 'Active' : 'Inspect'}
                  </span>
                </div>

                {/* Revealed Explanation */}
                {isHovered && (
                  <p className="mt-2.5 pt-2 border-t border-[#1B3047]/50 font-sans text-xs text-[#A7B5C7] leading-relaxed animate-fadeIn">
                    {layer.detail}
                  </p>
                )}
              </div>

              {/* Connecting Down Arrow Line */}
              {idx < LAYERS.length - 1 && (
                <div className="flex justify-center py-0.5">
                  <div className="flex flex-col items-center">
                    <div className="w-px h-3 bg-[#6DB8F5]/40" />
                    <ChevronDown className="w-3 h-3 text-[#6DB8F5]/60 -mt-1" />
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
