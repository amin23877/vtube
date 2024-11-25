import Image from "next/image";
import maximizeIcon from "@/assets/videoPlayer/maximize.svg";
import minimizeIcon from "@/assets/videoPlayer/minimize.svg";

export default function FullScreen({
  button,
  toggleFullScreen,
  fullScreen,
}: {
  button: string;
  toggleFullScreen: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  fullScreen: boolean;
}) {
  return (
    <button onClick={toggleFullScreen} className={button}>
      <Image
        src={fullScreen ? minimizeIcon : maximizeIcon}
        alt="full-screen-icon"
      />
    </button>
  );
}
