import { getQualities, videoInfo } from "@/api/download";
import { IDownloadResponse, IStreams } from "@/app/types";
import VideoPage from ".";

type IParams = Promise<{
  id: string;
}>;

export default async function Video({ params }: { params: IParams }) {
  const { id } = await params;
  const data: IDownloadResponse = await videoInfo(id);
  const streams: IStreams[] = await getQualities(id);
  if (!data) return <></>;

  return <VideoPage id={id} data={data} streams={streams} />;
}
