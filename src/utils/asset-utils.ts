import { Clip } from '@/app/api/clips';

export function getAssetMetadata(asset: Clip) {
  const fileType = asset.ext?.toUpperCase() || 
                  asset.mime?.split('/')[1]?.toUpperCase() || 
                  asset.type.toUpperCase();
  
  return {
    duration: asset.duration,
    size: asset.size,
    dimensions: {
      width: asset.width,
      height: asset.height
    },
    fileType,
    assetType: asset.type as 'video' | 'image'
  };
}

export function getAssetFileName(asset: Clip) {
  return asset.title || asset.importedName || 'Untitled';
}

export function calculateAspectRatio(asset: Clip) {
  const rawAspectRatio = asset.width / asset.height;
  // Adjust aspect ratio for portrait images to make them more square-like
  return rawAspectRatio < 1 
    ? 0.8 + (0.2 * rawAspectRatio) // Portrait: compress the narrowness
    : rawAspectRatio; // Landscape: keep original ratio
} 