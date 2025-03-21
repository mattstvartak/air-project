import { useCallback, useState } from 'react';
import { UseHoverStateResult } from '@/types';

export function useHoverState(): UseHoverStateResult {
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!isMenuOpen) {
      setIsHovered(false);
    }
  }, [isMenuOpen]);

  return {
    isHovered,
    isMenuOpen,
    setIsMenuOpen,
    showOverlay: isHovered || isMenuOpen,
    handleMouseEnter,
    handleMouseLeave
  };
} 