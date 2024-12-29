"use client";

import { sessionKey } from "@/api";
import { IVideo } from "@/types/types";
import { getCookie } from "cookies-next/client";
import Image from "next/image";

export default function SearchVideoItem({
  video,
  sm,
}: {
  video: IVideo;
  sm: boolean;
}) {
  const token = getCookie(sessionKey);

  const translateList = [
    { n: "seconds", t: "ثانیه" },
    { n: "second", t: "ثانیه" },
    { n: "hours", t: "ساعت" },
    { n: "hour", t: "ساعت" },
    { n: "minutes", t: "دقیقه" },
    { n: "minute", t: "دقیقه" },
    { n: "days", t: "روز" },
    { n: "day", t: "روز" },
    { n: "weeks", t: "هفته" },
    { n: "week", t: "هفته" },
    { n: "months", t: "ماه" },
    { n: "month", t: "ماه" },
    { n: "years", t: "سال" },
    { n: "year", t: "سال" },
    { n: "ago", t: "پیش" },
  ];

  const translate = (name: string) => {
    let theName = name;
    translateList.map((x) => {
      theName = theName?.replace(x.n, x.t);
    });
    return theName;
  };

  return (
    <div
      className={`${sm ? "min-w-[320px] w-full" : "min-w-[320px] max-w-sm"}`}
    >
      <Image
        style={{ aspectRatio: "16/9" }}
        src={`${process.env.NEXT_PUBLIC_HOST}youtube/proxy-thumbnail?thumbnail_url=${video.thumbnail_url}&token=${token}`}
        alt={video.title}
        width={480}
        height={270}
        className="w-full h-auto object-cover rounded-[12px]"
      />
      <h3
        className="w-full mt-2 text-lg font-semibold"
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "clip",
        }}
      >
        {video.title}
      </h3>
      <p
        className="w-full text-sm text-[#808184]"
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "clip",
        }}
      >
        {video.channel_username}
      </p>
      <span className="text-[#808184]">
        {video.view_count?.replace("views", "بازدید")} .{" "}
        {translate(video.publish_date || "")}
      </span>
    </div>
  );
}
