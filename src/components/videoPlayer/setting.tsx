import Image from "next/image";
import settingIcon from "@/assets/videoPlayer/setting.svg";
import { IDownloadResponse } from "@/app/types";
import { Dispatch, SetStateAction, useState } from "react";
import { downloadSpecificQuality } from "@/api/download";
import Loading from "../Loading";

type IQualities = { resolution: string; itags: number[] };

export default function Setting({
  data = [],
  setItag,
  button,
  itag,
  id,
  setIsLoading,
  isLoading,
}: {
  data: IDownloadResponse[];
  setItag: Dispatch<SetStateAction<number>>;
  button: string;
  itag?: number;
  id: string;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
}) {
  const [popup, setPopup] = useState(false);

  const groupedData = Object.values(
    data.reduce((acc, { itag, resolution }) => {
      if (!resolution || resolution === "null") return acc; // Ignore null or undefined resolutions

      // Convert resolutions above 1080 to 'k'
      const formattedResolution =
        resolution.endsWith("p") && parseInt(resolution) > 1080
          ? `${parseInt(resolution) / 1000}k`
          : resolution;

      if (!acc[formattedResolution]) {
        acc[formattedResolution] = {
          resolution: formattedResolution,
          itags: [],
        };
      }
      acc[formattedResolution].itags.push(itag);
      return acc;
    }, {} as Record<string, { resolution: string; itags: number[] }>)
  ).sort((a, b) => {
    const parseRes = (res: string) =>
      res.endsWith("k") ? parseFloat(res) * 1000 : parseInt(res); // Convert 'k' to numeric for sorting
    return parseRes(a.resolution) - parseRes(b.resolution);
  });

  const handleChangeResolution = async (quality: IQualities) => {
    setIsLoading(true);
    downloadSpecificQuality(id, false, quality.itags[0])
      .then((resp) => {
        setItag(resp.itag);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div
      className="relative"
      onClick={(e) => {
        e.stopPropagation();
        setPopup(!popup);
      }}
    >
      <div
        className={`absolute bottom-full right-0 mt-2 w-48 rounded shadow-lg z-50 ${
          popup ? "h-auto" : "h-0"
        } transition-all duration-300 overflow-hidden`}
      >
        {groupedData?.map((quality: IQualities) => (
          <p
            key={quality.resolution}
            className={`${
              popup ? "" : "hidden"
            } cursor-pointer px-4 py-2 bg-[#212B30] hover:bg-[#374556] ${
              quality.itags.find((x) => x === itag) ? "bg-[#4B5A6C]" : ""
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setPopup(false);
              handleChangeResolution(quality);
            }}
          >
            {quality.resolution}
          </p>
        ))}
      </div>
      <button className={button}>
        {isLoading ? (
          <div className="relative w-[30px] h-[25px]">
            <Loading />
          </div>
        ) : (
          <Image src={settingIcon} alt="setting-icon" />
        )}
      </button>
    </div>
  );
}
