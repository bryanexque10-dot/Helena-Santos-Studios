import React, { useState } from 'react';
import { PhotoCategory, PhotoItem } from '../types';
import { STUDIO_PHOTOS } from '../config/studioConfig';
import { SmartPhoto } from './SmartPhoto';
import { Lightbox } from './Lightbox';
import { Eye } from 'lucide-react';

interface GalleryProps {
  onSelectPhotoSession?: (sessionStyle: string) => void;
}

export const Gallery: React.FC<GalleryProps> = ({ onSelectPhotoSession }) => {
  const [activeCategory, setActiveCategory] = useState<PhotoCategory>('Todos');
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  const categories: PhotoCategory[] = ['Todos', 'Natureza', 'Estúdio', 'Retratos', 'Lifestyle'];

  const filteredPhotos = STUDIO_PHOTOS.filter((photo) => {
    if (activeCategory === 'Todos') return true;
    return photo.categories.includes(activeCategory as any);
  });

  const handleOpenPhoto = (photo: PhotoItem) => {
    setSelectedPhoto(photo);
  };

  const handleNavigate = (direction: 'next' | 'prev') => {
    if (!selectedPhoto) return;
    const currentIndex = filteredPhotos.findIndex((p) => p.id === selectedPhoto.id);
    if (currentIndex === -1) return;

    if (direction === 'next') {
      const nextIndex = (currentIndex + 1) % filteredPhotos.length;
      setSelectedPhoto(filteredPhotos[nextIndex]);
    } else {
      const prevIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
      setSelectedPhoto(filteredPhotos[prevIndex]);
    }
  };

  return (
    <section id="portfolio" className="py-16 lg:py-24 relative bg-[#0E0D0C]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Cabeçalho Limpo */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-xs tracking-widest uppercase font-semibold text-[#DDB7BD] block mb-2">
              Portfólio de Ensaios
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-medium text-[#FAF9F7] tracking-tight">
              Galeria Completa
            </h2>
          </div>

          {/* Abas de Categorias Discretas */}
          <div className="flex flex-wrap items-center gap-1 p-1 bg-[#181615] rounded-md border border-[#2D2825]">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-sm transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-[#FAF9F7] text-[#0E0D0C] font-semibold shadow-xs'
                      : 'text-[#B8ADA6] hover:text-[#FAF9F7]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid com as 9 Fotografias Reais */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredPhotos.map((photo) => {
            return (
              <div
                key={photo.id}
                onClick={() => handleOpenPhoto(photo)}
                className="group relative cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-[#181615] border border-[#2D2825] hover:border-[#DDB7BD]/50 flex flex-col"
              >
                {/* Imagem em proporção 9:16 nativa */}
                <div className="relative aspect-[9/14] w-full overflow-hidden bg-[#161413]">
                  <SmartPhoto
                    photo={photo}
                    showCaption={false}
                    className="w-full h-full"
                  />

                  {/* Hover Overlay com Informações */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 text-white pointer-events-none">
                    <div className="flex items-center justify-between text-xs">
                      <span className="px-2.5 py-1 bg-black/50 backdrop-blur-md rounded-xs text-[11px] font-medium tracking-wider uppercase text-[#DDB7BD] border border-white/10">
                        {photo.categories[0]}
                      </span>
                      <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                        <Eye className="w-4 h-4 text-white" />
                      </span>
                    </div>

                    <div>
                      <h3 className="font-serif-display text-lg font-medium leading-snug text-white mb-1">
                        {photo.title}
                      </h3>
                      <p className="text-xs text-[#B8ADA6] line-clamp-2">
                        {photo.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Legenda simples e discreta */}
                <div className="p-4 bg-[#181615] flex items-center justify-between gap-3 border-t border-[#2D2825]">
                  <div className="min-w-0">
                    <h4 className="font-serif-display text-sm font-medium text-[#FAF9F7] truncate group-hover:text-[#DDB7BD] transition-colors">
                      {photo.title}
                    </h4>
                    <p className="text-[11px] text-[#B8ADA6] truncate">
                      {photo.lighting}
                    </p>
                  </div>
                  <span className="text-[10px] tracking-wider uppercase font-semibold text-[#DDB7BD] px-2 py-0.5 bg-[#201D1B] border border-[#2D2825] rounded-xs shrink-0">
                    {photo.categories[0]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        photo={selectedPhoto}
        photosList={filteredPhotos}
        onClose={() => setSelectedPhoto(null)}
        onNavigate={handleNavigate}
        onSelectSession={(categoryName) => {
          setSelectedPhoto(null);
          if (onSelectPhotoSession) {
            onSelectPhotoSession(categoryName);
          }
        }}
      />
    </section>
  );
};
