import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { DocumentPreview } from './DocumentPreview';

export interface InternshipDocumentsProps {
  offerLetterImage?: string;
  certificateImage?: string;
  className?: string;
}

interface ActiveDocument {
  title: string;
  image: string;
  altText: string;
}

export const InternshipDocuments: React.FC<InternshipDocumentsProps> = ({
  offerLetterImage = '/offer_letter.png',
  certificateImage = '/certificate.png',
  className = '',
}) => {
  const [activeDoc, setActiveDoc] = useState<ActiveDocument | null>(null);

  // Close modal on Escape key press and manage scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDoc(null);
      }
    };

    if (activeDoc) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [activeDoc]);

  return (
    <div className={`relative flex flex-col items-center lg:items-start ${className}`}>
      {/* Evidence Header Label */}
      <span className="text-[11px] font-mono tracking-widest text-[var(--text-muted)] uppercase mb-4 text-center lg:text-left">
        INTERNSHIP EVIDENCE
      </span>

      {/* Visual Stage for Overlapping Documents */}
      <div className="document-stage group relative w-[270px] sm:w-[290px] h-[340px] sm:h-[360px] select-none">
        {/* Offer Letter Preview (Top Left, z-10) */}
        <div
          onClick={() =>
            setActiveDoc({
              title: 'OFFER LETTER',
              image: offerLetterImage,
              altText: 'Offer Letter from Oasis Infobyte',
            })
          }
          className="absolute left-[15px] top-[15px] z-10 transition-all duration-500 ease-out -rotate-[3deg] group-hover:-rotate-[7deg] group-hover:scale-[1.02] hover:!z-30 hover:!scale-[1.04] hover:!brightness-110 origin-center cursor-pointer"
        >
          <DocumentPreview
            title="OFFER LETTER"
            image={offerLetterImage}
            altText="Offer Letter from Oasis Infobyte"
            className="hover:border-[#6DB8F5]/60 hover:shadow-[0_25px_60px_rgba(109,184,245,0.25)]"
          />
        </div>

        {/* Certificate Preview (Bottom Right, z-20) */}
        <div
          onClick={() =>
            setActiveDoc({
              title: 'INTERNSHIP CERTIFICATE',
              image: certificateImage,
              altText: 'Internship Certificate from Oasis Infobyte',
            })
          }
          className="absolute left-[60px] sm:left-[65px] top-[65px] sm:top-[75px] z-20 transition-all duration-500 ease-out rotate-[3deg] group-hover:rotate-[7deg] group-hover:scale-[1.02] hover:!z-30 hover:!scale-[1.04] hover:!brightness-110 origin-center cursor-pointer"
        >
          <DocumentPreview
            title="INTERNSHIP CERTIFICATE"
            image={certificateImage}
            altText="Internship Certificate from Oasis Infobyte"
            className="hover:border-[#6DB8F5]/60 hover:shadow-[0_25px_60px_rgba(109,184,245,0.25)]"
          />
        </div>
      </div>

      {/* MINIMAL LIGHTBOX MODAL */}
      {activeDoc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-md transition-all duration-300"
          onClick={() => setActiveDoc(null)}
        >
          {/* Floating Small X Close Button */}
          <button
            onClick={() => setActiveDoc(null)}
            className="fixed top-5 right-5 sm:top-8 sm:right-8 z-50 p-2 text-[var(--text-primary)] hover:text-white bg-[var(--bg-secondary)] hover:bg-[var(--bg-surface)] rounded-full border border-[var(--border-subtle)] transition-all shadow-xl cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Compact Opened Image Preview (Reduced size, clean backdrop) */}
          <img
            src={activeDoc.image}
            alt={activeDoc.altText}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[48vh] max-w-[360px] sm:max-w-[400px] w-auto h-auto object-contain rounded-lg shadow-2xl select-none"
          />
        </div>
      )}
    </div>
  );
};
