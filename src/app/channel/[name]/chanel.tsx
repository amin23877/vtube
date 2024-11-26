import Image from "next/image";

import { IChanelData } from "@/app/types";

export default function Chanel({ banner, channel_name }: IChanelData) {
  return (
    <Image
      src={`${process.env.NEXT_PUBLIC_HOST}youtube/proxy-thumbnail?thumbnail_url=${banner}`}
      alt={channel_name}
      style={{
        height: "calc(100vh - 100px - 2.5rem)",
        width: "100%",
        objectFit: "cover",
        borderRadius: "24px",
      }}
      width={1800}
      height={900}
    />
  );
}
