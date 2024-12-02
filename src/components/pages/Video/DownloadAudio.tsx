import ButtonBadge from "@/components/ButtonBadge";

import musicIcon from "@/assets/actions/music.svg";
import musicHoverIcon from "@/assets/actions/musicHover.svg";

function DownloadAudio({
  audioUrl,
  id,
  filename,
  filesize,
}: {
  audioUrl: string;
  id: string;
  filename: string;
  filesize: number;
}) {
  const handleDownloadAudio = () => {
    const downloadLink = `${
      process.env.NEXT_PUBLIC_HOST
    }youtube/download-audio?audio_url=${encodeURIComponent(
      audioUrl
    )}&filename=${filename}&filesize=${filesize}`;
    const link = document.createElement("a");
    link.href = downloadLink;
    link.download = `video_${id}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <ButtonBadge
        onClick={handleDownloadAudio}
        title={"دانلود صدا"}
        icon={musicIcon}
        hoverIcon={musicHoverIcon}
      />
    </>
  );
}

export default DownloadAudio;
