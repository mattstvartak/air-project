'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface LayoutShift extends PerformanceEntry {
  value: number;
}

export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Track page views
    if (typeof window !== 'undefined') {
      // You can replace this with your preferred analytics service
      console.log('Page view:', pathname);
    }
  }, [pathname]);

  useEffect(() => {
    // Track performance metrics
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
      return;
    }

    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            // Track LCP
            console.log('LCP:', entry.startTime);
          } else if (entry.entryType === 'first-input-delay') {
            // Track FID
            console.log('FID:', entry.duration);
          } else if (entry.entryType === 'cumulative-layout-shift') {
            // Track CLS
            const clsEntry = entry as LayoutShift;
            console.log('CLS:', clsEntry.value);
          }
        }
      });

      // Check which metrics are supported
      const supportedEntryTypes = PerformanceObserver.supportedEntryTypes || [];
      const metricsToObserve = ['largest-contentful-paint', 'first-input-delay', 'cumulative-layout-shift']
        .filter(metric => supportedEntryTypes.includes(metric));
      
      if (metricsToObserve.length > 0) {
        observer.observe({ entryTypes: metricsToObserve });
      }

      return () => observer.disconnect();
    } catch (error) {
      console.warn('Performance monitoring is not supported in this browser', error);
    }
  }, []);

  return null;
} 