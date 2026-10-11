import React, { useEffect } from 'react';
import { PhotoItem } from '../types';
import { X, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';
import { buildWhatsAppLink } from '../config/studioConfig';
import { useStudioPhotos } from '../context/PhotoContext';

interface LightboxProps {
  photo: PhotoItem | null;
  photosList: PhotoItem[];
  onClose: () => void;
  onNavigate: (direction: 'next' | 'prev') => void;
  onSelectSession: (categoryName: string) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  photo,
  photosList,
  onClose,
  onNavigate,
  onSelectSession,
}) => {
  const { userUploadedImages } = useStudioPhotos();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        onNavigate('next');
      } else if (e.key === 'ArrowLeft') {
        onNavigate('prev');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, onNavigate]);

  if (!photo) return null;

  const customImage = userUploadedImages[photo.id];
  const imageSource = customImage || photo.primaryPath || `/photos/foto-${photo.id}.jpg`;
  const currentIndex = photosList.findIndex((p) => p.id === photo.id);
  const totalCount = photosList.length;

  const whatsappInquiry = buildWhatsAppLink(
    `Olá! Me encantei pela fotografia "${photo.title}" no site do Helena Ensaio Studios e gostaria de planejar um ensaio com essa proposta.`
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Visualização de ${photo.title}`}
    >
      {/* Barra superior minimalista */}
      <div className="absolute top-0 inset-x-0 p-4 sm:p-6 flex items-center justify-between z-20 pointer-events-auto">
        <div className="text-white/80 text-xs sm:text-sm font-medium tracking-wider">
          <span className="font-serif-display text-white text-base mr-2">Helena Ensaio Studios</span>
          <span className="text-white/40">|</span>
          <span className="ml-2 text-[#DDB7BD]">
            {(currentIndex + 1).toString().padStart(2, '0')} / {totalCount.toString().padStart(2, '0')}
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors focus:outline-hidden"
          aria-label="Fechar (Esc)"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Navegação Anterior */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate('prev');
        }}
        className="absolute left-3 sm:left-6 z-20 p-3 sm:p-4 rounded-full bg-black/50 hover:bg-black/80 text-white/90 hover:text-white transition-all transform hover:scale-105 border border-white/10"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
      </button>

      {/* Navegação Próxima */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate('next');
        }}
        className="absolute right-3 sm:right-6 z-20 p-3 sm:p-4 rounded-full bg-black/50 hover:bg-black/80 text-white/90 hover:text-white transition-all transform hover:scale-105 border border-white/10"
        aria-label="Próxima"
      >
        <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
      </button>

      {/* Conteúdo Central */}
      <div
        className="relative max-w-6xl w-full h-[90vh] mx-auto p-4 sm:p-8 flex flex-col lg:flex-row items-center justify-center gap-6 z-10 pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Enquadramento da Fotografia */}
        <div className="relative max-h-[75vh] lg:max-h-[85vh] max-w-full flex items-center justify-center overflow-hidden rounded-lg shadow-2xl bg-[#141211] border border-[#2D2825]">
          <img
            src={imageSource}
            alt={photo.title}
            className="max-h-[75vh] lg:max-h-[85vh] w-auto max-w-full object-contain rounded-lg"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Painel Lateral */}
        <div className="w-full lg:w-96 bg-[#171514] text-[#FAF9F7] p-6 sm:p-7 rounded-xl shadow-2xl flex flex-col justify-between shrink-0 max-h-[85vh] overflow-y-auto border border-[#2D2825]">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#DDB7BD] font-semibold mb-2">
              <span>{photo.categories.join(' · ')}</span>
            </div>

            <h3 className="font-serif-display text-2xl font-medium text-[#FAF9F7] leading-snug mb-2">
              {photo.title}
            </h3>

            <p className="text-sm text-[#B8ADA6] font-normal leading-relaxed mb-6">
              {photo.description}
            </p>

            <div className="space-y-3 pt-4 border-t border-[#2D2825] text-xs text-[#B8ADA6]">
              <div className="flex items-center justify-between">
                <span className="font-medium text-[#FAF9F7]">Iluminação:</span>
                <span className="text-right">{photo.lighting}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-[#FAF9F7]">Locação:</span>
                <span className="text-right">{photo.location}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#2D2825]">
            <a
              href={whatsappInquiry.url}
              target={whatsappInquiry.isConfigured ? '_blank' : undefined}
              rel="noopener noreferrer"
              onClick={() => {
                if (!whatsappInquiry.isConfigured) {
                  onClose();
                  onSelectSession(photo.categories[0]);
                }
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs tracking-wider uppercase font-semibold text-[#0E0D0C] bg-[#FAF9F7] hover:bg-[#E8D8C8] transition-colors rounded-sm shadow-md"
            >
              <MessageSquare className="w-4 h-4 text-[#65524B]" />
              <span>Agendar este estilo</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
