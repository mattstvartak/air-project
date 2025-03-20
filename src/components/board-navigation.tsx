'use client';

import { useEffect, useState } from 'react';
import { Board, fetchBoards } from '@/app/api/boards';

interface BoardNavigationProps {
  parentId?: string;
}

export function BoardNavigation({ parentId }: BoardNavigationProps) {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBoards = async () => {
      try {
        const response = await fetchBoards();
        // Filter boards based on parentId
        const filteredBoards = response.data.filter(board => 
          parentId ? board.parentId === parentId : board.parentId === null
        );
        setBoards(filteredBoards);
      } catch (error) {
        console.error('Error loading boards:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBoards();
  }, [parentId]);

  return (
    <div className="p-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-baseline gap-2">
          Boards
          <span className="text-sm text-gray-500">({boards.length})</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {loading ? (
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
          ) : (
            boards.map((board) => (
              <a
                key={board.id}
                href={`/b/${board.id}`}
                className="block aspect-[4/3] cursor-pointer"
              >
                <div className="relative h-full w-full rounded-md overflow-hidden bg-gray-100">
                  {board.thumbnails?.[0] ? (
                    <>
                      <img
                        src={board.thumbnails[0]}
                        alt={board.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </>
                  ) : null}
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h3 className="text-sm font-medium text-white truncate">
                      {board.title}
                    </h3>
                  </div>
                </div>
              </a>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 