import { useCallback, useRef, useState } from 'react';
import { UseLoadMoreOptions } from '@/types';

export function useLoadMore(onLoadMore: () => Promise<void>, { throttleTime = 500 }: UseLoadMoreOptions = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const loadingRef = useRef(false);
  const lastLoadTime = useRef(Date.now());

  const loadMore = useCallback(async () => {
    if (loadingRef.current) return;
    
    const now = Date.now();
    if (now - lastLoadTime.current < throttleTime) return;

    loadingRef.current = true;
    setIsLoading(true);
    lastLoadTime.current = now;

    try {
      await onLoadMore();
    } finally {
      setIsLoading(false);
      loadingRef.current = false;
    }
  }, [onLoadMore, throttleTime]);

  return { isLoading, loadMore };
} 