"use client";

import VideoPlayer from "@/components/videoPlayer";
import VideoDetails from "./VideoDetails";
import { IDownloadResponse, IStreams } from "@/app/types";
import { useEffect, useMemo, useState } from "react";

function VideoPage({
  id,
  data,
  streams,
}: {
  id: string;
  data: IDownloadResponse;
  streams: IStreams[];
}) {
  const audio = useMemo(() => {
    const firstAudio = streams.filter((i) => i.type === "audio")[0];
    return { url: firstAudio.url, filesize: firstAudio.filesize };
  }, [streams]);

  const defaultVideoUrl = useMemo(() => {
    const firstVideo = streams.filter((i) => i.type === "video")[0];
    return { url: firstVideo.url, filesize: firstVideo.filesize };
  }, [streams]);

  const [videoUrl, setVideoUrl] = useState(defaultVideoUrl.url);
  const [videoSize, setVideoSize] = useState(defaultVideoUrl.filesize);
  const [md, setMd] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setMd(window.matchMedia("(max-width: 900px)").matches);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize); // Listen for window resize events
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={md ? "px-4" : "px-10"}>
      <VideoPlayer
        videoSize={videoSize}
        audioSize={audio.filesize}
        md={md}
        poster={data.thumbnail_url}
        audioUrl={audio.url}
        videoUrl={videoUrl}
        setVideoUrl={setVideoUrl}
        streams={streams}
        setVideoSize={setVideoSize}
      />
      <VideoDetails
        md={md}
        data={data}
        id={id}
        videoUrl={videoUrl}
        audioUrl={audio.url}
        audioSize={audio.filesize}
        videoSize={videoSize}
      />
    </div>
  );
}

export default VideoPage;
