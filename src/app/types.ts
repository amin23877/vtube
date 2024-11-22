import { StaticImport } from "next/dist/shared/lib/get-img-props";

export type IMovie = {
  id: number;
  title: string;
  description: string;
  image: string | StaticImport;
  createdAt: string;
};

export type ISuggestion = {
  title: string;
  image: string | StaticImport;
  movies: IMovie[];
};

export type IVideo = {
  author: string;
  badge: string | null;
  duration: string;
  publish_date: string;
  thumbnail_url: string;
  title: string;
  video_id: string;
  view_count: string;
  watch_url: string;
};

export type ISearch = {
  videos: IVideo[];
  cursor: string;
};
