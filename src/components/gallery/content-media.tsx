import { formatDuration } from "@/utils/format";
import { ContentMediaProps } from "@/types";

export function ContentMedia({
  isVideo,
  isHovered,
  showOverlay,
  thumbnailUrl,
  previewVideoUrl,
  videoRef,
  duration,
}: ContentMediaProps) {
  return (
    <>
      {/* Background media */}
      <div className="absolute inset-0 m-[7px]">
        {isVideo && isHovered && previewVideoUrl ? (
          <video
            ref={videoRef}
            src={previewVideoUrl}
            className="absolute inset-0 rounded-sm w-full h-full object-cover"
            loop
            muted
            playsInline
          />
        ) : thumbnailUrl ? (
          <div
            className="absolute inset-0 rounded-sm bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${thumbnailUrl})` }}
          />
        ) : (
          <div className="absolute inset-0 rounded-sm flex items-center justify-center text-gray-400">
            No Preview
          </div>
        )}
      </div>

      {/* Duration badge for video assets */}
      {isVideo && duration && (
        <div
          className={`absolute bottom-3 right-3 px-1.5 py-0.5 bg-black/60 rounded text-white text-xs transition-opacity duration-200 ${showOverlay ? "opacity-0" : "opacity-100"}`}>
          {formatDuration(duration)}
        </div>
      )}
    </>
  );
}
