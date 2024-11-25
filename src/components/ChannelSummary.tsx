import Image from "next/image";

function ChannelSummary({
  image,
  name,
  subscribersCount,
}: {
  image: string;
  name: string;
  subscribersCount: string;
}) {
  return (
    <div className="flex gap-4 mt-8">
      <Image
        src={`${process.env.NEXT_PUBLIC_HOST}youtube/proxy-thumbnail?thumbnail_url=${image}`}
        alt={name + "avatar"}
        width={70}
        height={70}
        className="rounded-full border-white border"
      />
      <div className="flex flex-col justify-between py-2">
        <span className="text-xl font-medium">{name}</span>
        <span className="text-[#808184] text-base">{subscribersCount}</span>
      </div>
    </div>
  );
}

export default ChannelSummary;
