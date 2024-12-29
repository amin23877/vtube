"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { search } from "@/api/list";
import { ISearch, IVideo } from "@/types/types";
import SearchVideoItem from "@/components/Video/VideoItem";
import Link from "next/link";
import Loading from "@/components/Loading";

export default function Search({
  query,
  first_data,
}: {
  query: string;
  first_data: ISearch;
}) {
  const [videos, setVideos] = useState<IVideo[]>(first_data?.videos || []);
  const [cursor, setCursor] = useState<string>(first_data?.cursor || "");
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
  const handleScroll = useCallback(() => {
    if (loadingRef.current || isLoading) return;

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      loadingRef.current = true;
      setLoading(true);

      search(query, true, cursor)
        .then((res) => {
          setVideos((x) => [...x, ...res.videos]);
          setCursor(res.cursor);
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
  }, [cursor, isLoading, query]);

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
