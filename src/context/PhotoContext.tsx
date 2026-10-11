import React, { createContext, useContext, useState, useEffect } from 'react';
import { PhotoItem } from '../types';
import { STUDIO_PHOTOS } from '../config/studioConfig';
import { loadAllPhotos, savePhotoBlob, deletePhotoBlob, clearAllPhotosDB } from '../utils/photoDb';

interface PhotoContextType {
  photos: PhotoItem[];
  userUploadedImages: Record<number, string>;
  setPhotoFile: (photoId: number, dataUrl: string) => Promise<void>;
  removePhotoFile: (photoId: number) => Promise<void>;
  uploadMultipleFiles: (files: FileList | File[]) => Promise<number>;
  isManagerOpen: boolean;
  openManager: (targetPhotoId?: number) => void;
  closeManager: () => void;
  targetPhotoId: number | null;
  resetAllToDefault: () => Promise<void>;
  hasUploadedPhotos: boolean;
}

const PhotoContext = createContext<PhotoContextType | undefined>(undefined);

export const PhotoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [photos] = useState<PhotoItem[]>(STUDIO_PHOTOS);
  const [userUploadedImages, setUserUploadedImages] = useState<Record<number, string>>({});
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const [targetPhotoId, setTargetPhotoId] = useState<number | null>(null);

  // Carrega fotos salvas do IndexedDB
  useEffect(() => {
    loadAllPhotos().then((saved) => {
      if (saved && Object.keys(saved).length > 0) {
        setUserUploadedImages(saved);
      }
    });
  }, []);

  const setPhotoFile = async (photoId: number, dataUrl: string) => {
    setUserUploadedImages((prev) => ({ ...prev, [photoId]: dataUrl }));
    await savePhotoBlob(photoId, dataUrl);
  };

  const removePhotoFile = async (photoId: number) => {
    setUserUploadedImages((prev) => {
      const updated = { ...prev };
      delete updated[photoId];
      return updated;
    });
    await deletePhotoBlob(photoId);
  };

  const uploadMultipleFiles = async (files: FileList | File[]): Promise<number> => {
    const fileList = Array.from(files);
    let matchedCount = 0;

    for (let index = 0; index < fileList.length; index++) {
      const file = fileList[index];
      let matchedId: number | null = null;

      // Padrão 1: ChatGPT "-1.png", "-2.png", etc.
      const chatGptMatch = file.name.match(/[-_]([1-9])\.(png|jpe?g|webp)/i);
      if (chatGptMatch && chatGptMatch[1]) {
        matchedId = parseInt(chatGptMatch[1], 10);
      }

      // Padrão 2: Download padrão com parênteses "imagem (1).png"
      if (!matchedId) {
        const parenMatch = file.name.match(/\(([1-9])\)\.(png|jpe?g|webp)/i);
        if (parenMatch && parenMatch[1]) {
          matchedId = parseInt(parenMatch[1], 10);
        }
      }

      // Padrão 3: foto-1, foto_1, foto1, img-1, image1
      if (!matchedId) {
        const simpleMatch = file.name.match(/(?:foto|photo|img|image)[-_ ]?([1-9])/i);
        if (simpleMatch && simpleMatch[1]) {
          matchedId = parseInt(simpleMatch[1], 10);
        }
      }

      // Padrão 4: Qualquer dígito isolado no nome antes da extensão
      if (!matchedId) {
        const digitMatch = file.name.match(/([1-9])\.(?:png|jpe?g|webp)$/i);
        if (digitMatch && digitMatch[1]) {
          matchedId = parseInt(digitMatch[1], 10);
        }
      }

      // Padrão 5: Sequencial pelo índice
      if (!matchedId && index < 9) {
        matchedId = index + 1;
      }

      if (matchedId && matchedId >= 1 && matchedId <= 9) {
        const targetId = matchedId;
        const reader = new FileReader();
        await new Promise<void>((resolve) => {
          reader.onload = async () => {
            if (typeof reader.result === 'string') {
              await setPhotoFile(targetId, reader.result);
              matchedCount++;
            }
            resolve();
          };
          reader.readAsDataURL(file);
        });
      }
    }

    return matchedCount;
  };

  const resetAllToDefault = async () => {
    setUserUploadedImages({});
    await clearAllPhotosDB();
  };

  const openManager = (targetId?: number) => {
    setTargetPhotoId(targetId ?? null);
    setIsManagerOpen(true);
  };

  const closeManager = () => {
    setIsManagerOpen(false);
    setTargetPhotoId(null);
  };

  const hasUploadedPhotos = Object.keys(userUploadedImages).length > 0;

  return (
    <PhotoContext.Provider
      value={{
        photos,
        userUploadedImages,
        setPhotoFile,
        removePhotoFile,
        uploadMultipleFiles,
        isManagerOpen,
        openManager,
        closeManager,
        targetPhotoId,
        resetAllToDefault,
        hasUploadedPhotos,
      }}
    >
      {children}
    </PhotoContext.Provider>
  );
};

export function useStudioPhotos() {
  const context = useContext(PhotoContext);
  if (!context) {
    throw new Error('useStudioPhotos deve ser usado dentro de PhotoProvider');
  }
  return context;
}
