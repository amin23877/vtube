import ButtonBadge from "@/components/ButtonBadge";

import musicIcon from "@/assets/actions/music.svg";
import musicHoverIcon from "@/assets/actions/musicHover.svg";

function DownloadAudio({ audioUrl, id }: { audioUrl: string; id: string }) {
  const handleDownloadAudio = () => {
    const downloadLink = `${process.env.NEXT_PUBLIC_HOST}/youtube/proxy-audio?audio_url=${audioUrl}`;
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
