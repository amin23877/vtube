import { channel_data } from "@/api/list";
import Chanel from "./chanel";
import { IChanelData } from "@/app/types";

type IParams = {
  params: {
    name: string;
  };
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
    return null;
  }
  return <Chanel {...chanelData} />;
}
