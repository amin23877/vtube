"use client";

import { IVideo } from "@/app/types";
import Image from "next/image";

export default function SearchVideoItem({ video }: { video: IVideo }) {
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
      console.log(x, theName);
      theName = theName.replace(x.n, x.t);
    });
    return theName;
  };

  return (
    <div className='min-w-[320px]'>
      <Image
        style={{ aspectRatio: "16/9" }}
        src={`https://wt.pool2jibi.com/youtube/get-thumbnail?thumbnail_url=${video.thumbnail_url}`}
        alt={video.title}
        width={480}
        height={270}
        className='w-full h-auto object-cover rounded-[12px]'
      />
      <h3 className='mt-2 text-lg font-semibold'>{video.title}</h3>
      <p className='text-sm text-[#808184]'>{video.author}</p>
      <span className='text-[#808184]'>
        {video.view_count.replace("views", "بازدید")} .{" "}
        {translate(video.publish_date)}
      </span>
    </div>
  );
}
