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
/**
 * @name 获取歌手详情
 * @returns
 */
export const getArtistDetail = (id: ID) =>
  request<ArtistDetail>({
    url: "/artist/detail",
    params: { id },
  });
/**
 * @name 获取歌手描述
 * @returns
 */
export const getArtistDesc = (id: ID) =>
  request<ArtistDetail>({
    url: "/artist/desc",
    params: { id },
  });
/**
 * @name 获取歌手描述
 * @returns
 */
export const getArtistTopSongs = (id: ID) =>
  request<ArtistDetail>({
    url: "/artist/top/song",
    params: { id },
  });
/**
 * @name 获取歌手描述
 * @returns
 */
export const getArtistMv = (id: ID) =>
  request<{
    mvs: MvItem[];
  }>({
    url: "/artist/mv",
    params: { id, limit: 20 },
  });
