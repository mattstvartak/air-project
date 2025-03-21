"use client";

import { useEffect, useState } from "react";
import { Board, fetchBoards, BoardsListResponse } from "@/app/api/boards";
import { Clip, fetchAssets } from "@/app/api/clips";
import { AssetGrid } from "@/components/gallery/asset-grid";
import { BoardBlock } from "@/components/gallery/board-block";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { useBoardDetails } from "@/hooks/useBoardDetails";
import TopBar from "@/components/top-bar";
import SearchBar from "@/components/search-bar";

const BoardPage = () => {
  // Board states
  const [childBoards, setChildBoards] = useState<Board[]>([]);
  const [isBoardsLoading, setBoardsLoading] = useState(true);

  // Clips states
  const [assets, setAssets] = useState<Clip[]>([]);
  const [totalAssets, setTotalAssets] = useState(0);
  const [isAssetsLoading, setAssetsLoading] = useState(true);
  const [cursor, setCursor] = useState<string | null>(null);
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);

  const router = useRouter();
  const params = useParams();
  const boardId = params.id as string;
  const { currentBoard, isLoading: isBoardDetailsLoading } =
    useBoardDetails(boardId);

  // Load boards
  useEffect(() => {
    const loadBoards = async () => {
      try {
        setBoardsLoading(true);
        const boardsResponse = await fetchBoards(boardId);
        const boards = boardsResponse.data || [];
        setChildBoards(boards);
      } catch (error) {
        console.error("Error loading boards:", error);
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
        console.error("Error loading assets:", error);
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
    <>
      <TopBar className="sticky top-0 z-11" />
      <SearchBar className="sticky top-[56px] z-11 bg-white pt-4" />
      <div className="z-10 bg-white pb-3 relative">
        <div className="flex w-full flex-col items-start gap-1 px-[48px]">
          <h1 className="my-[6px] mr-4 break-words text-2xl font-semibold text-pigeon-700">
            {currentBoard?.title || "Air Branded Boards"}
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            With a bunch of stock photos!
          </p>
        </div>
      </div>
      <div className="border-b border-gray-200 border-b-[1px] border-b-solid sticky flex top-[125px] z-9 bg-white pb-5 px-[48px] mt-[-30px] pt-2">
        <Breadcrumb boardId={boardId} />
        <div>test</div>
      </div>
      <div className="bg-white">
        <div className="p-6 max-w-[2000px] mx-auto bg-white">
          {/* Child Boards Section */}
          {childBoards.length > 0 && (
            <div className="space-y-4 mb-8">
              <h2 className="text-[12px] font-semibold flex items-baseline gap-2 uppercase tracking-wide">
                Boards
                <span className="text-sm text-gray-500">
                  ({childBoards.length})
                </span>
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
                const asset = assets.find((a) => a.id === assetId);
                if (asset && asset.boardCount && asset.boardCount > 0) {
                  router.push(`/b/${boardId}`);
                }
              }}
              boardId={boardId}
              selectedAssetId={selectedAssetId}
              onAssetSelect={setSelectedAssetId}
              onLoadMore={async () => {
                if (!cursor) return;
                try {
                  const response = await fetchAssets({ cursor, boardId });
                  if (response.data.clips) {
                    setAssets((prev) => [...prev, ...response.data.clips]);
                    setCursor(response.pagination?.cursor || null);
                  }
                } catch (error) {
                  console.error("Error loading more assets:", error);
                }
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BoardPage;
