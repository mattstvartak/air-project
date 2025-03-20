interface GridItem {
  width: number;
  height: number;
}

interface RowItem<T extends GridItem> {
  item: T;
  width: number;
}

interface Row<T extends GridItem> {
  items: RowItem<T>[];
  height: number;
}

/**
 * Calculates rows of items maintaining aspect ratios and filling container width
 * @param items - Array of items with width and height properties
 * @param containerWidth - Width of the container
 * @param targetHeight - Desired height for each row
 * @param spacing - Gap between items (in pixels)
 * @returns Array of rows with calculated item widths
 */
export function calculateRows<T extends GridItem>(
  items: T[],
  containerWidth: number,
  targetHeight: number,
  spacing: number = 16
): Row<T>[] {
  const rows: Row<T>[] = [];
  let currentRow: RowItem<T>[] = [];
  let currentRowWidth = 0;

  items.forEach((item) => {
    const width = (targetHeight * item.width) / item.height;
    const itemWithSpacing = width + spacing;

    if (currentRowWidth + itemWithSpacing > containerWidth) {
      // Adjust widths to fill the row completely
      const scale = (containerWidth - (currentRow.length - 1) * spacing) / (currentRowWidth - spacing);
      rows.push({
        items: currentRow.map(rowItem => ({
          ...rowItem,
          width: rowItem.width * scale
        })),
        height: targetHeight
      });
      currentRow = [];
      currentRowWidth = 0;
    }

    currentRow.push({ item, width });
    currentRowWidth += itemWithSpacing;
  });

  // Handle the last row
  if (currentRow.length > 0) {
    const scale = (containerWidth - (currentRow.length - 1) * spacing) / (currentRowWidth - spacing);
    rows.push({
      items: currentRow.map(rowItem => ({
        ...rowItem,
        width: rowItem.width * scale
      })),
      height: targetHeight
    });
  }

  return rows;
} 