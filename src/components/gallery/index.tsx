'use client';

import { useEffect, useState } from 'react';
import { Board, fetchBoards } from '@/app/api/boards';
import { Clip, fetchAssets } from '@/app/api/clips';
import { AssetGrid } from './asset-grid';
import { BoardBlock } from './board-block';
import { Share, Download } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface GalleryProps {
  shortId: string;
  defaultBoardId: string;
}

function Gallery({ shortId, defaultBoardId }: GalleryProps) {
  const [boards, setBoards] = useState<Board[]>([]);
  const [assets, setAssets] = useState<Clip[]>([]);
  const [selectedBoardId, setSelectedBoardId] = useState(defaultBoardId);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [totalAssets, setTotalAssets] = useState(0);

  useEffect(() => {
    const loadBoards = async () => {
      try {
        const response = await fetchBoards();
        const boards = response.data.boards || [];
        setBoards(boards);
      } catch (error) {
        console.error('Error loading boards:', error);
      }
    };

    loadBoards();
  }, []);

  useEffect(() => {
    const loadInitialAssets = async () => {
      setLoading(true);
      try {
        const response = await fetchAssets({ cursor: null, boardId: selectedBoardId });
        setAssets(response.data.clips);
        setTotalAssets(response.total || 0);
      } catch (error) {
        console.error('Error loading assets:', error);
      } finally {
        setLoading(false);
      }
    };

    setAssets([]); // Clear assets when board changes
    loadInitialAssets();
  }, [selectedBoardId]);

  const handleBoardClick = (boardId: string) => {
    setSelectedBoardId(boardId);
  };

  const handleAssetDoubleClick = (assetId: string) => {
    // Navigate to the asset's board
    const asset = assets.find(a => a.id === assetId);
    if (asset && asset.boardCount && asset.boardCount > 0) {
      router.push(`/b/${selectedBoardId}`);
    }
  };

  const handleLoadMoreAssets = (newAssets: Clip[]) => {
    setAssets(prev => [...prev, ...newAssets]);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Boards</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {boards.map((board) => (
            <BoardBlock
              key={board.id}
              id={board.id}
              title={board.title}
              thumbnailUrl={board.thumbnails?.[0]}
              onDoubleClick={() => router.push(`/b/${board.id}`)}
            />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Assets</h2>
        <AssetGrid
          assets={assets}
          onAssetDoubleClick={handleAssetDoubleClick}
          boardId={selectedBoardId}
          onLoadMore={handleLoadMoreAssets}
        />
      </div>
    </div>
  );
}

export { Gallery };
export type { GalleryProps }; 