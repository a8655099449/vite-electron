import request from "@/common/request";

export const getRecommendSongList = () =>
  request<{
    recommend: SongListItem[];
  }>({
    url: "/recommend/resource",
  });
export const homepageData = () =>
  request<{
    blocks: {
      blockCode: string;
      showType: string;
      dislikeShowType: number;
      extInfo: any;
      canClose: boolean;
      blockStyle: number;
      canFeedback: boolean;
    }[];
  }>({
    url: "/homepage/block/page",
  });

export const getSongListDetails = (id: string) =>
  request<{
    playlist: SongListItem;
  }>({
    url: "/playlist/detail",
    params: { id },
  });
export const getSongListAllMusic = (id: string) =>
  request<{
    songs: SongItem[];
  }>({
    url: "/playlist/track/all",
    params: { id, limit: 100 },
  });
