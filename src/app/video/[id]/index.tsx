"use client";

import VideoPlayer from "@/components/videoPlayer";
import VideoDetails from "./VideoDetails";
import { IDownloadResponse } from "@/app/types";
import { useEffect, useState } from "react";
import { downloadSpecificQuality } from "@/api/download";

function VideoPage({ id, data }: { id: string; data: IDownloadResponse }) {
  const [itag, setItag] = useState<number>(data.itag);
  const [audioItag, setAudioItag] = useState<number>(data.itag);

  useEffect(() => {
    downloadSpecificQuality(id, true).then((resp) => {
      setAudioItag(resp.itag);
    });
  }, [id, setAudioItag]);

  return (
    <>
      <VideoPlayer
        id={id}
        poster={data.thumbnail_url}
        itag={itag}
        setItag={setItag}
        audioItag={audioItag}
      />
      <VideoDetails data={data} audioItag={audioItag} id={id} itag={itag} />
    </>
  );
}

export default VideoPage;
