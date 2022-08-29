import request from "@/common/request";
import { useRequest } from "ahooks";

export const getSongDetail = (ids: number) =>
  request<{
    songs: SongItem[];
  }>({
    url: "/song/detail",
    params: { ids },
  });
export const getSongUrl = (id: number) =>
  request<
    {
      url: string;
    }[]
  >({
    url: "/song/url",
    params: { id },
  });
