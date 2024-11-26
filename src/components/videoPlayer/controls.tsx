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
  data = [],
  setItag,
  itag,
  id,
  setIsLoading,
  setCqLoading,
  isLoading,
  handleVolumeToggle,
  handleVolumeChange,
  volume,
  toggleFullScreen,
  fullScreen,
  seekVideo,
  progress,
}: IControls) {
  return (
    <div className="controls-linear-gradient absolute bottom-0 w-full rounded-lg">
      <div className="flex items-center justify-between px-4 py-2 mb-0.5">
        <PlayPauseForward
          button={button}
          handleForward={handleForward}
          playbackState={playbackState}
        />
        <div className="flex items-center gap-2">
          <Setting
            itag={itag}
            button={button}
            data={data}
            setItag={setItag}
            id={id}
            setIsLoading={setIsLoading}
            setCqLoading={setCqLoading}
            isLoading={isLoading}
          />
          <Volume
            handleVolumeChange={handleVolumeChange}
            handleVolumeToggle={handleVolumeToggle}
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
      <ProgressBar seekVideo={seekVideo} progress={progress} />
    </div>
  );
}