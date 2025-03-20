'use client';

import { Clip } from '@/app/api/clips';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ExternalLink, Link2, Copy, Download } from 'lucide-react';
import { ContentBlock } from './content-block';
import { List, WindowScroller } from 'react-virtualized';
import 'react-virtualized/styles.css';

interface AssetGridProps {
  assets: Clip[];
  onAssetDoubleClick: (assetId: string) => void;
  boardId: string;
  onLoadMore: () => void;
}

function AssetGrid({ assets, onAssetDoubleClick, boardId, onLoadMore }: AssetGridProps) {
  const [isLoading, setIsLoading] = useState(false);
  const loadingRef = useRef(false);
  const lastLoadTime = useRef(Date.now());
  const containerRef = useRef<HTMLDivElement>(null);
  const [itemsPerRow, setItemsPerRow] = useState(4);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  // Calculate dimensions
  const ITEM_HEIGHT = 240;
  const GAP = 16; // gap-4

  useEffect(() => {
    // Reset loaded images when board changes
    setLoadedImages(new Set());
  }, [boardId]);

  useEffect(() => {
    const updateItemsPerRow = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        if (width < 640) setItemsPerRow(2);
        else if (width < 1024) setItemsPerRow(3);
        else if (width < 1280) setItemsPerRow(4);
        else setItemsPerRow(5);
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
  }, []);

  const loadMoreAssets = useCallback(async () => {
    if (loadingRef.current) return;
    const now = Date.now();
    if (now - lastLoadTime.current < 500) return;

    loadingRef.current = true;
    setIsLoading(true);
    lastLoadTime.current = now;

    try {
      await onLoadMore();
    } finally {
      setIsLoading(false);
      loadingRef.current = false;
    }
  }, [onLoadMore]);

  const handleImageLoad = useCallback((assetId: string) => {
    setLoadedImages(prev => new Set(prev).add(assetId));
  }, []);

  const rowRenderer = ({ index, key, style }: { index: number; key: string; style: React.CSSProperties }) => {
    const startIdx = index * itemsPerRow;
    const rowAssets = assets.slice(startIdx, startIdx + itemsPerRow);

    if (index === Math.floor(assets.length / itemsPerRow) - 2) {
      requestIdleCallback(() => loadMoreAssets());
    }

    return (
      <div 
        key={key} 
        className="flex gap-4 mb-4"
        style={{ ...style, height: ITEM_HEIGHT }}
      >
        {rowAssets.map((asset) => {
          const fileName = asset.title || asset.importedName || 'Untitled';
          const fileType = asset.ext?.toUpperCase() || asset.mime?.split('/')[1]?.toUpperCase() || asset.type.toUpperCase();
          const rawAspectRatio = asset.width / asset.height;
          // Adjust aspect ratio for portrait images to make them more square-like
          const aspectRatio = rawAspectRatio < 1 
            ? 0.8 + (0.2 * rawAspectRatio) // Portrait: compress the narrowness
            : rawAspectRatio; // Landscape: keep original ratio

          const menuItems = [
            {
              label: 'Open',
              icon: <ExternalLink className="mr-2 h-4 w-4" />,
              onClick: () => onAssetDoubleClick(asset.id)
            },
            {
              label: 'Share link',
              icon: <Link2 className="mr-2 h-4 w-4" />,
              onClick: () => navigator.clipboard.writeText(asset.assets.image)
            },
            {
              label: 'Copy to workspace',
              icon: <Copy className="mr-2 h-4 w-4" />,
              onClick: () => console.log('Copy to workspace:', asset.id)
            },
            {
              label: 'Download',
              icon: <Download className="mr-2 h-4 w-4" />,
              onClick: () => {
                const link = document.createElement('a');
                link.href = asset.assets.image;
                link.download = fileName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }
            }
          ];

          return (
            <div
              key={asset.id}
              style={{
                flexGrow: 1,
                flexShrink: 1,
                flexBasis: `${240 * aspectRatio}px`,
                minWidth: 0
              }}
            >
              <ContentBlock
                type="asset"
                id={asset.id}
                title={fileName}
                thumbnailUrl={asset.assets.image}
                previewVideoUrl={asset.type === 'video' ? asset.assets.previewVideo : undefined}
                aspectRatio={aspectRatio}
                onDoubleClick={() => onAssetDoubleClick(asset.id)}
                menuItems={menuItems}
                metadata={{
                  duration: asset.duration,
                  size: asset.size,
                  dimensions: {
                    width: asset.width,
                    height: asset.height
                  },
                  fileType: fileType,
                  assetType: asset.type as 'video' | 'image'
                }}
                onImageLoad={() => handleImageLoad(asset.id)}
                isImageLoaded={loadedImages.has(asset.id)}
              />
            </div>
          );
        })}
      </div>
    );
  };

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
        <div className="flex items-center justify-center h-16">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        </div>
      )}
    </div>
  );
}

export { AssetGrid };
export type { AssetGridProps }; 