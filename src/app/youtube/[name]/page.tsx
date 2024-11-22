import { channel_data } from "@/api/list";

type IParams = {
  params: {
    name: string;
  };
};

export default async function Chanel({ params }: IParams) {
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
  return <></>;
}
