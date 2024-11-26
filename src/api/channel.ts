import { get } from ".";

export const channelData = (author: string) => {
  return get(`youtube/channel-data?channel_username=${author}`);
};
