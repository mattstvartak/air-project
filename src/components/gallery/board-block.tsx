import { MoreHorizontal, Share, Download } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useCallback, useState } from "react";
import Link from "next/link";

interface BoardBlockProps {
  id: string;
  title: string;
  thumbnailUrl?: string;
  onDoubleClick?: () => void;
}

export function BoardBlock({
  id,
  title,
  thumbnailUrl,
  onDoubleClick,
}: BoardBlockProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!isMenuOpen) {
      setIsHovered(false);
    }
  }, [isMenuOpen]);

  const menuItems = [
    {
      label: 'Share a link',
      icon: <Share className="mr-2 h-4 w-4" />,
      onClick: () => console.log('Share board:', id)
    },
    {
      label: 'Download',
      icon: <Download className="mr-2 h-4 w-4" />,
      onClick: () => console.log('Download board:', id)
    }
  ];

  return (
    <div
      className="relative cursor-pointer bg-gray-100 rounded-md overflow-hidden aspect-square w-full group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onDoubleClick={onDoubleClick}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        {thumbnailUrl ? (
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${thumbnailUrl})` }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            No Preview
          </div>
        )}
      </div>

      {/* Gradient overlay - always visible */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

      {/* Menu - only visible on hover */}
      <div className={`absolute top-2 right-2 transition-opacity duration-200 ${isHovered || isMenuOpen ? 'opacity-100' : 'opacity-0'}`}>
        <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8 bg-black/60 hover:bg-black/80 text-white"
            >
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {menuItems.map((item, index) => (
              <DropdownMenuItem key={index} onClick={item.onClick}>
                {item.icon}
                <span>{item.label}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Board title - always visible */}
      <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
        <Link 
          href={`/b/${id}`}
          className="block text-sm font-medium truncate hover:underline"
          onClick={(e) => e.stopPropagation()} // Prevent double-click handler from firing
        >
          {title}
        </Link>
      </div>
    </div>
  );
}

export type { BoardBlockProps }; 