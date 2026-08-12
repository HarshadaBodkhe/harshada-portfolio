import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Camera, Mic, Cpu, Binary, CheckCircle2, Sliders, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface StageInfo {
  id: string;
  name: string;
  tech: string;
  detail?: string;
}

const FACE_STAGES: StageInfo[] = [
  {
    id: 'detection',
    name: 'FACE DETECTION',
    tech: 'dlib HOG / OpenCV',
    detail: 'dlib HOG face detector and OpenCV locate facial boundaries within input video frames.',
  },
  {
    id: 'landmarks',
    name: 'FACIAL LANDMARKS',
    tech: 'dlib 68-Point Predictor',
    detail: 'Identifies 68 facial landmark coordinates across eyes, nose, mouth, and chin contour.',
  },
  {
    id: 'encoding',
    name: 'FACE ENCODING',
    tech: 'face_recognition_models',
    detail: 'Deep metric model computes facial measurements into a numerical feature vector.',
  },
  {
    id: 'embedding',
    name: '128-D EMBEDDING',
    tech: 'NumPy Vector (128 floats)',
    detail: 'Transforms image into a 128-dimensional floating-point array representing identity.',
  },
  {
    id: 'classifier',
    name: 'SVM CLASSIFIER',
    tech: 'scikit-learn (SVC)',
    detail: 'Support Vector Classifier maps embedding vector against enrolled student embeddings.',
  },
  {
    id: 'identity',
    name: 'STUDENT IDENTITY',
    tech: 'Student ID Output',
    detail: 'Outputs verified Student ID for subject validation and attendance log entry.',
  },
];

const VOICE_STAGES: StageInfo[] = [
  { id: 'v-input', name: 'VOICE INPUT', tech: 'Audio Stream' },
  { id: 'v-processing', name: 'AUDIO PROCESSING', tech: 'librosa' },
  { id: 'v-embedding', name: 'VOICE EMBEDDING', tech: 'Resemblyzer' },
  { id: 'v-recognition', name: 'VOICE RECOGNITION', tech: 'Cosine Similarity' },
  { id: 'v-identity', name: 'STUDENT IDENTITY', tech: 'Student ID Output' },
];

