import ButtonBadge from "@/components/ButtonBadge";

import downloadIcon from "@/assets/actions/download.svg";
import downloadHoverIcon from "@/assets/actions/downloadHover.svg";

function DownloadVideo({
  videoUrl,
  id,
  filename,
  filesize,
}: {
  videoUrl: string;
  id: string;
  filename: string;
  filesize: number;
}) {
  const handleDownloadVideo = () => {
    const downloadLink = `${
      process.env.NEXT_PUBLIC_HOST
    }youtube/download-video?video_url=${encodeURIComponent(
      videoUrl
    )}&filesize=${filesize}&filename=${filename}`;
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
