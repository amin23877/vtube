import Image from "next/image";
import yellowPlayIcon from "@/assets/videoPlayer/yellow-play.svg";
import yellowPauseIcon from "@/assets/videoPlayer/yellow-pause.svg";

export default function CenterButton({
  showPlayPauseButton,
  cqLoading,
  playbackState,
}: {
  showPlayPauseButton: boolean;
  cqLoading: boolean;
  playbackState: "playing" | "paused" | "loading";
}) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <button
        className={`relative p-4 bg-black bg-opacity-50 rounded-full flex justify-center items-center transition-opacity duration-500 ${
          showPlayPauseButton || cqLoading ? "opacity-100" : "opacity-0"
        }`}
      >
        {(playbackState === "loading" || cqLoading) && (
          <div
            className="absolute loader bg-yellow"
            style={{
              width: "calc(100% + 8px)",
              height: "calc(100% + 8px)",
              borderColor: "#d9c3134d",
              borderTop: "4px solid #d9c313",
            }}
          ></div>
        )}
        <Image
          className={playbackState === "paused" ? "translate-x-px" : ""}
          src={playbackState === "paused" ? yellowPlayIcon : yellowPauseIcon}
          alt={playbackState === "paused" ? "play-icon" : "pause-icon"}
          width="25"
          height="25"
        />
      </button>
    </div>
  );
}
