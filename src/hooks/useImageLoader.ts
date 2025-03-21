import { useCallback, useEffect, useState } from 'react';
import { UseImageLoaderResult } from '@/types';

export function useImageLoader(resetKey?: string): UseImageLoaderResult {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  // Reset loaded images when reset key changes
  useEffect(() => {
    if (resetKey) {
      setLoadedImages(new Set());
    }
  }, [resetKey]);

  const handleImageLoad = useCallback((imageId: string) => {
    setLoadedImages(prev => {
      const newSet = new Set(prev);
      newSet.add(imageId);
      return newSet;
    });
  }, []);

  const isImageLoaded = useCallback((imageId: string) => {
    return loadedImages.has(imageId);
  }, [loadedImages]);

  return { handleImageLoad, isImageLoaded, loadedImagesCount: loadedImages.size };
} 