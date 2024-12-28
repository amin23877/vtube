"use client";

import { sessionKey } from "@/api";
import { getCookie } from "cookies-next/client";
import Image from "next/image";
import Link from "next/link";

function ChannelSummary({
  image,
  name,
  subscribersCount,
}: {
  image: string;
  name: string;
  subscribersCount: string;
}) {
  const token = getCookie(sessionKey);
  return (
    <Link href={`/channel/${name}`} className="flex gap-4 ">
      <Image
        src={`${process.env.NEXT_PUBLIC_HOST}youtube/proxy-thumbnail?thumbnail_url=${image}&token=${token}`}
        alt={name + "avatar"}
        width={70}
        height={70}
        className="rounded-full border-white border"
      />
      <div className="flex flex-col justify-between py-2">
        <span className="text-xl font-medium">{name}</span>
        <span className="text-[#808184] text-base">{subscribersCount}</span>
      </div>
    </Link>
  );
}

export default ChannelSummary;
