"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { search } from "@/api/list";
import { ISearch, IVideo } from "@/app/types";
import SearchVideoItem from "@/components/SearchVideoItem";
import Link from "next/link";
import Loading from "@/components/Loading";

export default function Search({
  query,
  first_data,
}: {
  query: string;
  first_data: ISearch;
}) {
  const [videos, setVideos] = useState<IVideo[]>(first_data.videos || []);
  const [cursor, setCursor] = useState<string>(first_data.cursor || "");
  const [isLoading, setLoading] = useState(false);

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
            <div key={index} className="flex-1 mb-8">
              <Link href={`/video/${video.video_id}`}>
                <SearchVideoItem video={video} />
              </Link>
            </div>
          );
        })}
      </div>
      {isLoading && (
        <div className="relative w-[30px] h-[25px] mx-auto my-2">
          <Loading />
        </div>
      )}
    </div>
  );
}
