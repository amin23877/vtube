import { channelData } from "@/api/channel";
import { downloadForServer } from "@/api/download";
import VideoPlayer from "@/components/VideoPlayer";

type IParams = {
  id: string;
};

export default async function Video({ params }: { params: IParams }) {
  const { id, author } = await params;
  const resp = await downloadForServer(id);

  const { thumbnail_url, title, views } = resp;
  const { itag, resolution, filesize } = resp.stream_item;

  const channel = await channelData(author);
  //channel data needs to add to page under title
  return (
    <div className="px-10">
      <VideoPlayer id={id} />
      <p className="py-4 text-3xl font-medium" dir="auto">
        {title}
      </p>
    </div>
  );
}
