"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { channel_media } from "@/api/list";
import { IShort } from "@/types/types";
// import SearchVideoItem from "@/components/SearchVideoItem";
import Link from "next/link";
import Loading from "@/components/Loading";
import ShortItem from "@/components/short/ShortItem";

export default function Shorts({ name }: { name: string }) {
  const [shorts, setShorts] = useState<IShort[]>([]);
  const [number, setNumber] = useState<number>(0);
  const [isLoading, setLoading] = useState(false);

  const loadingRef = useRef(false);
  useEffect(() => {
    setLoading(true);
    channel_media(name, "SHORTS", 0, 12)
      .then((res) => {
        setShorts([...res.shorts]);
        setNumber((x) => x + 1);
      })
      .then(() => {
        loadingRef.current = false;
      })
      .catch((err) => {
        console.log(err);
        loadingRef.current = false;
      })
      .finally(() => {
        setLoading(false);
      });
  }, [name]);

  const handleScroll = useCallback(() => {
    if (loadingRef.current || isLoading) return;

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      loadingRef.current = true;
      setLoading(true);

      channel_media(name, "SHORTS", number * 12, (number + 1) * 12)
        .then((res) => {
          setShorts((x) => [...x, ...res.shorts]);
          setNumber((x) => x + 1);
        })
        .then(() => {
          loadingRef.current = false;
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          loadingRef.current = false;
          setLoading(false);
        });
    }
  }, [isLoading, name]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div>
      <div className="flex flex-wrap sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 justify-center">
        {shorts.map((video, index) => {
          return (
            <Link
              href={`/short/${video.video_id}`}
              key={index}
              className="flex-1 mb-8 w-full min-w-[210px] flex justify-center"
            >
              <ShortItem {...video} />
            </Link>
          );
        })}
      </div>
      {isLoading && <Loading />}
    </div>
  );
}
