'use client';

import { Clip } from '@/app/api/clips';
import { useCallback } from 'react';
import { List, WindowScroller } from 'react-virtualized';
import 'react-virtualized/styles.css';
import { useResponsiveGrid } from '@/hooks/useResponsiveGrid';
import { useLoadMore } from '@/hooks/useLoadMore';
import { useImageLoader } from '@/hooks/useImageLoader';
import { AssetRow } from './asset-row';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { AssetGridProps } from '@/types';

function AssetGrid({ assets, onAssetDoubleClick, boardId, onLoadMore }: AssetGridProps) {
  // Use our custom hooks
  const { itemsPerRow, containerRef } = useResponsiveGrid();
  // Convert onLoadMore to return a Promise
  const loadMorePromise = useCallback(async () => {
    onLoadMore();
    return Promise.resolve();
  }, [onLoadMore]);
  const { isLoading, loadMore } = useLoadMore(loadMorePromise);
  const { handleImageLoad, isImageLoaded } = useImageLoader(boardId);

  // Calculate dimensions
  const ITEM_HEIGHT = 240;
  const GAP = 16; // gap-4

  const rowRenderer = useCallback(({ index, key, style }: { index: number; key: string; style: React.CSSProperties }) => {
    const startIdx = index * itemsPerRow;
    const rowAssets = assets.slice(startIdx, startIdx + itemsPerRow);

    if (index === Math.floor(assets.length / itemsPerRow) - 2) {
      requestIdleCallback(() => loadMore());
    }

    return (
      <AssetRow
        key={key}
        assets={rowAssets}
        style={{ ...style, height: ITEM_HEIGHT }}
        onAssetDoubleClick={onAssetDoubleClick}
        onImageLoad={handleImageLoad}
        isImageLoaded={isImageLoaded}
      />
    );
  }, [assets, itemsPerRow, loadMore, onAssetDoubleClick, handleImageLoad, isImageLoaded]);

  const rowCount = Math.ceil(assets.length / itemsPerRow);

  return (
    <div ref={containerRef} className="w-full">
      <WindowScroller>
        {({ height, isScrolling, scrollTop, onChildScroll }) => (
          <List
            autoHeight
            height={height}
            width={containerRef.current?.offsetWidth || window.innerWidth}
            rowCount={rowCount}
            rowHeight={ITEM_HEIGHT + GAP}
            rowRenderer={rowRenderer}
            isScrolling={isScrolling}
            scrollTop={scrollTop}
            onScroll={onChildScroll}
            overscanRowCount={2}
          />
        )}
      </WindowScroller>
      
      {isLoading && (
        <div className="h-16">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}

export { AssetGrid };