import { ExternalLink, Link2, Copy, Download } from 'lucide-react';
import { Clip } from '@/app/api/clips';
import { AssetMenuItemsProps, MenuItem } from '@/types';

export function getAssetMenuItems({ asset, onAssetDoubleClick }: AssetMenuItemsProps): MenuItem[] {
  const fileName = asset.title || asset.importedName || 'Untitled';
  
  return [
    {
      label: 'Open',
      icon: <ExternalLink className="mr-2 h-4 w-4" />,
      onClick: () => onAssetDoubleClick(asset.id)
    },
    {
      label: 'Share link',
      icon: <Link2 className="mr-2 h-4 w-4" />,
      onClick: () => navigator.clipboard.writeText(asset.assets.image)
    },
    {
      label: 'Copy to workspace',
      icon: <Copy className="mr-2 h-4 w-4" />,
      onClick: () => console.log('Copy to workspace:', asset.id)
    },
    {
      label: 'Download',
      icon: <Download className="mr-2 h-4 w-4" />,
      onClick: () => {
        const link = document.createElement('a');
        link.href = asset.assets.image;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  ];
} 