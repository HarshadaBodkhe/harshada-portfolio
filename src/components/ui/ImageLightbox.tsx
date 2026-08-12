import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export interface GalleryItem {
  id: string;
  title: string;
  src: string;
}

export interface ImageLightboxProps {
  items: GalleryItem[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  items,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  const [imgError, setImgError] = useState(false);
  const currentItem = items[currentIndex];

  useEffect(() => {
    setImgError(false);
  }, [currentIndex]);

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    onNavigate(prevIndex);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % items.length;
    onNavigate(nextIndex);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [currentIndex, items.length]);

  if (!currentItem) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-6 select-none transition-opacity duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
    >
      {/* Container - stops propagation so clicking image/controls doesn't close viewer */}
      <div
        className="relative w-full max-w-5xl flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar: Counter & Close Button */}
        <div className="w-full flex items-center justify-between px-1 sm:px-2 mb-3">
          <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-[var(--accent)] bg-[var(--bg-secondary)] px-3 py-1 rounded-full border border-[var(--border-subtle)] shadow-sm">
            {currentIndex + 1} / {items.length}
          </span>

          <button
            onClick={onClose}
            aria-label="Close"
            className="p-2 rounded-full bg-[var(--bg-secondary)] hover:bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[var(--accent)] transition-all shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Viewing Stage: Previous Button - Image Container - Next Button */}
        <div className="relative w-full flex items-center justify-between gap-3 sm:gap-6">
          {/* Desktop Previous Button */}
          <button
            onClick={handlePrev}
            aria-label="Previous image"
            className="hidden sm:flex items-center justify-center shrink-0 w-11 h-11 rounded-full bg-[var(--bg-secondary)] hover:bg-[var(--bg-surface)] text-[var(--text-primary)] hover:text-[var(--accent)] border border-[var(--border-subtle)] hover:border-[var(--accent)] shadow-lg transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Center Image Frame */}
          <div className="flex-1 flex flex-col items-center justify-center max-h-[72vh] sm:max-h-[78vh] w-full overflow-hidden rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-2 sm:p-3 shadow-2xl">
            {!imgError ? (
              <img
                key={currentItem.id}
                src={currentItem.src}
                alt={currentItem.title}
                onError={() => setImgError(true)}
                className="max-h-[62vh] sm:max-h-[70vh] w-auto h-auto max-w-full object-contain rounded-lg transition-opacity duration-200"
              />
            ) : (
              <div className="p-8 text-center font-mono text-xs text-[var(--text-muted)]">
                Image preview unavailable
              </div>
            )}
            <p className="font-mono text-xs sm:text-sm font-medium text-[var(--text-primary)] text-center mt-2.5 px-3 py-1 truncate max-w-full">
              {currentItem.title}
            </p>
          </div>

          {/* Desktop Next Button */}
          <button
            onClick={handleNext}
            aria-label="Next image"
            className="hidden sm:flex items-center justify-center shrink-0 w-11 h-11 rounded-full bg-[var(--bg-secondary)] hover:bg-[var(--bg-surface)] text-[var(--text-primary)] hover:text-[var(--accent)] border border-[var(--border-subtle)] hover:border-[var(--accent)] shadow-lg transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation Controls (Touch friendly below image) */}
        <div className="flex sm:hidden items-center justify-center gap-6 mt-4 w-full">
          <button
            onClick={handlePrev}
            aria-label="Previous image"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-subtle)] active:scale-95 text-xs font-mono font-semibold"
          >
            <ChevronLeft className="w-4 h-4 text-[var(--accent)]" />
            <span>Previous</span>
          </button>
          <button
            onClick={handleNext}
            aria-label="Next image"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-subtle)] active:scale-95 text-xs font-mono font-semibold"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4 text-[var(--accent)]" />
          </button>
        </div>
      </div>
    </div>
  );
};
