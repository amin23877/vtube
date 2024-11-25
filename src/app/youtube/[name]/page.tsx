import { channel_data } from "@/api/list";
import Chanel from "./chanel";

type IParams = {
  params: {
    name: string;
  };
};

export default async function Youtube({ params }: IParams) {
  const { name } = await params;
  let chanelData;
  let error;
  await channel_data(name)
    .then((res) => {
      chanelData = res;
    })
    .catch((err) => {
      error = err;
    });
  console.log(name, chanelData, error);
  return <Chanel />;
}
