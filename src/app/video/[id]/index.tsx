"use client";

import VideoPlayer from "@/components/videoPlayer";
import VideoDetails from "./VideoDetails";
import { IDownloadResponse } from "@/app/types";
import { useEffect, useState } from "react";
import { downloadSpecificQuality } from "@/api/download";

function VideoPage({ id, data }: { id: string; data: IDownloadResponse }) {
  const [itag, setItag] = useState<number>(data.itag);
  const [audioItag, setAudioItag] = useState<number>(data.itag);
  const [md, setMd] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setMd(window.matchMedia("(max-width: 900px)").matches);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize); // Listen for window resize events
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    downloadSpecificQuality(id, true).then((resp) => {
      setAudioItag(resp.itag);
    });
  }, [id, setAudioItag]);

  return (
    <div className={md ? "px-4" : "px-10"}>
      <VideoPlayer
        md={md}
        id={id}
        poster={data.thumbnail_url}
        itag={itag}
        setItag={setItag}
        audioItag={audioItag}
      />
      <VideoDetails
        md={md}
        data={data}
        audioItag={audioItag}
        id={id}
        itag={itag}
      />
    </div>
  );
}

export default VideoPage;
