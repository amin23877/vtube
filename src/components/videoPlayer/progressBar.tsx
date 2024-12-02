import { formatDuration } from "@/utils/numberHelper";
import { RefObject } from "react";

export default function ProgressBar({
  seekVideo,
  progress,
  videoRef,
}: {
  seekVideo: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  progress: number;
  videoRef: RefObject<HTMLVideoElement>;
}) {
  return (
    <div className="flex items-center mb-3 px-6 text-[12px]">
      {Boolean(videoRef?.current?.currentTime) &&
        formatDuration(videoRef?.current?.currentTime as number)}
      <div className="flex-1 p-2">
        <div
          onClick={seekVideo}
          className="h-1 bg-gray-700 cursor-pointer rounded flex"
        >
          <div
            className="h-1 bg-yellow-400 rounded"
            style={{ width: `${progress}%` }}
          />
          <div className="h-2 w-2 rounded-full -translate-y-0.5 bg-white"></div>
        </div>
      </div>
      {Boolean(videoRef?.current?.duration) &&
        formatDuration(videoRef?.current?.duration as number)}
    </div>
  );
}
