"use client";

import ButtonBadge from "@/components/ButtonBadge";

import musicIcon from "@/assets/actions/music.svg";
import musicHoverIcon from "@/assets/actions/musicHover.svg";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { downloadStatus } from "@/api/download";

function DownloadAudio({ audioItag, id }: { audioItag: number; id: string }) {
  const [stop, setStop] = useState(false);

  const { data, isLoading, error } = useSWR(
    stop ? null : { id, itag: audioItag },
    downloadStatus,
    {
      refreshInterval: 1000,
    }
  );

  useEffect(() => {
    if (data?.progress === "100.00 %") {
      setStop(true);
    }
  }, [data]);

  const handleDownloadAudio = () => {
    const downloadLink = `${process.env.NEXT_PUBLIC_HOST}youtube/video-stream?video_id=${id}&itag=${audioItag}&media_type=AUDIO`;
    const link = document.createElement("a");
    link.href = downloadLink;
    link.download = `video_${id}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <ButtonBadge
        disabled={isLoading || !stop || error}
        onClick={handleDownloadAudio}
        title={"دانلود صدا"}
        icon={musicIcon}
        hoverIcon={musicHoverIcon}
      />
    </>
  );
}

export default DownloadAudio;
