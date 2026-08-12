import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Image as ImageIcon, Maximize2 } from 'lucide-react';
import { ImageLightbox } from '../../ui/ImageLightbox';

gsap.registerPlugin(ScrollTrigger);

interface GalleryItem {
  id: string;
  title: string;
  src: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'dwello-ui-1',
    title: 'Property Search & Filtering View',
    src: '/projects/dwello/search.png',
  },
  {
    id: 'dwello-ui-2',
    title: 'Property Listing Showcase',
    src: '/projects/dwello/listing.png',
  },
  {
    id: 'dwello-ui-3',
    title: 'Booking & Reservation Modal',
    src: '/projects/dwello/booking.png',
  },
  {
    id: 'dwello-ui-4',
    title: 'User Profile & Hosting Dashboard',
    src: '/projects/dwello/account.png',
  },
];

export const DwelloGallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [errorState, setErrorState] = useState<Record<string, boolean>>({});

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
    <div ref={containerRef} className="w-full max-w-[880px] space-y-3">
      <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#E8EEF5]">
        Media Gallery
      </h2>

      {/* Compact Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {GALLERY_ITEMS.map((item, idx) => {
          const hasError = errorState[item.id];
          return (
            <div
              key={item.id}
              onClick={() => setSelectedIndex(idx)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setSelectedIndex(idx);
                }
              }}
              className="group relative w-full aspect-[4/3] rounded-lg overflow-hidden cursor-pointer bg-[#050b16] border border-[#1B3047]/50 hover:border-[#6DB8F5]/40 transition-colors duration-200 outline-none focus:ring-1 focus:ring-[#6DB8F5]"
            >
              {!hasError ? (
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
                  onError={() => setErrorState((prev) => ({ ...prev, [item.id]: true }))}
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center bg-[#050b16]">
                  <ImageIcon className="w-3.5 h-3.5 text-[#6DB8F5] mb-1" />
                  <span className="font-mono text-[9px] text-[#A7B5C7]/70 truncate max-w-full">
                    {item.title}
                  </span>
                </div>
              )}

              <div className="absolute inset-0 bg-[#020711]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <Maximize2 className="w-4 h-4 text-[#6DB8F5]" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal with Next/Previous Navigation */}
      {selectedIndex !== null && (
        <ImageLightbox
          items={GALLERY_ITEMS}
          currentIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
          onNavigate={(newIndex) => setSelectedIndex(newIndex)}
        />
      )}
    </div>
  );
};