export const ClassLensPipelines: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeFaceStage, setActiveFaceStage] = useState<string | null>(null);
  const [multimodalFocus, setMultimodalFocus] = useState<'face' | 'voice' | 'identity' | null>(null);

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
    <div ref={containerRef} className="w-full max-w-[880px] space-y-16 pb-10 border-b border-[#1B3047]/40">
      {/* 1. FACE RECOGNITION PIPELINE */}
      <div className="space-y-4">

        <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#E8EEF5]">
          Facial Feature Extraction &amp; Embedding Stream
        </h2>
        <p className="font-sans text-sm sm:text-base text-[#A7B5C7]/80">
          Hover any stage along the pipeline stream to inspect the underlying machine learning logic.
        </p>

        {/* Connected Horizontal Flow Stream (No rounded cards!) */}
        <div className="py-2 overflow-x-auto horizontal-scrollbar-thin">
          <div className="flex items-center gap-2 min-w-[700px] font-mono text-xs">
            {FACE_STAGES.map((stage, idx) => {
              const isHovered = activeFaceStage === stage.id;
              return (
                <React.Fragment key={stage.id}>
                  <div
                    onMouseEnter={() => setActiveFaceStage(stage.id)}
                    onMouseLeave={() => setActiveFaceStage(null)}
                    onFocus={() => setActiveFaceStage(stage.id)}
                    onBlur={() => setActiveFaceStage(null)}
                    tabIndex={0}
                    className={`py-2 px-3 rounded cursor-pointer transition-all duration-200 outline-none flex-1 border ${
                      isHovered
                        ? 'border-[#6DB8F5] bg-[#081224] text-[#E8EEF5] scale-[1.03]'
                        : 'border-[#1B3047]/50 bg-[#030914] text-[#A7B5C7]'
                    }`}
                  >
                    <span className="text-[9px] font-bold text-[#6DB8F5] block">0{idx + 1}</span>
                    <span className="font-bold text-[11px] block leading-tight truncate">{stage.name}</span>
                    <span className="text-[9px] text-[#A7B5C7]/60 block mt-1 border-t border-[#1B3047]/30 pt-0.5">
                      {stage.tech}
                    </span>
                  </div>
                  {idx < FACE_STAGES.length - 1 && (
                    <ArrowRight className="w-3.5 h-3.5 text-[#6DB8F5]/50 shrink-0" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Revealed Detail Banner */}
        <div className="pt-2 font-sans text-xs min-h-[44px]">
          {activeFaceStage ? (
            <div className="flex items-start gap-2 text-[#E8EEF5]">
              <Cpu className="w-4 h-4 text-[#6DB8F5] shrink-0 mt-0.5" />
              <div>
                <span className="font-mono font-bold text-xs text-[#6DB8F5] mr-2">
                  {FACE_STAGES.find((s) => s.id === activeFaceStage)?.name}:
                </span>
                <span className="text-[#A7B5C7]">
                  {FACE_STAGES.find((s) => s.id === activeFaceStage)?.detail}
                </span>
              </div>
            </div>
          ) : (
            <span className="font-mono text-xs text-[#A7B5C7]/60 italic">
              Hover any stage node above to view implementation details.
            </span>
          )}
        </div>
      </div>

      {/* 2. 128-D EMBEDDING & SVM EXPLANATION (Open Two-Column Editorial) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 font-mono text-xs">
        {/* Vector Representation */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#E8EEF5] font-bold">
            <Binary className="w-4 h-4 text-[#6DB8F5]" />
            <span>128-D Facial Embedding Vector</span>
          </div>
          <p className="font-sans text-xs text-[#A7B5C7]/80 leading-relaxed">
            Facial geometry is distilled into a 128-element floating-point array (`float64`) preserving identity representation.
          </p>
          <div className="p-2.5 rounded bg-[#030914] border border-[#1B3047]/50 text-[10px] text-[#6DB8F5] leading-tight space-y-1">
            <div className="text-[#A7B5C7]/50">// 128-D Vector Array Output</div>
            <div className="text-[#E8EEF5]">
              [ <span className="text-[#6DB8F5]">-0.142</span>, <span className="text-[#6DB8F5]">0.089</span>, <span className="text-[#6DB8F5]">0.512</span>, <span className="text-[#6DB8F5]">-0.043</span>, <span className="text-[#6DB8F5]">0.231</span>, ... ]
            </div>
          </div>
        </div>

        {/* SVM Rationale */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#E8EEF5] font-bold">
            <Sliders className="w-4 h-4 text-[#6DB8F5]" />
            <span>SVM Classifier Rationale</span>
          </div>
          <p className="font-sans text-xs text-[#A7B5C7]/80 leading-relaxed">
            Using a Linear Support Vector Machine on top of pretrained embeddings allows rapid, millisecond classifier updates when new students enroll, eliminating deep model retraining overhead.
          </p>
          <div className="text-[11px] text-[#E8EEF5] flex items-center justify-between p-2 rounded bg-[#030914] border border-[#1B3047]/40">
            <span>Embedding</span>
            <ArrowRight className="w-3 h-3 text-[#6DB8F5]" />
            <span className="text-[#6DB8F5] font-bold">Linear SVM</span>
            <ArrowRight className="w-3 h-3 text-[#6DB8F5]" />
            <span>Student ID</span>
          </div>
        </div>
      </div>

      {/* 3. VOICE RECOGNITION PIPELINE */}
      <div className="space-y-4 pt-4">

        <div className="overflow-x-auto py-1 horizontal-scrollbar-thin">
          <div className="flex items-center gap-2 min-w-[650px] font-mono text-xs">
            {VOICE_STAGES.map((stage, idx) => (
              <React.Fragment key={stage.id}>
                <div className="py-2 px-3 rounded border border-[#1B3047]/50 bg-[#030914] text-[#A7B5C7] flex-1">
                  <span className="text-[9px] font-bold text-[#6DB8F5] block">0{idx + 1}</span>
                  <span className="font-bold text-[11px] block leading-tight text-[#E8EEF5]">{stage.name}</span>
                  <span className="text-[9px] text-[#A7B5C7]/60 block mt-1 border-t border-[#1B3047]/30 pt-0.5">
                    {stage.tech}
                  </span>
                </div>
                {idx < VOICE_STAGES.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-[#6DB8F5]/50 shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* 4. MULTIMODAL VISUAL CONVERGENCE DIAGRAM */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-end">
          <span className="font-mono text-[10px] text-[#A7B5C7]/60 italic">
            Hover components to test pipeline muting
          </span>
        </div>

        <div className="py-4 font-mono text-xs space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* FACE */}
            <div
              onMouseEnter={() => setMultimodalFocus('face')}
              onMouseLeave={() => setMultimodalFocus(null)}
              className={`p-3 rounded border transition-all duration-300 cursor-pointer ${
                multimodalFocus === 'face'
                  ? 'border-[#6DB8F5] bg-[#081224] opacity-100'
                  : multimodalFocus === 'voice'
                  ? 'border-[#1B3047]/30 bg-[#030914] opacity-30'
                  : 'border-[#1B3047]/60 bg-[#030914] opacity-100'
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold text-[#E8EEF5]">
                <Camera className="w-3.5 h-3.5 text-[#6DB8F5]" />
                <span>FACE RECOGNITION</span>
              </div>
              <span className="text-[10px] text-[#A7B5C7]/70 font-sans block mt-0.5">
                OpenCV &bull; dlib &bull; SVM
              </span>
            </div>

            <div className="font-bold text-[#6DB8F5]">─────┐</div>

            {/* IDENTITY */}
            <div
              onMouseEnter={() => setMultimodalFocus('identity')}
              onMouseLeave={() => setMultimodalFocus(null)}
              className={`p-3.5 rounded border text-center transition-all duration-300 cursor-pointer ${
                multimodalFocus === 'identity'
                  ? 'border-[#6DB8F5] bg-[#6DB8F5]/15 opacity-100 shadow-md shadow-[#6DB8F5]/10'
                  : 'border-[#1B3047]/60 bg-[#030914] opacity-100'
              }`}
            >
              <div className="flex items-center justify-center gap-1.5 font-bold text-[#E8EEF5]">
                <CheckCircle2 className="w-4 h-4 text-[#6DB8F5]" />
                <span>STUDENT IDENTITY</span>
              </div>
              <span className="text-[10px] text-[#A7B5C7]/80 font-sans block mt-0.5">
                Validated Identity Output
              </span>
            </div>

            <div className="font-bold text-[#6DB8F5]">─────┘</div>

            {/* VOICE */}
            <div
              onMouseEnter={() => setMultimodalFocus('voice')}
              onMouseLeave={() => setMultimodalFocus(null)}
              className={`p-3 rounded border transition-all duration-300 cursor-pointer ${
                multimodalFocus === 'voice'
                  ? 'border-[#6DB8F5] bg-[#081224] opacity-100'
                  : multimodalFocus === 'face'
                  ? 'border-[#1B3047]/30 bg-[#030914] opacity-30'
                  : 'border-[#1B3047]/60 bg-[#030914] opacity-100'
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold text-[#E8EEF5]">
                <Mic className="w-3.5 h-3.5 text-[#6DB8F5]" />
                <span>VOICE RECOGNITION</span>
              </div>
              <span className="text-[10px] text-[#A7B5C7]/70 font-sans block mt-0.5">
                librosa &bull; Resemblyzer
              </span>
            </div>
          </div>

          {/* Convergence Output Stream */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-center text-[11px]">
            <span className="text-[#E8EEF5]">STUDENT IDENTITY</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#6DB8F5]" />
            <span className="text-[#E8EEF5]">ATTENDANCE VALIDATION</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#6DB8F5]" />
            <span className="text-[#6DB8F5] font-bold">SUPABASE ATTENDANCE RECORD</span>
          </div>
        </div>
      </div>
    </div>
  );
};
