/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

import CenterButton from "./centerButton";
import Controls from "./controls";
import { IStreams } from "@/app/types";

type IVideoPlayer = {
  poster: string;
  audioUrl: string;
  videoUrl: string;
  setVideoUrl: Dispatch<SetStateAction<string>>;
  streams: IStreams[];
  md: boolean;
};

export default function VideoPlayer({
  md,
  poster,
  audioUrl,
  videoUrl,
  setVideoUrl,
  streams,
}: IVideoPlayer) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isLoadingNewRes, setIsLoadingNewRes] = useState<boolean>(false);
  const [playbackState, setPlaybackState] = useState<
    "playing" | "paused" | "loading"
  >("paused");
  const [cqLoading, setCqLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [showPlayPauseButton, setShowPlayPauseButton] = useState<boolean>(true);
  const [fullScreen, setFullScreen] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(1);

  const handlePlay = (e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e?.stopPropagation();
    if (videoRef.current) {
      setPlaybackState("loading");
      Promise.all([videoRef.current?.play()])
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

    if (!document.fullscreenElement) {
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
        document.exitFullscreen ||
        (document as any).webkitExitFullscreen ||
        (document as any).mozCancelFullScreen ||
        (document as any).msExitFullscreen;

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

  const handleForward = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (videoRef.current) {
      const duration = videoRef.current.duration;
      if (duration - 10 > videoRef.current.currentTime) {
        videoRef.current.currentTime += 10;
        if (audioRef.current) audioRef.current.currentTime += 10;
      } else {
        videoRef.current.currentTime = duration;
        if (audioRef.current) audioRef.current.currentTime = duration;
      }
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener("timeupdate", updateProgress);
    }
    return () => {
      if (video) {
        video.removeEventListener("timeupdate", updateProgress);
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
    const handleLoadedMetadata = () => {
      if (videoRef.current) {
        videoRef.current.currentTime =
          progress === 0 ? 0 : (progress * videoRef.current.duration) / 100;
      }
      if (audioRef.current) {
        audioRef.current.currentTime =
          progress === 0 ? 0 : (progress * audioRef.current.duration) / 100;
      }
      if (playbackState === "playing") {
        handlePlay();
      } else {
        setCqLoading(false);
      }
    };

    if (videoRef.current) {
      // Attach the event listener to wait for duration to be available
      videoRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
    }

    if (audioRef.current) {
      audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
    }

    // Cleanup the event listener
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
      }
      if (audioRef.current) {
        audioRef.current.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
      }
    };
  }, [isLoadingNewRes, progress, playbackState]);

  const handleFullscreenChange = () => {
    setFullScreen(!!document.fullscreenElement);
  };

  // Attach fullscreenchange event listener
  useEffect(() => {
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
          poster={`${process.env.NEXT_PUBLIC_HOST}youtube/proxy-thumbnail?thumbnail_url=${poster}`}
          style={{
            aspectRatio: "16/9",
            height: fullScreen || md ? "auto" : "calc(100vh - 100px - 2.5rem)",
          }}
          ref={videoRef}
          className="w-full rounded-lg"
          src={`${process.env.NEXT_PUBLIC_HOST}youtube/proxy-video?video_url=${videoUrl}`}
        />
        <audio
          ref={audioRef}
          src={`${process.env.NEXT_PUBLIC_HOST}youtube/proxy-audio?audio_url=${audioUrl}`}
        />
        <CenterButton
          cqLoading={cqLoading}
          playbackState={playbackState}
          showPlayPauseButton={showPlayPauseButton}
        />
        <Controls
          streams={streams}
          videoUrl={videoUrl}
          setVideoUrl={setVideoUrl}
          button={button}
          handleForward={handleForward}
          playbackState={playbackState}
          handleVolumeChange={handleVolumeChange}
          volume={volume}
          toggleFullScreen={toggleFullScreen}
          fullScreen={fullScreen}
          seekVideo={seekVideo}
          progress={progress}
        />
      </div>
    </div>
  );
}
