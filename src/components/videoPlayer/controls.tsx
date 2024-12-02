import FullScreen from "./fullScreen";
import ProgressBar from "./progressBar";
import Volume from "./volume";
import Setting from "./setting";
import PlayPauseForward from "./playPauseForward";
import { IControls } from "@/app/types";

export default function Controls({
  button,
  playbackState,
  handleForward,

  handleVolumeChange,
  volume,
  toggleFullScreen,
  fullScreen,
  seekVideo,
  progress,

  streams,
  videoUrl,
  setVideoUrl,
  setVideoSize,
  handleChangesrc,
  videoRef,
  handleBackward,
}: IControls) {
  return (
    <div className="controls-linear-gradient absolute bottom-0 w-full rounded-lg">
      <div className="flex items-center justify-between px-4 py-2 mb-0.5">
        <PlayPauseForward
          button={button}
          handleForward={handleForward}
          playbackState={playbackState}
          handleBackward={handleBackward}
        />
        <div className="flex items-center gap-2">
          <Setting
            fullScreen={fullScreen}
            button={button}
            streams={streams}
            videoUrl={videoUrl}
            setVideoUrl={setVideoUrl}
            setVideoSize={setVideoSize}
            handleChangesrc={handleChangesrc}
          />
          <Volume
            handleVolumeChange={handleVolumeChange}
            button={button}
            volume={volume}
          />
          <FullScreen
            toggleFullScreen={toggleFullScreen}
            button={button}
            fullScreen={fullScreen}
          />
        </div>
      </div>
      <ProgressBar
        videoRef={videoRef}
        seekVideo={seekVideo}
        progress={progress}
      />
    </div>
  );
}
