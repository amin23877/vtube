"use client";

import { IDownloadResponse } from "@/app/types";

import CountsBadge from "@/components/CountsBadge";

import likeIcon from "@/assets/actions/like.svg";
import viewIcon from "@/assets/actions/view.svg";
import commentIcon from "@/assets/actions/comment.svg";

import DownloadAudio from "./DownloadAudio";
import DownloadVideo from "./DownloadVideo";

function VideoDetails({
  data,
  audioItag,
  id,
  itag,
}: {
  data: IDownloadResponse;
  audioItag: number;
  id: string;
  itag: number;
}) {
  return (
    <>
      <p className="py-4 text-3xl font-medium" dir="auto">
        {data.title}
      </p>
      <div className="flex flex-wrap gap-2">
        <CountsBadge count={data.like_count} icon={likeIcon} />
        <CountsBadge count={data.view_count} icon={viewIcon} />
        <CountsBadge count={data.comment_count} icon={commentIcon} />
        <DownloadAudio audioItag={audioItag} id={id} />
        <DownloadVideo itag={itag} id={id} />
      </div>
    </>
  );
}

export default VideoDetails;
