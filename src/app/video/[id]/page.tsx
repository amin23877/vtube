import { downloadForServer } from "@/api/download";
import { IDownloadResponse } from "@/app/types";
import VideoPage from ".";

type IParams = {
  id: string;
};

export default async function Video({ params }: { params: IParams }) {
  const { id } = await params;
  const data: IDownloadResponse = await downloadForServer(id);

  if (!data) return <></>;

  return (
    <div className="px-10">
      <VideoPage id={id} data={data} />
    </div>
  );
}
