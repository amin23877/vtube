"use client";
import Image from "next/image";
import { IChanelData } from "@/app/types";
import ChannelSummary from "@/components/ChannelSummary";
import TypeTab from "./typeTab";
import { useState } from "react";
import Videos from "./videos";
import Shorts from "./shorts";

export default function Chanel({
  banner,
  channel_name,
  thumbnail,
  total_subscribers,
  total_videos,
}: IChanelData) {
  const [type, setType] = useState<React.Key>("videos");
  return (
    <div className="p-[36px] pt-0 pb-4">
      <Image
        src={`${process.env.NEXT_PUBLIC_HOST}youtube/proxy-thumbnail?thumbnail_url=${banner}`}
        alt={channel_name}
        className="mb-4"
        style={{
          height: "auto",
          width: "100%",
          aspectRatio: "13/2",
          objectFit: "cover",
          borderRadius: "24px",
        }}
        width={1950}
        height={300}
      />
      <ChannelSummary
        image={thumbnail}
        name={channel_name}
        subscribersCount={`${total_subscribers} مشترک - ${total_videos} ویدیو`}
      />
      <TypeTab setType={setType} />
      {type === "videos" ? (
        <Videos name={channel_name} />
      ) : (
        <Shorts name={channel_name} />
      )}
    </div>
  );
}
