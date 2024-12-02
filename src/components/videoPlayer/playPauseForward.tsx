import Image from "next/image";
import whitePlayIcon from "@/assets/videoPlayer/white-play.svg";
import whitePauseIcon from "@/assets/videoPlayer/white-pause.svg";
import forwardIcon from "@/assets/videoPlayer/forward.svg";

export default function PlayPauseForward({
  button,
  playbackState,
  handleForward,
  handleBackward,
}: {
  button: string;
  playbackState: "playing" | "paused" | "loading";
  handleForward: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleBackward: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <button onClick={handleBackward} className={`${button} rotate-180`}>
        <Image src={forwardIcon} alt="forward-icon" />
      </button>
      <button
        className={`${button} ${playbackState === "paused" ? "pl-3" : ""}`}
      >
        <Image
          width={20}
          height={20}
          src={playbackState === "paused" ? whitePlayIcon : whitePauseIcon}
          alt={
            playbackState === "paused" ? "white-play-icon" : "white-pause-icon"
          }
        />
      </button>
      <button onClick={handleForward} className={button}>
        <Image src={forwardIcon} alt="forward-icon" />
      </button>
    </div>
  );
}
