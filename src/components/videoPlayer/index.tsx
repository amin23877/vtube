/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import CenterButton from "./centerButton";
import Controls from "./controls";
import { IStreams } from "@/app/types";

type IVideoPlayer = {
  poster: string;
  audioUrl: string;
  videoUrl: string;
  setVideoUrl: Dispatch<SetStateAction<string>>;
  setResolution: Dispatch<SetStateAction<string>>;
  streams: IStreams[];
  md: boolean;
  setVideoSize: Dispatch<SetStateAction<number>>;
  audioSize: number;
  videoSize: number;
};

export default function VideoPlayer({
  md,
  poster,
  audioUrl,
  videoUrl,
  setVideoUrl,
  streams,
  setVideoSize,
  setResolution,
  audioSize,
  videoSize,
}: IVideoPlayer) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [playbackState, setPlaybackState] = useState<
    "playing" | "paused" | "loading"
  >("paused");
  const [cqLoading, setCqLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [showPlayPauseButton, setShowPlayPauseButton] = useState<boolean>(true);
  const [controlsVisible, setControlsVisible] = useState<boolean>(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [fullScreen, setFullScreen] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(1);

  const showControls = useCallback(() => {
    setControlsVisible(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (playbackState === "playing") setControlsVisible(false);
    }, 3000); // Hide controls after 3 seconds of inactivity
  }, [playbackState]);

  useEffect(() => {
    setTimeout(() => {
      if (playbackState === "playing") setControlsVisible(false);
    }, 3000);
  }, [playbackState]);

  useEffect(() => {
    const videoContainer = containerRef.current;
    if (videoContainer) {
      videoContainer.addEventListener("mousemove", showControls);
      videoContainer.addEventListener("touchstart", showControls);
    }

    return () => {
      if (videoContainer) {
        videoContainer.removeEventListener("mousemove", showControls);
        videoContainer.removeEventListener("touchstart", showControls);
      }
    };
  }, [showControls]);

  useEffect(() => {
    if (playbackState === "paused") {
      setControlsVisible(true);
    }
  }, [playbackState]);

  const handlePlay = (e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e?.stopPropagation();
    if (videoRef.current && audioRef.current) {
      setPlaybackState("loading");
      Promise.all([videoRef.current?.play(), audioRef.current.play()])
        .then(() => {
          setPlaybackState("playing");
          setShowPlayPauseButton(true);
          setCqLoading(false);
          setTimeout(() => setShowPlayPauseButton(false), 1000);
        })
        .catch(() => {
          audioRef.current?.pause();
          videoRef.current?.pause();
          setPlaybackState("paused");
        });
    }
  };

  const handlePause = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.pause();
      audioRef.current?.pause();
      setPlaybackState("paused");
      setShowPlayPauseButton(true);
    }
  };

  const handleVolumeChange = (volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
    if (videoRef.current) {
      videoRef.current.volume = volume;
      setVolume(volume);
    }
  };

  const synchronizePlayback = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      audioRef.current?.pause();
      setPlaybackState("paused");
    }
  };

  const toggleFullScreen = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();

    const container = containerRef.current;

    if (!container) {
      console.error("Container reference is missing.");
      return;
    }

    if (document && !document.fullscreenElement) {
      const requestFullScreen =
        container.requestFullscreen ||
        (container as any).webkitRequestFullscreen ||
        (container as any).mozRequestFullScreen ||
        (container as any).msRequestFullscreen;

      if (requestFullScreen) {
        requestFullScreen
          .call(container)
          .then(() => {
            setFullScreen(true);
          })
          .catch((err) => {
            console.error("Error entering fullscreen:", err);
          });
      } else {
        console.error("Fullscreen API is not supported on this device.");
      }
    } else {
      const exitFullScreen =
        document?.exitFullscreen ||
        (document as any)?.webkitExitFullscreen ||
        (document as any)?.mozCancelFullScreen ||
        (document as any)?.msExitFullscreen;

      if (exitFullScreen) {
        exitFullScreen
          .call(document)
          .then(() => {
            setFullScreen(false);
          })
          .catch((err) => {
            console.error("Error exiting fullscreen:", err);
          });
      } else {
        console.error("Fullscreen exit API is not supported on this device.");
      }
    }
  };

  const updateProgress = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      if (!isNaN(duration) && !isNaN(currentTime) && duration !== 0) {
        setProgress(() => (currentTime / duration) * 100);
      }
    }
  };

  const seekVideo = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (videoRef.current) {
      const rect = (e.target as HTMLDivElement).getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newTime =
        (clickX / e.currentTarget.offsetWidth) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
      if (audioRef.current) audioRef.current.currentTime = newTime;
    }
  };

  const seekVideoBy = (seconds: number) => {
    if (videoRef.current) {
      const newTime = Math.min(
        Math.max(videoRef.current.currentTime + seconds, 0),
        videoRef.current.duration
      );
      videoRef.current.currentTime = newTime;
      if (audioRef.current) audioRef.current.currentTime = newTime;
    }
  };

  const handleForward = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();
      seekVideoBy(10);
    },
    []
  );

  const handleBackward = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();
      seekVideoBy(-10);
    },
    []
  );

  const sinkVideoAndAudio = () => {
    const videoTime = videoRef.current?.currentTime || 0;
    const audioTime = audioRef.current?.currentTime || 0;
    if (audioRef.current && Math.abs(videoTime - audioTime) > 0.2) {
      audioRef.current.currentTime = videoTime;
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        handleForward(e as any);
      } else if (e.key === "ArrowLeft") {
        handleBackward(e as any);
      }
    };

    document?.addEventListener("keydown", handleKeyDown);

    return () => {
      document?.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleBackward, handleForward]);

  useEffect(() => {
    const video = videoRef.current;
    const handleTimeUpdate = () => {
      updateProgress();
      sinkVideoAndAudio();
    };
    if (video) {
      video.addEventListener("timeupdate", handleTimeUpdate);
    }
    return () => {
      if (video) {
        video.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    const handleStopEvent = () => synchronizePlayback();

    if (video) {
      video.addEventListener("ended", handleStopEvent);
      video.addEventListener("error", handleStopEvent);
      video.addEventListener("stalled", handleStopEvent);
    }

    return () => {
      if (video) {
        video.addEventListener("ended", handleStopEvent);
        video.addEventListener("error", handleStopEvent);
        video.addEventListener("stalled", handleStopEvent);
      }
    };
  }, []);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      const handleSourceChange = () => {
        setCqLoading(true);
        synchronizePlayback();
      };

      videoElement.addEventListener("emptied", handleSourceChange);

      return () => {
        videoElement.removeEventListener("emptied", handleSourceChange);
      };
    }
  }, []);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      const handleCanPlay = () => {
        handlePlay();
      };

      videoElement.addEventListener("canplay", handleCanPlay);

      return () => {
        videoElement.removeEventListener("canplay", handleCanPlay);
      };
    }
  }, []);

  useEffect(() => {
    const videoElement = videoRef.current;
    const audioElement = audioRef.current;

    const handleLoadedMetadata = () => {
      if (videoElement) {
        videoElement.currentTime =
          progress === 0 ? 0 : (progress * videoElement.duration) / 100;
      }
      if (audioElement) {
        audioElement.currentTime =
          progress === 0 ? 0 : (progress * audioElement.duration) / 100;
      }
      if (playbackState === "playing") {
        handlePlay();
      } else {
        setCqLoading(false);
      }
    };

    if (videoElement) {
      videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);
    }

    if (audioElement) {
      audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
      }
      if (audioElement) {
        audioElement.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
      }
    };
  }, [progress, playbackState]);

  const handleFullscreenChange = () => {
    setFullScreen(!!document?.fullscreenElement);
  };

  // Attach fullscreenchange event listener
  useEffect(() => {
    if (!document) return;
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange); // Safari
    document.addEventListener("mozfullscreenchange", handleFullscreenChange); // Firefox
    document.addEventListener("MSFullscreenChange", handleFullscreenChange); // IE/Edge

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
      );
    };
  }, []);

  const button =
    "p-2 rounded-full hover:bg-opacity-15 transition-all duration-300 hover:bg-gray-100";

  return (
    <div
      dir="ltr"
      ref={containerRef}
      className="rounded-3xl relative w-full h-fit bg-black dir"
      style={{
        aspectRatio: "16/9",
        height: fullScreen
          ? "100vh"
          : md
          ? "auto"
          : "calc(100vh - 100px - 2.5rem)",
      }}
      onClick={playbackState === "paused" ? handlePlay : handlePause}
    >
      <div className="relative rounded-lg h-full">
        <video
          muted
          poster={`${process.env.NEXT_PUBLIC_HOST}youtube/proxy-thumbnail?thumbnail_url=${poster}`}
          style={{
            aspectRatio: "16/9",
            height: fullScreen || md ? "100%" : "calc(100vh - 100px - 2.5rem)",
          }}
          ref={videoRef}
          className="w-full rounded-lg"
          src={`${
            process.env.NEXT_PUBLIC_HOST
          }youtube/proxy-video?video_url=${encodeURIComponent(
            videoUrl
          )}&filesize=${videoSize}`}
        />
        <audio
          ref={audioRef}
          src={`${
            process.env.NEXT_PUBLIC_HOST
          }youtube/proxy-audio?audio_url=${encodeURIComponent(
            audioUrl
          )}&filesize=${audioSize}`}
        />
        <CenterButton
          cqLoading={cqLoading}
          playbackState={playbackState}
          showPlayPauseButton={showPlayPauseButton}
        />
        {controlsVisible && (
          <Controls
            videoRef={videoRef}
            streams={streams}
            videoUrl={videoUrl}
            setVideoUrl={setVideoUrl}
            setResolution={setResolution}
            setVideoSize={setVideoSize}
            button={button}
            handleForward={handleForward}
            handleBackward={handleBackward}
            playbackState={playbackState}
            handleVolumeChange={handleVolumeChange}
            volume={volume}
            toggleFullScreen={toggleFullScreen}
            fullScreen={fullScreen}
            seekVideo={seekVideo}
            progress={progress}
            handleChangesrc={() => {
              setCqLoading(true);
              synchronizePlayback();
            }}
          />
        )}
      </div>
    </div>
  );
}
