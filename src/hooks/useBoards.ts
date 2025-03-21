import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchBoards, BoardsListResponse } from '@/app/api/boards';

export const useBoards = (boardId: string) => {
  return useInfiniteQuery({
    queryKey: ['boards', boardId],
    queryFn: async ({ pageParam = null }: { pageParam: string | null }) => {
      const response = await fetchBoards(boardId, pageParam);
      return response;
    },
    getNextPageParam: (lastPage) => lastPage.pagination.cursor,
    initialPageParam: null,
  });
}; 