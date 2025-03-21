import { useEffect, useRef, useState } from 'react';
import { UseResponsiveGridOptions } from '@/types';

export function useResponsiveGrid({
  defaultItemsPerRow = 4,
  breakpoints = {
    sm: 640,
    md: 1024,
    lg: 1280,
    xl: 1536
  },
  itemsAtBreakpoints = {
    xs: 2,
    sm: 3,
    md: 4,
    lg: 5,
    xl: 5
  }
}: UseResponsiveGridOptions = {}) {
  const [itemsPerRow, setItemsPerRow] = useState(defaultItemsPerRow);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateItemsPerRow = () => {
      if (!containerRef.current) return;

      const width = containerRef.current.offsetWidth;
      
      if (width < breakpoints.sm!) {
        setItemsPerRow(itemsAtBreakpoints.xs!);
      } else if (width < breakpoints.md!) {
        setItemsPerRow(itemsAtBreakpoints.sm!);
      } else if (width < breakpoints.lg!) {
        setItemsPerRow(itemsAtBreakpoints.md!);
      } else if (width < breakpoints.xl!) {
        setItemsPerRow(itemsAtBreakpoints.lg!);
      } else {
        setItemsPerRow(itemsAtBreakpoints.xl!);
      }
    };

    updateItemsPerRow();
    const observer = new ResizeObserver(updateItemsPerRow);
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.disconnect();
      }
    };
  }, [breakpoints, itemsAtBreakpoints]);

  return { itemsPerRow, containerRef };
} 