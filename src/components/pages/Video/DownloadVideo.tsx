import ButtonBadge from "@/components/ButtonBadge";

import downloadIcon from "@/assets/actions/download.svg";
import downloadHoverIcon from "@/assets/actions/downloadHover.svg";

function DownloadVideo({ videoUrl, id }: { videoUrl: string; id: string }) {
  const handleDownloadVideo = () => {
    const downloadLink = `${process.env.NEXT_PUBLIC_HOST}youtube/proxy-audio?video_url=${videoUrl}`;
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
        onClick={handleDownloadVideo}
        title={"دانلود ویدیو"}
        icon={downloadIcon}
        hoverIcon={downloadHoverIcon}
      />
    </>
  );
}

export default DownloadVideo;
