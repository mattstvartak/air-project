import { Clip } from '@/app/api/clips';
import { AssetItem } from './asset-item';
import { AssetRowProps } from '@/types';

export function AssetRow({
  assets,
  style,
  onAssetDoubleClick,
  onImageLoad,
  isImageLoaded
}: AssetRowProps) {
  return (
    <div 
      className="flex gap-4 mb-4"
      style={style}
    >
      {assets.map((asset) => (
        <AssetItem
          key={asset.id}
          asset={asset}
          onAssetDoubleClick={onAssetDoubleClick}
          onImageLoad={onImageLoad}
          isImageLoaded={isImageLoaded(asset.id)}
        />
      ))}
    </div>
  );
} 