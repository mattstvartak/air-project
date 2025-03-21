import { useCallback, useState, useRef, useEffect } from "react";
import { useVideoPreview } from "@/hooks/useVideoPreview";
import { useHoverState } from "@/hooks/useHoverState";
import { ContentOverlay } from "./content-overlay";
import { ContentMedia } from "./content-media";
import { ContentBlockProps } from "@/types";

export function ContentBlock({
  type,
  id,
  title,
  thumbnailUrl,
  previewVideoUrl,
  aspectRatio = 1,
  onDoubleClick,
  menuItems,
  metadata,
  onImageLoad,
  isImageLoaded,
  isSelected = false,
  onClick,
}: ContentBlockProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVideo = type === "asset" && metadata?.assetType === "video";

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    if (isVideo && videoRef.current) {
      videoRef.current.play();
    }
  }, [isVideo]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (isVideo && videoRef.current && !isSelected) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isVideo, isSelected]);

  const showOverlay = isHovered || isMenuOpen || isSelected;

  // Effect to handle video playback based on selection
  useEffect(() => {
    if (isVideo && videoRef.current) {
      if (isHovered) {
        videoRef.current.play();
      } else if (!isHovered) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isVideo, isHovered]);

  return (
    <div
      className={`relative cursor-pointer rounded-md overflow-hidden h-full transition-all duration-200 ${
        isSelected || isHovered ? "bg-gray-100" : ""
      } ${isSelected ? "ring-2 ring-blue-600" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onDoubleClick={onDoubleClick}
      onClick={onClick}>
      <ContentMedia
        isVideo={isVideo}
        isHovered={isHovered}
        showOverlay={showOverlay}
        thumbnailUrl={thumbnailUrl}
        previewVideoUrl={previewVideoUrl}
        videoRef={videoRef}
        duration={metadata?.duration}
      />

      <ContentOverlay
        title={title}
        showOverlay={showOverlay}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        menuItems={menuItems}
        type={type}
        metadata={metadata}
      />
    </div>
  );
}
