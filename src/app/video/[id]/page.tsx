import { downloadForServer } from "@/api/download";
import { IDownloadResponse } from "@/app/types";
import VideoPlayer from "@/components/VideoPlayer";

type IParams = {
  id: string;
};

export default async function Video({ params }: { params: IParams }) {
  const { id } = await params;
  const data: IDownloadResponse = await downloadForServer(id);

  return (
    <div className="px-10">
      <VideoPlayer id={id} />
      <p className="py-4 text-3xl font-medium" dir="auto">
        {data.title}
      </p>
    </div>
  );
}
