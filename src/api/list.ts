import { Key } from "react";
import { get } from ".";
import { AxiosRequestConfig } from "axios";

export const channel_data = (
  channel_username: string,
  config?: AxiosRequestConfig<unknown> | undefined
) => {
  return get(
    `youtube/channel-data?channel_username=${channel_username}`,
    config
  );
};

export const channel_media = (
  channel_username: string,
  data_type: Key = "VIDEOS",
  start: number = 0,
  stop: number = 12
) => {
  return get(
    `youtube/channel-media?channel_username=${channel_username}&data_type=${String(
      data_type
    ).toUpperCase()}&start=${start}&stop=${stop}`
  );
};

export const search = (
  query: string,
  has_items: boolean = false,
  cursor?: string,
  config?: AxiosRequestConfig<unknown> | undefined
) => {
  return get(
    `youtube/suggests?query=${query}&has_items=${has_items}${
      cursor ? "&cursor=" + cursor : ""
    }`,
    config
  );
};
