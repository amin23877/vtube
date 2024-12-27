"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { channel_media } from "@/api/list";
import { IVideo } from "@/app/types";
import SearchVideoItem from "@/components/SearchVideoItem";
import Link from "next/link";
import Loading from "@/components/Loading";

export default function Videos({ name }: { name: string }) {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [number, setNumber] = useState<number>(1);
  const [isLoading, setLoading] = useState(false);

  const [sm, setSm] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setSm(window.matchMedia("(max-width: 650px)").matches);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize); // Listen for window resize events
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const loadingRef = useRef(false);
  useEffect(() => {
    setLoading(true);
    channel_media(name, "VIDEOS", 0, 12)
      .then((res) => {
        setVideos([...res.videos]);
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

      channel_media(name, "VIDEOS", number * 12, (number + 1) * 12)
        .then((res) => {
          setVideos((x) => [...x, ...res.videos]);
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
      <div className="flex flex-wrap sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 justify-start">
        {videos.map((video, index) => {
          return (
            <Link
              href={`/video/${video.video_id}`}
              key={index}
              className="flex-1 mb-8 w-full flex justify-center"
            >
              <SearchVideoItem video={video} sm={sm} />
            </Link>
          );
        })}
      </div>
      {isLoading && <Loading />}
    </div>
  );
}
