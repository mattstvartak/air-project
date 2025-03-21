import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useBoardDetails } from "@/hooks/useBoardDetails";

export interface BreadcrumbItem {
  id: string;
  title: string;
  isLast?: boolean;
  isLink?: boolean;
}

interface BreadcrumbProps {
  boardId: string;
}

const ROOT_BOARD_ID = "c74bbbc8-602b-4c88-be71-9e21b36b0514";

export function Breadcrumb({ boardId }: BreadcrumbProps) {
  const { currentBoard, isLoading } = useBoardDetails(boardId);

  if (isLoading) {
    return (
      <nav className="flex items-center space-x-1 text-sm text-gray-500">
        <Link href="/" className="hover:text-gray-700 transition-colors">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-gray-400">Loading...</span>
      </nav>
    );
  }

  if (!currentBoard) {
    return (
      <nav className="flex items-center space-x-1 text-sm text-gray-500">
        <Link href="/" className="hover:text-gray-700 transition-colors">
          Home
        </Link>
      </nav>
    );
  }

  // Build breadcrumb items
  const breadcrumbItems: BreadcrumbItem[] = [
    // Always show Air Branded Boards first, unless we're already on it
    ...(currentBoard.id === ROOT_BOARD_ID
      ? []
      : [
          {
            id: ROOT_BOARD_ID,
            title: "Air Branded Boards",
            isLink: true,
            isLast: false,
          },
        ]),
    // Show all ancestors in order, excluding Air Branded Boards since we handle it separately
    ...(currentBoard.ancestors || [])
      .filter((ancestor) => ancestor.id !== ROOT_BOARD_ID && ancestor.title)
      .map((ancestor) => ({
        id: ancestor.id,
        title: ancestor.title,
        isLink: true,
        isLast: false,
      })),
    // Show current board last
    {
      id: currentBoard.id,
      title:
        currentBoard.id === ROOT_BOARD_ID
          ? "Air Branded Boards"
          : currentBoard.title,
      isLink: false,
      isLast: true,
    },
  ].filter((item) => item.title); // Remove any items with empty titles

  return (
    <nav className="flex items-center space-x-1 text-xs text-gray-600 grow-1">
      <Link href="/" className="hover:text-gray-700 transition-colors">
        Home
      </Link>
      {breadcrumbItems.map((item, index) => (
        <div key={item.id} className="flex items-center space-x-1">
          <ChevronRight className="h-4 w-4" />
          {item.isLast || !item.isLink ? (
            <span className="text-gray-900 font-medium">{item.title}</span>
          ) : (
            <Link
              href={`/b/${item.id}`}
              className="hover:text-gray-700 transition-colors">
              {item.title}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
