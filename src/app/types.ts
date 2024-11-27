import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Dispatch, SetStateAction } from "react";

export type IMovie = {
  id: number;
  title: string;
  description: string;
  image: string | StaticImport;
  createdAt: string;
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

export type IControls = {
  button: string;
  playbackState: "playing" | "paused" | "loading";
  handleForward: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  data: IDownloadResponse[];
  setItag: Dispatch<SetStateAction<number>>;
  itag?: number;
  id: string;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setCqLoading: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  handleVolumeChange: (e: number) => void;
  volume: number;
  toggleFullScreen: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  fullScreen: boolean;
  seekVideo: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  progress: number;
};

export type IChanelData = {
  badge: string;
  banner: string;
  channel_id: string;
  channel_name: string;
  description: string;
  is_family_safe: boolean;
  thumbnail: string;
  total_subscribers: string;
  total_videos: string;
  total_views: number;
};
