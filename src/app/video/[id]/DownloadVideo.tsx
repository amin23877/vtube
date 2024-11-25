"use client";

import ButtonBadge from "@/components/ButtonBadge";

import { useEffect, useState } from "react";
import useSWR from "swr";
import { downloadStatus } from "@/api/download";

import downloadIcon from "@/assets/actions/download.svg";
import downloadHoverIcon from "@/assets/actions/downloadHover.svg";

function DownloadVideo({ itag, id }: { itag: number; id: string }) {
  const [stop, setStop] = useState(false);

  const { data, isLoading, error, mutate } = useSWR(
    stop ? null : { id, itag },
    downloadStatus,
    {
      refreshInterval: 500,
    }
  );

  useEffect(() => {
    if (data?.progress === "100.00 %") {
      setStop(true);
    }
  }, [data]);

  useEffect(() => {
    setStop(false);
    mutate({ id, itag });
  }, [mutate, itag, id]);

  const handleDownloadVideo = () => {
    const downloadLink = `${process.env.NEXT_PUBLIC_HOST}youtube/video-stream?video_id=${id}&itag=${itag}&media_type=VIDEO`;
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
        onClick={handleDownloadVideo}
        title={"دانلود ویدیو"}
        icon={downloadIcon}
        hoverIcon={downloadHoverIcon}
      />
    </>
  );
}

export default DownloadVideo;
