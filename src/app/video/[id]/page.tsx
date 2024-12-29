import { getQualities, videoInfo } from "@/api/download";
import { IDownloadResponse, IStreams } from "@/types/types";
import VideoPage from "../../../features/video";
import { cookies } from "next/headers";
import { sessionKey } from "@/api";

type IParams = Promise<{
  id: string;
}>;

export default async function Video({ params }: { params: IParams }) {
  const { id } = await params;
  const token = (await cookies()).get(sessionKey)?.value;

  const data: IDownloadResponse = await videoInfo(id, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const streams: IStreams[] = await getQualities(id, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!data) return <></>;

  return <VideoPage data={data} streams={streams} />;
}
