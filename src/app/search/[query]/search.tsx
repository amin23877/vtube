"use client";
import React, { useEffect, useState } from "react";
import { search } from "@/api/list";
import { ISearch, IVideo } from "@/app/types";
import SearchVideoItem from "@/components/SearchVideoItem";
import Link from "next/link";

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

  let loading = false;
  useEffect(() => {
    const handleScroll = () => {
      if (loading) return;
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        loading = true;
        setLoading(true);

        search(query, true, cursor)
          .then((res: ISearch) => {
            setVideos((x) => [...x, ...res.videos]);
            setCursor(res.cursor);
          })
          .then(() => {
            loading = false;
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <div className='flex flex-wrap sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 '>
        {videos.map((video, index) => {
          return (
            <div key={index} className='flex-1 mb-8'>
              <Link href={`/video/${video.video_id}`}>
                <SearchVideoItem video={video} />
              </Link>
            </div>
          );
        })}
      </div>
      {isLoading && <div className='text-center py-4 loader'></div>}
    </div>
  );
}
