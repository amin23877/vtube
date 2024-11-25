import { downloadForServer } from "@/api/download";
import { IDownloadResponse } from "@/app/types";
import CountsBadge from "@/components/CountsBadge";
import VideoPlayer from "@/components/videoPlayer";
import likeIcon from "@/assets/actions/like.svg";
type IParams = {
  id: string;
};

export default async function Video({ params }: { params: IParams }) {
  const { id } = await params;
  const data: IDownloadResponse = await downloadForServer(id);

  console.log(data);

  return (
    <div className="px-10">
      <VideoPlayer id={id} poster={data.thumbnail_url} />
      <p className="py-4 text-3xl font-medium" dir="auto">
        {data.title}
      </p>
      <CountsBadge count={data.like_count} icon={likeIcon} />
    </div>
  );
}
