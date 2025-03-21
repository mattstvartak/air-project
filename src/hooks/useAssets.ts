import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchAssets, Clip } from '@/app/api/clips';

interface UseAssetsParams {
  boardId: string;
}

export const useAssets = ({ boardId }: UseAssetsParams) => {
  return useInfiniteQuery({
    queryKey: ['assets', boardId],
    queryFn: async ({ pageParam = null }: { pageParam: string | null }) => {
      const response = await fetchAssets({ 
        cursor: pageParam, 
        boardId
      });
      return response;
    },
    getNextPageParam: (lastPage) => lastPage.pagination?.cursor,
    initialPageParam: null,
  });
}; 