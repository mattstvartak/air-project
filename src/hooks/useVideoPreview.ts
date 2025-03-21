import { useCallback, useEffect, useRef } from 'react';
import { UseVideoPreviewResult } from '@/types';

export function useVideoPreview(): UseVideoPreviewResult {
  const videoTimeoutRef = useRef<NodeJS.Timeout>();
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoEnter = useCallback((isVideo: boolean, previewUrl?: string) => {
    if (isVideo && previewUrl) {
      if (videoTimeoutRef.current) {
        clearTimeout(videoTimeoutRef.current);
      }
      videoTimeoutRef.current = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().catch(() => {
            console.log('Video autoplay prevented');
          });
        }
      }, 500);
    }
  }, []);

  const handleVideoLeave = useCallback(() => {
    if (videoTimeoutRef.current) {
      clearTimeout(videoTimeoutRef.current);
    }
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (videoTimeoutRef.current) {
        clearTimeout(videoTimeoutRef.current);
      }
    };
  }, []);

  return { videoRef, handleVideoEnter, handleVideoLeave };
} 