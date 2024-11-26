import { downloadForServer } from "@/api/download";
import { IDownloadResponse } from "@/app/types";
import VideoPage from ".";

type IParams = Promise<{
  id: string;
}>;

export default async function Video({ params }: { params: IParams }) {
  const { id } = await params;
  const data: IDownloadResponse = await downloadForServer(id);

  if (!data) return <></>;

  return <VideoPage id={id} data={data} />;
}
