import Search from "./search";

type IParams = {
  params: Promise<{
    query: string;
  }>;
};

export default async function SearchApi({ params }: IParams) {
  const { query } = await params;

  return <Search query={query} />;
}
