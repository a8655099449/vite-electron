import request from "@/common/request";

export const getRecommendSongList = () =>
  request<{
    recommend: SongListItem[];
  }>({
    url: "/recommend/resource",
  });
export const homepageData = () =>
  request<{
    recommend: SongListItem[];
  }>({
    url: "/homepage/block/page",
  });
