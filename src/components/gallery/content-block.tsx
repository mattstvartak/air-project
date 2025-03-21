import { useCallback } from "react";
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
  isImageLoaded
}: ContentBlockProps) {
  const { 
    isHovered, 
    isMenuOpen, 
    setIsMenuOpen, 
    showOverlay, 
    handleMouseEnter: baseHandleMouseEnter, 
    handleMouseLeave: baseHandleMouseLeave 
  } = useHoverState();
  
  const isVideo = type === 'asset' && metadata?.assetType === 'video';
  const { videoRef, handleVideoEnter, handleVideoLeave } = useVideoPreview();

  const handleMouseEnter = useCallback(() => {
    baseHandleMouseEnter();
    handleVideoEnter(isVideo, previewVideoUrl);
    if (onImageLoad && !isImageLoaded) {
      onImageLoad();
    }
  }, [baseHandleMouseEnter, isVideo, previewVideoUrl, handleVideoEnter, onImageLoad, isImageLoaded]);

  const handleMouseLeave = useCallback(() => {
    baseHandleMouseLeave();
    handleVideoLeave();
  }, [baseHandleMouseLeave, handleVideoLeave]);

  return (
    <div
      className="relative cursor-pointer bg-gray-100 rounded-md overflow-hidden h-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onDoubleClick={onDoubleClick}
    >
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