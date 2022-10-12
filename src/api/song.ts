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
/**
 * 获取歌词列表
 */
export const getLyric = (id: number) =>
  request({
    url: "/lyric",
    params: { id },
  });



/**
 * 喜欢音乐
 */
export const likeMusic = ({ id = 0, like = false }) =>
  request({
    url: "/like",
    params: { id ,like  },
  });
