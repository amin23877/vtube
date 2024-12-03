import { channel_data, channel_media } from "@/api/list";
import Chanel from "./channel";
import { IChanelData, IChannelMedia } from "@/app/types";

type IParams = {
  params: Promise<{
    name: string;
  }>;
};

export default async function Youtube({ params }: IParams) {
  const { name } = await params;
  let chanelData: IChanelData | undefined;
  let chanelMedia: IChannelMedia | undefined;
  try {
    chanelData = await channel_data(name);
    chanelMedia = await channel_media(name);
  } catch (err) {
    console.log(err);
  }
  if (!chanelData || !chanelMedia) {
    return null;
  }
  return <Chanel {...chanelData} firstMedia={chanelMedia} />;
}
