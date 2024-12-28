import { search } from "@/api/list";
import { ISearch } from "@/app/types";
import Search from "./search";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { sessionKey } from "@/api";

type IParams = {
  params: Promise<{
    query: string;
  }>;
};

export default async function SearchApi({ params }: IParams) {
  const token = (await cookies()).get(sessionKey)?.value;
  const { query } = await params;
  let data: ISearch = { videos: [], cursor: "" };
  let error;
  await search(query, true, undefined, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => {
      data = res;
    })
    .catch((err) => {
      error = err;
    });
  if (error) return notFound();
  return <Search query={query} first_data={data} />;
}
