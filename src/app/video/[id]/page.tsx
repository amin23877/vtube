import { downloadForServer } from "@/api/download";
import VideoPlayer from "@/components/VideoPlayer";

type IParams = {
  id: string;
};

export default async function Video({ params }: { params: IParams }) {
  const { id } = await params;
  const resp = await downloadForServer(id);
  const { thumbnail_url, channel_id, title, views } = resp;
  const { itag, resolution, filesize } = resp.stream_item;
  return (
    <div className="px-10">
      <VideoPlayer id={id} />
      <p className="py-4 text-3xl font-medium" dir="auto">
        {title}
      </p>
    </div>
  );
}
