// 歌手接口

import request from "@/common/request";

export const getHotArtists = () =>
  request({
    cacheTime: 1000 * 60 * 60 * 24,
    url: "/top/artists",
  });
