/**
 * Formats a duration in seconds to a MM:SS format
 * @param seconds - The duration in seconds
 * @returns Formatted duration string in MM:SS format
 */
export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

/**
 * Formats a file size in bytes to a human readable format with whole numbers
 * @param bytes - The size in bytes
 * @returns Formatted size string (e.g., "2 MB")
 */
export function formatFileSize(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${Math.ceil(size)} ${units[unitIndex]}`;
} 