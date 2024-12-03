import ButtonBadge from "@/components/Badges/Button";

import downloadIcon from "@/assets/actions/download.svg";
import downloadHoverIcon from "@/assets/actions/downloadHover.svg";
import { useState } from "react";
import LoadingBadge from "@/components/Badges/Loading";
import { numberFormatter } from "@/utils/numberHelper";

function DownloadVideo({
  videoUrl,
  filename,
  filesize,
  resolution,
}: {
  videoUrl: string;
  filename: string;
  filesize: number;
  resolution: string;
}) {
  const [loading, setLoading] = useState(false);

  const downloadFile = async () => {
    setLoading(true);
    const url = `${
      process.env.NEXT_PUBLIC_HOST
    }youtube/download-video?video_url=${encodeURIComponent(
      videoUrl
    )}&filesize=${filesize}&filename=${filename}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Range: "bytes=0-",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const title = decodeURIComponent(
        response?.headers
          ?.get("Content-Disposition")
          ?.split("filename=")[1]
          ?.replace(/['"]+/g, "") || filename + ".mp4"
      );

      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = title;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error("Error downloading file:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <LoadingBadge />
      ) : (
        <span title={numberFormatter(filesize, 2) + "B"}>
          <ButtonBadge
            onClick={downloadFile}
            title={"دانلود ویدیو" + ` (${resolution})`}
            icon={downloadIcon}
            hoverIcon={downloadHoverIcon}
          />
        </span>
      )}
    </>
  );
}

export default DownloadVideo;
