import Image from "next/image";
import settingIcon from "@/assets/videoPlayer/setting.svg";
import { IStreams } from "@/app/types";
import { Dispatch, SetStateAction, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";

type IQualities = {
  resolution: string;
  urls: { type: string; url: string; filesize: number }[];
};

export default function Setting({
  button,
  setVideoUrl,
  setVideoSize,
  videoUrl,
  streams,
}: {
  button: string;
  videoUrl: string;
  setVideoUrl: Dispatch<SetStateAction<string>>;
  setVideoSize: Dispatch<SetStateAction<number>>;
  streams: IStreams[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  const groupedData = Object.values(
    streams.reduce((acc, { type, url, resolution, filesize }) => {
      if (!resolution || resolution === "null") return acc;

      const formattedResolution =
        resolution.endsWith("p") && parseInt(resolution) > 1080
          ? `${parseInt(resolution) / 1000}k`
          : resolution;

      if (!acc[formattedResolution]) {
        acc[formattedResolution] = {
          resolution: formattedResolution,
          urls: [],
        };
      }
      acc[formattedResolution].urls.push({ url, type, filesize });
      return acc;
    }, {} as Record<string, IQualities>)
  ).sort((a, b) => {
    const parseRes = (res: string) =>
      res.endsWith("k") ? parseFloat(res) * 1000 : parseInt(res);
    return parseRes(a.resolution) - parseRes(b.resolution);
  });

  const handleChangeResolution = async (quality: IQualities) => {
    setVideoUrl(quality.urls[0].url);
    setVideoSize(quality.urls[0].filesize);
  };

  return (
    <div className="relative">
      <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger>
          <div className={button}>
            <Image src={settingIcon} alt="setting-icon" />
          </div>
        </PopoverTrigger>

        <PopoverContent>
          <div className="bg-[#212B30] rounded shadow-lg w-48">
            {groupedData.map((quality: IQualities) => (
              <p
                key={quality.resolution}
                className={`cursor-pointer px-4 py-2 hover:bg-[#374556] ${
                  quality.urls.find((z) => videoUrl === z.url)
                    ? "bg-[#4B5A6C]"
                    : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleChangeResolution(quality);
                  setIsOpen(false);
                }}
              >
                {quality.resolution}
              </p>
            ))}
          </div>
        </PopoverContent>
      </Popover>
      <p className="absolute bottom-[2px] left-1/2 bg-[#F1D815] text-[#030303] size text-[10px] cursor-pointer rounded-[2px] px-[4px]">
        {
          groupedData.find((x) => x.urls.find((z) => z.url === videoUrl))
            ?.resolution
        }
      </p>
    </div>
  );
}
