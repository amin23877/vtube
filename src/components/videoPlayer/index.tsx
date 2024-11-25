"use client";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { getQualities } from "@/api/download";
import Image from "next/image";

import yellowPlayIcon from "@/assets/videoPlayer/yellow-play.svg";
import yellowPauseIcon from "@/assets/videoPlayer/yellow-pause.svg";
import whitePlayIcon from "@/assets/videoPlayer/white-play.svg";
import whitePauseIcon from "@/assets/videoPlayer/white-pause.svg";
import forwardIcon from "@/assets/videoPlayer/forward.svg";
import FullScreen from "./fullScreen";
import ProgressBar from "./progressBar";
import Volume from "./volume";
import Setting from "./setting";

type IVideoPlayer = {
  id: string;
  poster: string;
};

export default function VideoPlayer({ id, poster }: IVideoPlayer) {
  const { data } = useSWR(id, getQualities);

  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [itag, setItag] = useState<number>();
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [playbackState, setPlaybackState] = useState<
    "playing" | "paused" | "loading"
  >("paused");
  const [progress, setProgress] = useState<number>(0);
  const [showPlayPauseButton, setShowPlayPauseButton] = useState<boolean>(true);
  const [fullScreen, setFullScreen] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(1);

  const handlePlay = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (videoRef.current) {
      setPlaybackState("loading");
      Promise.all([videoRef.current?.play()])
        .then(() => {
          setPlaybackState("playing");
          setShowPlayPauseButton(true);
          setTimeout(() => setShowPlayPauseButton(false), 1000); // Hide after 2 seconds
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

  // Stop both video and audio if one of them stops
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
      setProgress((currentTime / duration) * 100);
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

  // Attach event listeners for synchronization
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

  const button =
    "p-2 rounded-full hover:bg-opacity-15 transition-all duration-300 hover:bg-gray-100";

  return (
    <div
      dir="ltr"
      ref={containerRef}
      className="rounded-3xl relative w-full h-fit bg-black overflow-hidden dir"
      style={{
        aspectRatio: "16/9",
        height: fullScreen ? "auto" : "calc(100vh - 100px - 2.5rem)",
      }}
      onClick={playbackState === "paused" ? handlePlay : handlePause}
    >
      {/* Video Element */}
      <div className="relative rounded-lg overflow-hidden">
        <video
          poster={`${process.env.NEXT_PUBLIC_HOST}youtube/proxy-thumbnail?thumbnail_url=${poster}`}
          style={{
            aspectRatio: "16/9",
            height: fullScreen ? "auto" : "calc(100vh - 100px - 2.5rem)",
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
            itag ? "&itag=" + itag : ""
          }`}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            className={`relative p-4 bg-black bg-opacity-50 rounded-full flex justify-center items-center transition-opacity duration-500 ${
              showPlayPauseButton ? "opacity-100" : "opacity-0"
            }`}
          >
            {playbackState === "loading" && (
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
              src={
                playbackState === "paused" ? yellowPlayIcon : yellowPauseIcon
              }
              alt={playbackState === "paused" ? "play-icon" : "pause-icon"}
              width="25"
              height="25"
            />
          </button>
        </div>
        {/* Controls */}
        <div className="controls-linear-gradient absolute bottom-0 w-full rounded-lg">
          <div className="flex items-center justify-between px-4 py-2 mb-0.5">
            <div className="flex items-center gap-2">
              <button
                className={`${button} ${
                  playbackState === "paused" ? "pl-3" : ""
                }`}
              >
                <Image
                  width={20}
                  height={20}
                  src={
                    playbackState === "paused" ? whitePlayIcon : whitePauseIcon
                  }
                  alt={
                    playbackState === "paused"
                      ? "white-play-icon"
                      : "white-pause-icon"
                  }
                />
              </button>
              <button onClick={handleForward} className={button}>
                <Image src={forwardIcon} alt="forward-icon" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <Setting
                itag={itag}
                button={button}
                data={data}
                setItag={setItag}
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
      </div>

      {/* Audio Element */}
    </div>
  );
}
