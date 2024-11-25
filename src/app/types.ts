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
  channel_username: string;
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

export type IDownloadResponse = {
  itag: number;
  title: string;
  filesize: number;
  resolution: string;
  like_count: number;
  view_count: number;
  comment_count: string;
  description: string;
  thumbnail_url: string;
  channel_username: string;
  channel_subscribers: string;
  channel_thumbnail_url: string;
};
