import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Dispatch, RefObject, SetStateAction } from "react";

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

export type IShort = {
  video_id: string;
  watch_url: string;
  title: string;
  duration: number;
  view_count: number;
  thumbnail_url: string;
  channel_thumbnail_url: string;
};

export type ISearch = {
  videos: IVideo[];
  cursor: string;
};

export type IChannelMedia = {
  videos: IVideo[];
  shorts: IShort[];
};

export type IDownloadResponse = {
  title: string;
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
  videoUrl: string;
  setVideoUrl: Dispatch<SetStateAction<string>>;
  setVideoSize: Dispatch<SetStateAction<number>>;
  streams: IStreams[];

  button: string;
  playbackState: "playing" | "paused" | "loading";
  handleForward: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleBackward: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;

  handleVolumeChange: (e: number) => void;
  volume: number;
  toggleFullScreen: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  fullScreen: boolean;
  seekVideo: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  progress: number;
  handleChangesrc: () => void;
  videoRef: RefObject<HTMLVideoElement>;
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
  firstMedia?: IChannelMedia;
};

export type IStreams = {
  url: string;
  type: string;
  filesize: number;
  resolution: string;
  audio_codec: string;
  video_codec: string;
};
