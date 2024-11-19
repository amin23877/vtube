import VideoPlayer from "@/components/VideoPlayer";

export default async function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <VideoPlayer
        videoApiUrl='https://download.samplelib.com/mp4/sample-5s.mp4'
        audioApiUrl='https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
      />
    </div>
  );
}
