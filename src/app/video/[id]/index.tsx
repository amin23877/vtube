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
  const audioUrl = useMemo(() => {
    return streams.filter((i) => i.type === "audio")[0].url;
  }, [streams]);

  const defaultVideoUrl = useMemo(() => {
    return streams.filter((i) => i.video_codec && i.audio_codec)[0].url;
  }, [streams]);

  const [videoUrl, setVideoUrl] = useState(defaultVideoUrl);
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
        md={md}
        poster={data.thumbnail_url}
        audioUrl={audioUrl}
        videoUrl={videoUrl}
        setVideoUrl={setVideoUrl}
        streams={streams}
      />
      <VideoDetails
        md={md}
        data={data}
        id={id}
        videoUrl={videoUrl}
        audioUrl={audioUrl}
      />
    </div>
  );
}

export default VideoPage;
