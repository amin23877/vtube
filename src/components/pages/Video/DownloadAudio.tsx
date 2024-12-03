import ButtonBadge from "@/components/Badges/Button";

import musicIcon from "@/assets/actions/music.svg";
import musicHoverIcon from "@/assets/actions/musicHover.svg";
import { useState } from "react";
import LoadingBadge from "@/components/Badges/Loading";
import { numberFormatter } from "@/utils/numberHelper";

function DownloadAudio({
  audioUrl,
  filename,
  filesize,
}: {
  audioUrl: string;
  filename: string;
  filesize: number;
}) {
  const [loading, setLoading] = useState(false);

  const downloadFile = async () => {
    setLoading(true);
    const url = `${
      process.env.NEXT_PUBLIC_HOST
    }youtube/download-audio?audio_url=${encodeURIComponent(
      audioUrl
    )}&filename=${filename}&filesize=${filesize}`;

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
          ?.replace(/['"]+/g, "") || filename + ".mp3"
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
            title={"دانلود صدا"}
            icon={musicIcon}
            hoverIcon={musicHoverIcon}
          />
        </span>
      )}
    </>
  );
}

export default DownloadAudio;
