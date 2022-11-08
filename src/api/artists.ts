import request from "@/common/request";
/**
 * @name 获取热门歌手
 * @returns
 */
export const getHotArtists = () =>
  request<{
    artists: Artist[];
  }>({
    cacheTime: 1000 * 60 * 60 * 24,
    url: "/top/artists",
  });

/**
 * @name 获取歌手分类
 * @returns
 */
export const getArtistList = (params: any) =>
  request<{
    artists: Artist[];
  }>({
    url: "/artist/list",
    params,
  });
