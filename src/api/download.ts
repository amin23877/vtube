import { get } from ".";

export const downloadForServer = (id: string) => {
  return get(
    `youtube/download-command?video_id=${id}&audio_only=false&download=true`
  );
};
