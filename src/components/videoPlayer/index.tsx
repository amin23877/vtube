"use client";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { getQualities } from "@/api/download";

import CenterButton from "./centerButton";
import Controls from "./controls";

type IVideoPlayer = {
  id: string;
  poster: string;
  itag: number;
  setItag: Dispatch<SetStateAction<number>>;
  audioItag: number;
  md: boolean;
};

export default function VideoPlayer({
  id,
  md,
  poster,
  itag,
  setItag,
  audioItag,
}: IVideoPlayer) {
  const { data } = useSWR(id, getQualities);

  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isLoadingNewRes, setIsLoadingNewRes] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
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

  const handleVolumeToggle = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
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
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setFullScreen(true);
    } else {
      document.exitFullscreen();
      setFullScreen(false);
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

  const button =
    "p-2 rounded-full hover:bg-opacity-15 transition-all duration-300 hover:bg-gray-100";

  return (
    <div
      dir="ltr"
      ref={containerRef}
      className="rounded-3xl relative w-full h-fit bg-black overflow-hidden dir"
      style={{
        aspectRatio: "16/9",
        height: fullScreen || md ? "auto" : "calc(100vh - 100px - 2.5rem)",
      }}
      onClick={playbackState === "paused" ? handlePlay : handlePause}
    >
      <div className="relative rounded-lg overflow-hidden">
        <video
          poster={`${process.env.NEXT_PUBLIC_HOST}youtube/proxy-thumbnail?thumbnail_url=${poster}`}
          style={{
            aspectRatio: "16/9",
            height: fullScreen || md ? "auto" : "calc(100vh - 100px - 2.5rem)",
          }}
          ref={videoRef}
          className="w-full rounded-lg"
          src={`${
            process.env.NEXT_PUBLIC_HOST
          }youtube/video-stream?video_id=${id}&media_type=VIDEO${
            itag ? "&itag=" + itag : ""
          }`}
        />
        <audio
          ref={audioRef}
          src={`${
            process.env.NEXT_PUBLIC_HOST
          }youtube/video-stream?video_id=${id}&media_type=AUDIO${
            audioItag ? "&itag=" + audioItag : ""
          }`}
        />
        <CenterButton
          cqLoading={cqLoading}
          playbackState={playbackState}
          showPlayPauseButton={showPlayPauseButton}
        />
        <Controls
          button={button}
          handleForward={handleForward}
          playbackState={playbackState}
          itag={itag}
          data={data}
          setItag={setItag}
          id={id}
          setIsLoading={setIsLoadingNewRes}
          setCqLoading={setCqLoading}
          isLoading={isLoadingNewRes}
          handleVolumeChange={handleVolumeChange}
          handleVolumeToggle={handleVolumeToggle}
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
