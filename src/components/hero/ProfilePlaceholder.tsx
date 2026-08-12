import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { User } from 'lucide-react';

interface ProfilePlaceholderProps {
  imageSrc?: string;
  altText?: string;
}

export const ProfilePlaceholder: React.FC<ProfilePlaceholderProps> = ({
  imageSrc,
  altText = 'Harshada Bodkhe',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const floatWrapperRef = useRef<HTMLDivElement>(null);
  const [imageShift, setImageShift] = useState({ x: 0, y: 0, scale: 1 });

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Initial Profile Entrance (opacity: 0->1, x: 40px->0, scale: 0.96->1.0)
      const tl = gsap.timeline({
        delay: 0.8,
        onComplete: () => {
          // 2. Continuous smooth vertical UP AND DOWN floating motion ONLY (lively & smooth float)
          gsap.to(floatWrapperRef.current, {
            y: -16,
            duration: 3.8,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        },
      });

      tl.fromTo(
        containerRef.current,
        { opacity: 0, x: 40, scale: 0.96 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.8,
          ease: 'power3.out',
        }
      );
    });

    return () => ctx.revert();
  }, []);

  // Desktop subtle cursor tracking shift (no tilt or rotation)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return;
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const relativeX = e.clientX - rect.left - rect.width / 2;
    const relativeY = e.clientY - rect.top - rect.height / 2;

    const shiftX = (relativeX / (rect.width / 2)) * 6;
    const shiftY = (relativeY / (rect.height / 2)) * 6;

    setImageShift({ x: shiftX, y: shiftY, scale: 1.02 });
  };

  const handleMouseLeave = () => {
    setImageShift({ x: 0, y: 0, scale: 1 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[150px] sm:max-w-[210px] lg:max-w-[280px] aspect-[4/5] mx-auto cursor-pointer group"
    >
      {/* CONTINUOUS FLOATING WRAPPER (UP AND DOWN) */}
      <div ref={floatWrapperRef} className="w-full h-full relative">
        {/* SOFT BACKGROUND LIGHT EFFECT (Ambient Glow Halo) */}
        <div className="absolute -inset-4 rounded-[2.5rem] bg-[#6DB8F5]/20 blur-2xl opacity-75 pointer-events-none transition-opacity duration-500 group-hover:opacity-100 animate-pulse" />

        {/* PHOTO CONTAINER WITH ENHANCED CORNER CURVE */}
        <div className="relative w-full h-full rounded-[2rem] overflow-hidden flex items-center justify-center">
          
          {/* INNER IMAGE VIEWPORT */}
          <div className="relative w-full h-full rounded-[2rem] overflow-hidden flex items-center justify-center">
            <div
              className="w-full h-full transition-transform duration-300 ease-out"
              style={{
                transform: `translate3d(${imageShift.x}px, ${imageShift.y}px, 0px) scale(${imageShift.scale})`,
                willChange: 'transform',
              }}
            >
              {imageSrc ? (
                <img
                  src={imageSrc}
                  alt={altText}
                  className="w-full h-full object-cover rounded-[2rem]"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center rounded-[2rem] bg-[#050E1E] text-[#A7B5C7]">
                  <User className="w-8 h-8 text-[#6DB8F5]" />
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
