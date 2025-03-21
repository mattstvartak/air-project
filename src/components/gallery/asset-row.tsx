import { Clip } from "@/app/api/clips";
import { AssetItem } from "./asset-item";
import { AssetRowProps } from "@/types";

export function AssetRow({
  assets,
  style,
  onAssetDoubleClick,
  onImageLoad,
  isImageLoaded,
  selectedAssetId,
  onAssetSelect,
}: AssetRowProps) {
  return (
    <div className="flex gap-x-2 gap-y-0 p-1" style={style}>
      {assets.map((asset) => (
        <AssetItem
          key={asset.id}
          asset={asset}
          onAssetDoubleClick={onAssetDoubleClick}
          onImageLoad={onImageLoad}
          isImageLoaded={isImageLoaded(asset.id)}
          isSelected={asset.id === selectedAssetId}
          onSelect={() => onAssetSelect(asset.id)}
        />
      ))}
    </div>
  );
}
