import { useState, useEffect } from 'react';
import { BoardDetails, fetchBoardDetails } from '@/app/api/boards';

// Helper function to get board from storage
const getBoardFromStorage = (id: string): BoardDetails | null => {
  try {
    const storedBoard = localStorage.getItem(`board_${id}`);
    return storedBoard ? JSON.parse(storedBoard) : null;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return null;
  }
};

// Helper function to store board in local storage
const storeBoardInStorage = (board: BoardDetails) => {
  try {
    localStorage.setItem(`board_${board.id}`, JSON.stringify(board));
  } catch (error) {
    console.error('Error writing to localStorage:', error);
  }
};

// Root board constant
const ROOT_BOARD_ID = 'c74bbbc8-602b-4c88-be71-9e21b36b0514';

export function useBoardDetails(boardId: string) {
  const [currentBoard, setCurrentBoard] = useState<BoardDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBoardDetails = async () => {
      try {
        setIsLoading(true);

        // If this is the root board, return it directly
        if (boardId === ROOT_BOARD_ID) {
          const rootBoard: BoardDetails = {
            id: ROOT_BOARD_ID,
            title: 'Air Branded Boards',
            ancestors: []
          };
          setCurrentBoard(rootBoard);
          return;
        }

        // First check local storage
        const storedBoard = getBoardFromStorage(boardId);
        
        if (storedBoard) {
          setCurrentBoard(storedBoard);
        } else {
          const details = await fetchBoardDetails(boardId);
          
          // Ensure ancestors are in the correct order (from root to current)
          const ancestors = details.ancestors || [];
          
          // Only add Air Branded Boards as an ancestor if this is not the root board
          // and it's not already in the ancestors list
          if (boardId !== ROOT_BOARD_ID && !ancestors.find(a => a.id === ROOT_BOARD_ID)) {
            ancestors.unshift({ 
              id: ROOT_BOARD_ID, 
              title: 'Air Branded Boards' 
            });
          }

          // Store the current board with its ancestors
          const boardWithAncestors = {
            ...details,
            ancestors
          };
          
          storeBoardInStorage(boardWithAncestors);

          // Store each ancestor with its own ancestor chain
          ancestors.forEach((ancestor, index) => {
            if (ancestor.id === ROOT_BOARD_ID) return;
            storeBoardInStorage({
              id: ancestor.id,
              title: ancestor.title,
              ancestors: ancestors.slice(0, index)
            });
          });

          setCurrentBoard(boardWithAncestors);
        }
      } catch (error) {
        console.error('Error loading board details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (boardId) {
      loadBoardDetails();
    }
  }, [boardId]);

  return { currentBoard, isLoading };
} 