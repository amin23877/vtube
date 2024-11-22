import VideoPlayer from "@/components/VideoPlayer";
import Suggestions from "./suggestions";
export default async function Home() {
  return (
    <>
      <div className='mx-[52px] h-0.5 bg-[#808184] mt-10 mb-16'></div>
      <div className='flex flex-col gap-[90px] mb-[90px]'>
        <Suggestions />
      </div>
      {/* <VideoPlayer
        videoApiUrl='https://download.samplelib.com/mp4/sample-5s.mp4'
        audioApiUrl='https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
      /> */}
    </>
  );
}
