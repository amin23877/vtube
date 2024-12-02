"use client";

import { IDownloadResponse } from "@/app/types";

import CountsBadge from "@/components/Badges/Counts";

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
  md,
  audioSize,
  videoSize,
}: {
  data: IDownloadResponse;
  audioUrl: string;
  videoUrl: string;
  md: boolean;
  audioSize: number;
  videoSize: number;
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
          <DownloadAudio
            audioUrl={audioUrl}
            filename={data.title}
            filesize={audioSize}
          />
          <DownloadVideo
            videoUrl={videoUrl}
            filename={data.title}
            filesize={videoSize}
          />
        </div>
      </div>
      {<VideoDescription desc={data.description} />}
    </>
  );
}

export default VideoDetails;
