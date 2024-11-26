export default function ProgressBar({
  seekVideo,
  progress,
}: {
  seekVideo: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  progress: number;
}) {
  return (
    <div className="full-w mb-3 px-6">
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
  );
}
