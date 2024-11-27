import { get } from ".";

export const videoInfo = (id: string) => {
  return get(`/youtube/video-info?video_id=${id}`);
};

export const getQualities = (id: string) => {
  return get(`youtube/streams?video_id=${id}`);
};
