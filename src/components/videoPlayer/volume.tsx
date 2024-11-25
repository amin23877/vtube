import Image from "next/image";
import volumeHighIcon from "@/assets/videoPlayer/volume-high.svg";
import volumeLowIcon from "@/assets/videoPlayer/volume-low.svg";
import noVolumeIcon from "@/assets/videoPlayer/no-volume.svg";

export default function Volume({
  handleVolumeToggle,
  handleVolumeChange,
  button,
  volume,
}: {
  handleVolumeToggle: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  handleVolumeChange: (e: number) => void;
  button: string;
  volume: number;
}) {
  return (
    <div className="relative group">
      <button
        onClick={handleVolumeToggle}
        className={`text-white shadow-md focus:outline-none ${button}`}
      >
        <Image
          src={
            volume === 0
              ? noVolumeIcon
              : volume < 0.5
              ? volumeLowIcon
              : volumeHighIcon
          }
          alt="volume-high-icon"
        />
      </button>
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute bottom100 w-full flex justify-center"
      >
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          defaultValue="1"
          onChange={(e) => {
            handleVolumeChange(Number(e.target.value));
          }}
          className="w-0 opacity-0 group-hover:opacity-100 rotate-270 translate-x-1/2"
        />
      </div>
    </div>
  );
}
