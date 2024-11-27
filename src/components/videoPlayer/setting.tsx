import Image from "next/image";
import settingIcon from "@/assets/videoPlayer/setting.svg";
import { IDownloadResponse } from "@/app/types";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { downloadSpecificQuality, downloadStatus } from "@/api/download";
import Loading from "../Loading";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";

type IQualities = { resolution: string; itags: number[] };

export default function Setting({
  data = [],
  setItag,
  button,
  itag,
  id,
  setCqLoading,
  setIsLoading,
  isLoading,
}: {
  data: IDownloadResponse[];
  setItag: Dispatch<SetStateAction<number>>;
  button: string;
  itag?: number;
  id: string;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setCqLoading: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
}) {
  const [stop, setStop] = useState(true);
  const [newItag, setNewItag] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const groupedData = Object.values(
    data.reduce((acc, { itag, resolution }) => {
      if (!resolution || resolution === "null") return acc;

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
      res.endsWith("k") ? parseFloat(res) * 1000 : parseInt(res);
    return parseRes(a.resolution) - parseRes(b.resolution);
  });

  useEffect(() => {
    if (!stop && newItag !== 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      intervalRef.current = setInterval(() => {
        downloadStatus({ id, itag: newItag }).then((status_data) => {
          if (status_data?.progress !== "0 %") {
            setStop(true);
            setItag(newItag);
            setCqLoading(true);
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }
          }
        });
      }, 1000);
    }

    // Cleanup the interval when the component unmounts or dependencies change
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [stop, newItag, id, setItag]);

  const handleChangeResolution = async (quality: IQualities) => {
    setIsLoading(true);
    downloadSpecificQuality(id, false, quality.itags[0])
      .then((resp) => {
        setNewItag(resp.itag);
        setStop(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="relative">
      <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger>
          <div className={button}>
            {isLoading ? (
              <div className="relative w-[30px] h-[25px]">
                <Loading />
              </div>
            ) : (
              <Image src={settingIcon} alt="setting-icon" />
            )}
          </div>
        </PopoverTrigger>

        <PopoverContent>
          <div className="bg-[#212B30] rounded shadow-lg w-48">
            {groupedData.map((quality: IQualities) => (
              <p
                key={quality.resolution}
                className={`cursor-pointer px-4 py-2 hover:bg-[#374556] ${
                  quality.itags.find((z) =>
                    newItag ? z === newItag : z === itag
                  )
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
          groupedData.find((x) =>
            x.itags.find((z) => (newItag ? z === newItag : z === itag))
          )?.resolution
        }
      </p>
    </div>
  );
}
