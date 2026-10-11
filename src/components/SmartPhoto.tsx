import React, { useState } from 'react';
import { PhotoItem } from '../types';
import { Camera } from 'lucide-react';
import { useStudioPhotos } from '../context/PhotoContext';

interface SmartPhotoProps {
  photo: PhotoItem;
  className?: string;
  priority?: boolean;
  showCaption?: boolean;
  onClick?: () => void;
}

export const SmartPhoto: React.FC<SmartPhotoProps> = ({
  photo,
  className = '',
  priority = false,
  showCaption = false,
  onClick,
}) => {
  const { userUploadedImages } = useStudioPhotos();
  const [loadError, setLoadError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Prioriza as fotos reais que o usuário colocou!
  const customImage = userUploadedImages[photo.id];
  const imageSource = customImage || photo.primaryPath || `/photos/foto-${photo.id}.jpg`;

  return (
    <div
      className={`group relative overflow-hidden bg-[#181615] ${className}`}
      onClick={onClick}
    >
      {!loadError || customImage ? (
        <>
          <img
            key={imageSource}
            src={imageSource}
            alt={photo.title}
            loading={priority ? 'eager' : 'lazy'}
            referrerPolicy="no-referrer"
            onLoad={() => setIsLoaded(true)}
            onError={() => {
              if (!customImage && imageSource.endsWith('.png')) {
                const target = document.querySelector(`img[alt="${photo.title}"]`) as HTMLImageElement;
                if (target) target.src = `/photos/foto-${photo.id}.jpg`;
              } else if (!customImage) {
                setLoadError(true);
              }
            }}
            className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
              isLoaded || customImage ? 'opacity-100' : 'opacity-90'
            }`}
          />
          {!isLoaded && !customImage && (
            <div className="absolute inset-0 bg-[#1A1817] animate-pulse flex items-center justify-center">
              <Camera className="w-8 h-8 text-[#DDB7BD]/20" />
            </div>
          )}
        </>
      ) : (
        <div className="w-full h-full p-6 flex flex-col justify-center items-center text-center bg-[#171514] border border-[#2D2825]">
          <Camera className="w-8 h-8 text-[#DDB7BD]/40 mb-2" />
          <h4 className="font-serif-display text-base font-medium text-[#FAF9F7]">
            {photo.title}
          </h4>
          <p className="text-xs text-[#B8ADA6] mt-1">
            {photo.subtitle}
          </p>
        </div>
      )}

      {/* Scrim elegante no hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Legenda na base se ativada */}
      {showCaption && (
        <div className="absolute bottom-0 inset-x-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between z-10 pointer-events-none">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#DDB7BD] font-medium mb-0.5">
              {photo.categories[0]}
            </p>
            <h4 className="font-serif-display text-base md:text-lg font-medium leading-tight text-white">
              {photo.title}
            </h4>
          </div>
          <span className="text-xs text-[#E8D8C8] shrink-0 ml-2">Ampliar →</span>
        </div>
      )}
    </div>
  );
};
