export interface Board {
  id: string;
  parentId: string | null;
  creatorId: string;
  workspaceId: string;
  title: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  hasCurrentUser: boolean;
  thumbnails?: string[];
  ancestors?: Pick<Board, "id" | "title">[];
  pos: number;
}

export interface BoardsListResponse {
  data: Board[];
  total: number;
  pagination: {
    hasMore: boolean;
    cursor: string | null;
  };
}

export interface BoardDetails {
  id: string;
  title: string;
  ancestors: {
    id: string;
    title: string;
  }[];
}

const defaultBoardId = "c74bbbc8-602b-4c88-be71-9e21b36b0514";
const shortId = "bDkBvnzpB";

export const fetchBoards = (boardId: string = defaultBoardId): Promise<BoardsListResponse> =>
  fetch(`https://api.air.inc/shorturl/${shortId}/boards/${boardId}`, {
    method: "post",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      ancestorCutoff: boardId,
      numThumbnails: 1,
      view: boardId,
      includeAncestors: true,
      libraryBoards: "ALL",
      limit: 30,
      cursor: null,
      sortBy: "custom",
      sortField: {
        direction: "desc",
        name: "dateModified",
      },
    }),
  }).then((r) => r.json());

export const fetchBoardDetails = async (boardId: string): Promise<BoardDetails> => {
  const response = await fetch(`https://api.air.inc/shorturl/${shortId}/boards/${boardId}`, {
    method: "get",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
  });
  
  const data = await response.json();
  return {
    id: data.id,
    title: data.title,
    ancestors: data.ancestors || []
  };
};
