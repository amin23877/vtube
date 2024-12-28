import { AxiosRequestConfig } from "axios";
import { get } from ".";

export const videoInfo = (
  id: string,
  config?: AxiosRequestConfig<unknown> | undefined
) => {
  return get(`/youtube/video-info?video_id=${id}`, config);
};

export const getQualities = (
  id: string,
  config?: AxiosRequestConfig<unknown> | undefined
) => {
  return get(`youtube/streams?video_id=${id}`, config);
};
