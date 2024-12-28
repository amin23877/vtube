import { channel_data } from "@/api/list";
import Chanel from "./channel";
import { IChanelData } from "@/app/types";
import { cookies } from "next/headers";
import { sessionKey } from "@/api";

type IParams = {
  params: Promise<{
    name: string;
  }>;
};

export default async function Youtube({ params }: IParams) {
  const token = (await cookies()).get(sessionKey)?.value;
  const { name } = await params;
  let chanelData: IChanelData | undefined;
  try {
    chanelData = await channel_data(name, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
