import { MoreHorizontal, ExternalLink, Link2, Copy, Download, Share } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { formatDuration, formatFileSize } from "@/utils/format";
import { useCallback, useEffect, useRef, useState } from "react";

interface ContentBlockProps {
  type: 'asset' | 'board';
  id: string;
  title: string;
  thumbnailUrl?: string;
  previewVideoUrl?: string;
  aspectRatio?: number;
  onDoubleClick?: () => void;
  menuItems?: {
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
  }[];
  metadata?: {
    duration?: number;
    size?: number;
    dimensions?: { width: number; height: number };
    fileType?: string;
    assetType?: 'video' | 'image';
  };
  onImageLoad?: () => void;
  isImageLoaded?: boolean;
}

export function ContentBlock({
  type,
  id,
  title,
  thumbnailUrl,
  previewVideoUrl,
  aspectRatio = 1,
  onDoubleClick,
  menuItems,
  metadata
}: ContentBlockProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const videoTimeoutRef = useRef<NodeJS.Timeout>();
  const videoRef = useRef<HTMLVideoElement>(null);

  const showOverlay = isHovered || isMenuOpen;
  const isVideo = type === 'asset' && metadata?.assetType === 'video';

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    if (isVideo && previewVideoUrl) {
      if (videoTimeoutRef.current) {
        clearTimeout(videoTimeoutRef.current);
      }
      videoTimeoutRef.current = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().catch(() => {
            console.log('Video autoplay prevented');
          });
        }
      }, 500);
    }
  }, [isVideo, previewVideoUrl]);

  const handleMouseLeave = useCallback(() => {
    if (!isMenuOpen) {
      setIsHovered(false);
    }
    if (videoTimeoutRef.current) {
      clearTimeout(videoTimeoutRef.current);
    }
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isMenuOpen]);

  useEffect(() => {
    return () => {
      if (videoTimeoutRef.current) {
        clearTimeout(videoTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className="relative cursor-pointer bg-gray-100 rounded-md overflow-hidden h-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onDoubleClick={onDoubleClick}
    >
      {/* Background media */}
      <div className="absolute inset-0">
        {isVideo && isHovered && previewVideoUrl ? (
          <video
            ref={videoRef}
            src={previewVideoUrl}
            className="absolute inset-0 w-full h-full object-cover"
            loop
            muted
            playsInline
          />
        ) : thumbnailUrl ? (
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

      {/* Duration badge for video assets */}
      {isVideo && metadata?.duration && (
        <div className={`absolute top-2 right-2 px-1.5 py-0.5 bg-black/60 rounded text-white text-xs transition-opacity duration-200 ${showOverlay ? 'opacity-0' : 'opacity-100'}`}>
          {formatDuration(metadata.duration)}
        </div>
      )}

      {/* Overlay */}
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
    </div>
  );
}

export type { ContentBlockProps }; 