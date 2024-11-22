import VideoPlayer from "@/components/VideoPlayer";

type IParams = {
  id: string;
};

export default async function Video({ params }: { params: IParams }) {
  const { id } = await params;
  return <VideoPlayer id={id} />;
}
