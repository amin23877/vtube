import { channel_data } from "@/api/list";
import Chanel from "./channel";
import { IChanelData } from "@/app/types";

type IParams = {
  params: Promise<{
    name: string;
  }>;
};

export default async function Youtube({ params }: IParams) {
  const { name } = await params;
  let chanelData: IChanelData | undefined;
  try {
    chanelData = await channel_data(name);
  } catch (err) {
    console.log(err);
  }
  if (!chanelData) {
    return (
      <div className="text-center h-[calc(100vh_-_250px)]">
        channel not found
      </div>
    );
  }
  return <Chanel {...chanelData} />;
}
