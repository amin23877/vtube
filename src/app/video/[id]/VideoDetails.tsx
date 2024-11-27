"use client";

import { IDownloadResponse } from "@/app/types";

import CountsBadge from "@/components/CountsBadge";

import likeIcon from "@/assets/actions/like.svg";
import viewIcon from "@/assets/actions/view.svg";
import commentIcon from "@/assets/actions/comment.svg";

import DownloadAudio from "@/components/pages/Video/DownloadAudio";
import DownloadVideo from "@/components/pages/Video/DownloadVideo";
import ChannelSummary from "@/components/ChannelSummary";
import VideoDescription from "@/components/pages/Video/Description";

function VideoDetails({
  data,
  audioUrl,
  videoUrl,
  id,
  md,
}: {
  data: IDownloadResponse;
  audioUrl: string;
  videoUrl: string;
  id: string;
  md: boolean;
}) {
  return (
    <>
      <p
        className={`py-4 ${md ? "text-lg" : "text-3xl"} font-medium`}
        dir="auto"
      >
        {data.title}
      </p>
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <ChannelSummary
          image={data.channel_thumbnail_url}
          name={data.channel_username}
          subscribersCount={data.channel_subscribers}
        />
        <div className="flex flex-wrap gap-2 h-fit">
          <CountsBadge count={data.like_count} icon={likeIcon} />
          <CountsBadge count={data.view_count} icon={viewIcon} />
          <CountsBadge count={data.comment_count} icon={commentIcon} />
          <DownloadAudio audioUrl={audioUrl} id={id} />
          <DownloadVideo videoUrl={videoUrl} id={id} />
        </div>
      </div>
      {<VideoDescription desc={data.description} />}
    </>
  );
}

export default VideoDetails;
