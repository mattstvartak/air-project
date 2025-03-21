import { Clip } from '@/app/api/clips';
import { calculateAspectRatio, getAssetFileName, getAssetMetadata } from '@/utils/asset-utils';
import { ContentBlock } from './content-block';
import { getAssetMenuItems } from './asset-menu-items';
import { AssetItemProps } from '@/types';

export function AssetItem({
  asset,
  onAssetDoubleClick,
  onImageLoad,
  isImageLoaded
}: AssetItemProps) {
  const fileName = getAssetFileName(asset);
  const aspectRatio = calculateAspectRatio(asset);
  const metadata = getAssetMetadata(asset);
  const menuItems = getAssetMenuItems({ asset, onAssetDoubleClick });

  return (
    <div
      style={{
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: `${240 * aspectRatio}px`,
        minWidth: 0
      }}
    >
      <ContentBlock
        type="asset"
        id={asset.id}
        title={fileName}
        thumbnailUrl={asset.assets.image}
        previewVideoUrl={asset.type === 'video' ? asset.assets.previewVideo : undefined}
        aspectRatio={aspectRatio}
        onDoubleClick={() => onAssetDoubleClick(asset.id)}
        menuItems={menuItems}
        metadata={metadata}
        onImageLoad={() => onImageLoad(asset.id)}
        isImageLoaded={isImageLoaded}
      />
    </div>
  );
} 