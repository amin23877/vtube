import { get } from ".";

export const channel_data = (channel_username: string) => {
  return get(`youtube/channel-data?channel_username=${channel_username}`);
};

export const chanel_media = (
  channel_username: string,
  data_type: "VIDEOS" | "SHORTS" | "LIVES" = "VIDEOS",
  start: number = 0,
  stop: number = 12
) => {
  return get(
    `youtube/channel-media?channel_username=${channel_username}&data_type=${data_type}&start=${start}&stop=${stop}`
  );
};

export const search = (
  query: string,
  has_items: boolean = false,
  cursor?: string
) => {
  return get(
    `youtube/suggests?query=${query}&has_items=${has_items}${
      cursor ? "&cursor=" + cursor : ""
    }`
  );
};
