"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import yellowPlayIcon from "@/assets/videoPlayer/yellow-play.svg";
import whitePlayIcon from "@/assets/videoPlayer/white-play.svg";
import volumeHighIcon from "@/assets/videoPlayer/volume-high.svg";
import fullScreenIcon from "@/assets/videoPlayer/full-screen.svg";
import forwardIcon from "@/assets/videoPlayer/forward.svg";

interface VideoPlayerProps {
  videoApiUrl: string;
  audioApiUrl: string;
}

export default function VideoPlayer({
  videoApiUrl,
  audioApiUrl,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [playbackState, setPlaybackState] = useState<
    "playing" | "paused" | "loading"
  >("paused");
  const [progress, setProgress] = useState<number>(0);

  const handlePlay = () => {
    if (videoRef.current && audioRef.current) {
      setPlaybackState("loading");
      Promise.all([videoRef.current.play(), audioRef.current.play()])
        .then(() => setPlaybackState("playing"))
        .catch(() => setPlaybackState("paused"));
    }
  };

  const handlePause = () => {
    if (videoRef.current && audioRef.current) {
      videoRef.current.pause();
      audioRef.current.pause();
      setPlaybackState("paused");
    }
  };

  const handleVolumeToggle = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  };

  // Stop both video and audio if one of them stops
  const synchronizePlayback = () => {
    if (videoRef.current && audioRef.current) {
      videoRef.current.pause();
      audioRef.current.pause();
      setPlaybackState("paused");
    }
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
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
    if (videoRef.current) {
      const rect = (e.target as HTMLDivElement).getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newTime = (clickX / rect.width) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
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
    const audio = audioRef.current;

    const handleStopEvent = () => synchronizePlayback();

    if (video && audio) {
      video.addEventListener("ended", handleStopEvent);
      video.addEventListener("error", handleStopEvent);
      video.addEventListener("stalled", handleStopEvent);

      audio.addEventListener("ended", handleStopEvent);
      audio.addEventListener("error", handleStopEvent);
      audio.addEventListener("stalled", handleStopEvent);
    }

    return () => {
      if (video && audio) {
        video.removeEventListener("ended", handleStopEvent);
        video.removeEventListener("error", handleStopEvent);
        video.removeEventListener("stalled", handleStopEvent);

        audio.removeEventListener("ended", handleStopEvent);
        audio.removeEventListener("error", handleStopEvent);
        audio.removeEventListener("stalled", handleStopEvent);
      }
    };
  }, []);

  const button =
    "p-2 rounded-full hover:bg-opacity-15 transition-all duration-300 hover:bg-gray-100";

  return (
    <div
      ref={containerRef}
      className='rounded-3xl relative w-full h-full bg-black overflow-hidden'
      style={{ maxWidth: "800px", aspectRatio: "16/9" }} // Example initial size
    >
      {/* Video Element */}
      <div className='relative rounded-lg overflow-hidden'>
        <video ref={videoRef} className='w-full rounded-lg' src={videoApiUrl} />
        <div className='absolute inset-0 flex items-center justify-center'>
          {playbackState === "paused" && (
            <button
              onClick={handlePlay}
              className='p-4 pl-5 bg-black bg-opacity-50 rounded-full flex justify-center items-center'>
              <Image
                src={yellowPlayIcon}
                alt='play-icon'
                width='25'
                height='25'
              />
            </button>
          )}
          {playbackState === "loading" && <div className='loader'></div>}
          {playbackState === "playing" && (
            <button
              onClick={handlePause}
              className='p-4 bg-black bg-opacity-50 rounded-full'>
              <Image src={whitePlayIcon} alt='pause-icon' />
            </button>
          )}
        </div>
        {/* Controls */}
        <div className='controls-linear-gradient absolute bottom-0 w-full rounded-lg'>
          <div className='flex items-center justify-between px-4 py-2 mb-0.5'>
            <div className='flex items-center gap-2'>
              <button
                onClick={playbackState === "paused" ? handlePlay : handlePause}
                className={`${button} ${
                  playbackState === "paused" ? "pl-3" : ""
                }`}>
                {playbackState === "paused" ? (
                  <Image src={whitePlayIcon} alt='white-play-icon' />
                ) : (
                  <>pause</>
                )}
              </button>
            </div>
            <div className='flex items-center gap-2'>
              <div className='relative group'>
                <button
                  onClick={handleVolumeToggle}
                  className={`text-white shadow-md focus:outline-none ${button}`}>
                  <Image src={volumeHighIcon} alt='volume-high-icon' />
                </button>
                <div className='absolute bottom100 w-full flex justify-center'>
                  <input
                    type='range'
                    min='0'
                    max='1'
                    step='0.01'
                    defaultValue='1'
                    onChange={(e) => handleVolumeChange(Number(e.target.value))}
                    className='w-0 opacity-0 group-hover:opacity-100 rotate-270 translate-x-1/2'
                  />
                </div>
              </div>
              <button onClick={toggleFullScreen} className={button}>
                <Image src={fullScreenIcon} alt='full-screen-icon' />
              </button>
            </div>
          </div>
          <div className='full-w mb-3 px-6'>
            <div
              onClick={seekVideo}
              className='h-1 bg-gray-700 cursor-pointer rounded flex'>
              <div
                className='h-1 bg-yellow-400 rounded'
                style={{ width: `${progress}%` }}
              />
              <div className='h-2 w-2 rounded-full -translate-y-0.5 bg-white'></div>
            </div>
          </div>
        </div>
      </div>

      {/* Audio Element */}
      <audio ref={audioRef} src={audioApiUrl} />
    </div>
  );
}
