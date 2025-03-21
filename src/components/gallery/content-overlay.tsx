import { formatDuration, formatFileSize } from "@/utils/format";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ContentOverlayProps } from "@/types";

export function ContentOverlay({
  title,
  showOverlay,
  isMenuOpen,
  setIsMenuOpen,
  menuItems,
  type,
  metadata
}: ContentOverlayProps) {
  return (
    <div className={`absolute inset-0 transition-opacity duration-200 ${showOverlay ? 'opacity-100' : 'opacity-0'}`}>
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />

      {/* Menu */}
      {menuItems && menuItems.length > 0 && (
        <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              className={`absolute top-2 right-2 h-8 w-8 bg-black/60 hover:bg-black/80 text-white transition-opacity duration-200 ${type === 'board' ? (showOverlay ? 'opacity-100' : 'opacity-0') : ''}`}
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
      )}

      {/* Content info */}
      <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
        <div className="text-sm font-medium truncate mb-0.5">
          {title}
        </div>
        {type === 'asset' && metadata && (
          <div className="text-xs text-white/80 flex items-center gap-1.5">
            {metadata.fileType && <span className="uppercase">{metadata.fileType}</span>}
            {metadata.size && (
              <>
                <span className="w-0.5 h-0.5 bg-white/60 rounded-full" />
                <span>{formatFileSize(metadata.size)}</span>
              </>
            )}
            {metadata.dimensions && (
              <>
                <span className="w-0.5 h-0.5 bg-white/60 rounded-full" />
                <span>{metadata.dimensions.width} × {metadata.dimensions.height}</span>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 