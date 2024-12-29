"use client";
import { sessionKey } from "@/api";
import { IShort } from "@/types/types";
import { getCookie } from "cookies-next/client";
import Image from "next/image";

export default function ShortItem({
  thumbnail_url,
  title,
  view_count,
}: IShort) {
  const token = getCookie(sessionKey);

  return (
    <div className="flex-1 w-full min-w-[210px]">
      <Image
        width={1000}
        height={1500}
        style={{
          width: "100%",
          minWidth: "210px",
          height: "auto",
          aspectRatio: "3/5",
          objectFit: "cover",
        }}
        src={`${process.env.NEXT_PUBLIC_HOST}youtube/proxy-thumbnail?thumbnail_url=${thumbnail_url}&token=${token}`}
        alt=""
      />
      <p
        className="w-full text-md mt-2"
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "clip",
        }}
      >
        {title}
      </p>
      <p
        className="w-full text-md text-[#808184]"
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "clip",
        }}
      >
        {view_count} بازدید
      </p>
    </div>
  );
}
