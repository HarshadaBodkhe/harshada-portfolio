import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Key, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface TableInfo {
  id: string;
  name: string;
  desc: string;
  columns: { name: string; type: string; isPk?: boolean; isFk?: boolean }[];
}

const TABLES: TableInfo[] = [
  {
    id: 'students',
    name: 'STUDENTS',
    desc: 'Registered student identities, credentials, and biometric embeddings.',
    columns: [
      { name: 'student_id', type: 'UUID', isPk: true },
      { name: 'full_name', type: 'VARCHAR' },
      { name: 'face_embedding', type: 'FLOAT8[]' },
      { name: 'voice_embedding', type: 'FLOAT8[]' },
      { name: 'created_at', type: 'TIMESTAMPTZ' },
    ],
  },
  {
    id: 'subjects',
    name: 'SUBJECTS',
    desc: 'Course offerings, subject codes, and department mappings.',
    columns: [
      { name: 'subject_code', type: 'VARCHAR', isPk: true },
      { name: 'subject_name', type: 'VARCHAR' },
      { name: 'department', type: 'VARCHAR' },
    ],
  },
  {
    id: 'enrollment',
    name: 'ENROLLMENT',
    desc: 'Junction table linking registered students to subject codes.',
    columns: [
      { name: 'enrollment_id', type: 'UUID', isPk: true },
      { name: 'student_id', type: 'UUID', isFk: true },
      { name: 'subject_code', type: 'VARCHAR', isFk: true },
      { name: 'enrolled_at', type: 'TIMESTAMPTZ' },
    ],
  },
  {
    id: 'attendance',
    name: 'ATTENDANCE',
    desc: 'Timestamped logs of validated biometric attendance records.',
    columns: [
      { name: 'record_id', type: 'UUID', isPk: true },
      { name: 'student_id', type: 'UUID', isFk: true },
      { name: 'subject_code', type: 'VARCHAR', isFk: true },
      { name: 'date', type: 'DATE' },
      { name: 'timestamp', type: 'TIMESTAMPTZ' },
      { name: 'status', type: 'VARCHAR' },
    ],
  },
];

export const ClassLensDataArchitecture: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredTable, setHoveredTable] = useState<string | null>(null);

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
          Supabase Relational Database Schema
        </h2>
        <p className="font-sans text-sm sm:text-base text-[#A7B5C7]/80">
          Hover any database table node below to inspect schema fields and relationships.
        </p>
      </div>

      {/* Clean Open Relationship Table Flow (No heavy rounded cards!) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
        {TABLES.map((table) => {
          const isHovered = hoveredTable === table.id;
          const isOtherHovered = hoveredTable !== null && !isHovered;

          return (
            <div
              key={table.id}
              onMouseEnter={() => setHoveredTable(table.id)}
              onMouseLeave={() => setHoveredTable(null)}
              onFocus={() => setHoveredTable(table.id)}
              onBlur={() => setHoveredTable(null)}
              tabIndex={0}
              className={`p-3 rounded transition-all duration-200 cursor-pointer outline-none border ${
                isHovered
                  ? 'border-[#6DB8F5] bg-[#081224] scale-[1.02]'
                  : isOtherHovered
                  ? 'border-[#1B3047]/30 bg-[#030914]/60 opacity-40'
                  : 'border-[#1B3047]/60 bg-[#030914] opacity-100'
              }`}
            >
              <div className="flex items-center justify-between pb-1.5 border-b border-[#1B3047]/40 mb-2">
                <span className="font-bold text-[#E8EEF5] text-xs">{table.name}</span>
                <span className="text-[9px] text-[#6DB8F5]">Relational</span>
              </div>
              <p className="font-sans text-[11px] text-[#A7B5C7]/80 leading-tight mb-2">
                {table.desc}
              </p>

              {/* Columns List */}
              <div className="space-y-1 text-[10px]">
                {table.columns.map((col) => (
                  <div key={col.name} className="flex items-center justify-between py-0.5 border-b border-[#1B3047]/20">
                    <div className="flex items-center gap-1">
                      {col.isPk && <Key className="w-2.5 h-2.5 text-[#6DB8F5]" />}
                      {col.isFk && <ArrowRight className="w-2.5 h-2.5 text-[#A7B5C7]/70" />}
                      <span className="text-[#E8EEF5]">{col.name}</span>
                    </div>
                    <span className="text-[#6DB8F5]/70 text-[9px]">{col.type}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
