import React, { RefObject } from 'react';
import { Clip } from '@/app/api/clips';

// Common types
export interface MenuItem {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

export interface AssetMetadata {
  duration?: number;
  size?: number;
  dimensions?: { width: number; height: number };
  fileType?: string;
  assetType?: 'video' | 'image';
}

// Hook types
export interface UseResponsiveGridOptions {
  defaultItemsPerRow?: number;
  breakpoints?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  itemsAtBreakpoints?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}

export interface UseLoadMoreOptions {
  throttleTime?: number;
}

export interface UseImageLoaderResult {
  handleImageLoad: (imageId: string) => void;
  isImageLoaded: (imageId: string) => boolean;
  loadedImagesCount: number;
}

export interface UseVideoPreviewResult {
  videoRef: RefObject<HTMLVideoElement>;
  handleVideoEnter: (isVideo: boolean, previewUrl?: string) => void;
  handleVideoLeave: () => void;
}

export interface UseHoverStateResult {
  isHovered: boolean;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  showOverlay: boolean;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
}

// Component props
export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export interface AssetMenuItemsProps {
  asset: Clip;
  onAssetDoubleClick: (assetId: string) => void;
}

export interface AssetItemProps {
  asset: Clip;
  onAssetDoubleClick: (assetId: string) => void;
  onImageLoad: (assetId: string) => void;
  isImageLoaded: boolean;
  isSelected: boolean;
  onSelect: () => void;
}

export interface AssetRowProps {
  assets: Clip[];
  style: React.CSSProperties;
  onAssetDoubleClick: (assetId: string) => void;
  onImageLoad: (assetId: string) => void;
  isImageLoaded: (assetId: string) => boolean;
  selectedAssetId: string | null;
  onAssetSelect: (assetId: string | null) => void;
}

export interface AssetGridProps {
  assets: Clip[];
  onAssetDoubleClick: (assetId: string) => void;
  boardId: string;
  onLoadMore: () => void;
  selectedAssetId: string | null;
  onAssetSelect: (assetId: string | null) => void;
}

export interface ContentBlockProps {
  type: 'asset' | 'board';
  id: string;
  title: string;
  thumbnailUrl?: string;
  previewVideoUrl?: string;
  aspectRatio?: number;
  onDoubleClick?: () => void;
  menuItems?: MenuItem[];
  metadata?: AssetMetadata;
  onImageLoad?: () => void;
  isImageLoaded?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
}

export interface ContentMediaProps {
  isVideo: boolean;
  isHovered: boolean;
  showOverlay: boolean;
  thumbnailUrl?: string;
  previewVideoUrl?: string;
  videoRef: RefObject<HTMLVideoElement>;
  duration?: number;
}

export interface ContentOverlayProps {
  title: string;
  showOverlay: boolean;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  menuItems?: MenuItem[];
  type: 'asset' | 'board';
  metadata?: AssetMetadata;
} 