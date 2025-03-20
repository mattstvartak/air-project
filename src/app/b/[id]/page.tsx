'use client';

import { useEffect, useState } from 'react';
import { Board, fetchBoards, BoardsListResponse } from '@/app/api/boards';
import { Clip, fetchAssets } from '@/app/api/clips';
import { AssetGrid } from '@/components/gallery/asset-grid';
import { BoardBlock } from '@/components/gallery/board-block';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { useBoardDetails } from '@/hooks/useBoardDetails';

const BoardPage = () => {
  // Board states
  const [childBoards, setChildBoards] = useState<Board[]>([]);
  const [isBoardsLoading, setBoardsLoading] = useState(true);
  
  // Clips states
  const [assets, setAssets] = useState<Clip[]>([]);
  const [totalAssets, setTotalAssets] = useState(0);
  const [isAssetsLoading, setAssetsLoading] = useState(true);
  const [cursor, setCursor] = useState<string | null>(null);

  const router = useRouter();
  const params = useParams();
  const boardId = params.id as string;
  const { currentBoard, isLoading: isBoardDetailsLoading } = useBoardDetails(boardId);

  // Load boards
  useEffect(() => {
    const loadBoards = async () => {
      try {
        setBoardsLoading(true);
        const boardsResponse = await fetchBoards(boardId);
        const boards = boardsResponse.data || [];
        setChildBoards(boards);
      } catch (error) {
        console.error('Error loading boards:', error);
        setChildBoards([]);
      } finally {
        setBoardsLoading(false);
      }
    };

    if (boardId) {
      loadBoards();
    }
  }, [boardId]);

  // Load assets
  useEffect(() => {
    const loadAssets = async () => {
      try {
        setAssetsLoading(true);
        const assetsResponse = await fetchAssets({ cursor: null, boardId });
        
        if (assetsResponse.data.clips) {
          setAssets(assetsResponse.data.clips);
          setTotalAssets(assetsResponse.data.total || 0);
          setCursor(assetsResponse.pagination?.cursor || null);
        }
      } catch (error) {
        console.error('Error loading assets:', error);
      } finally {
        setAssetsLoading(false);
      }
    };

    if (boardId) {
      // Reset states when board changes
      setAssets([]);
      setCursor(null);
      loadAssets();
    }
  }, [boardId]);

  if (isBoardsLoading || isAssetsLoading || isBoardDetailsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="p-6 max-w-[2000px] mx-auto">
        {/* Header Section */}
        <div className="mb-8 space-y-4">
          <Breadcrumb boardId={boardId} />
          <h1 className="text-3xl font-bold">
            {currentBoard?.title || 'Air Branded Boards'}
          </h1>
        </div>

        {/* Child Boards Section */}
        {childBoards.length > 0 && (
          <div className="space-y-4 mb-8">
            <h2 className="text-[12px] font-semibold flex items-baseline gap-2 uppercase tracking-wide">
              Boards
              <span className="text-sm text-gray-500">({childBoards.length})</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {childBoards.map((board) => (
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
        )}

        {/* Assets Section */}
        <div className="space-y-4">
          <h2 className="text-[12px] font-semibold flex items-baseline gap-2 uppercase tracking-wide">
            Assets
            <span className="text-sm text-gray-500">({totalAssets})</span>
          </h2>
          <AssetGrid
            assets={assets}
            onAssetDoubleClick={(assetId) => {
              const asset = assets.find(a => a.id === assetId);
              if (asset && asset.boardCount && asset.boardCount > 0) {
                router.push(`/b/${boardId}`);
              }
            }}
            boardId={boardId}
            onLoadMore={async () => {
              if (!cursor) return;
              try {
                const response = await fetchAssets({ cursor, boardId });
                if (response.data.clips) {
                  setAssets(prev => [...prev, ...response.data.clips]);
                  setCursor(response.pagination?.cursor || null);
                }
              } catch (error) {
                console.error('Error loading more assets:', error);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BoardPage; 