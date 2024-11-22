import { search } from "@/api/list";
import { ISearch } from "@/app/types";
import Search from "./search";
import { notFound } from "next/navigation";

type IParams = {
  params: {
    query: string;
  };
};

export default async function SearchApi({ params }: IParams) {
  const { query } = await params;
  let data: ISearch = { videos: [], cursor: "" };
  let error;
  await search(query, true)
    .then((res) => {
      data = res;
    })
    .catch((err) => {
      error = err;
    });
  console.log(query, data, error);
  if (error) return notFound();
  return <Search query={query} first_data={data} />;
}
