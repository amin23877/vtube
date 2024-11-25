import { get } from ".";

export const downloadForServer = (id: string) => {
  return get(`youtube/download-command?video_id=${id}&download=true`);
};

export const downloadSpecificQuality = (
  id: string,
  audio_only: boolean = false,
  itag?: number
) => {
  return get(
    `youtube/download-command?video_id=${id}&audio_only=${audio_only}&download=true` +
      (itag ? `&itag=${itag}` : "")
  );
};

export const getQualities = (id: string) => {
  return get(`youtube/streams?video_id=${id}`);
};
