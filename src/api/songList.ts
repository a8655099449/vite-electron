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
export const getSongListAllMusic = (id: ID) =>
  request<{
    songs: SongItem[];
  }>({
    url: "/playlist/track/all",
    params: { id, limit: 100 },
  });

// 获取评论列表
export const getComment = ({
  id,
  type = "playlist",
  limit = 30,
  offset = 0,
}: {
  id: any;
  type?: CommentTypes;
  limit?: number;
  offset?: number;
}) =>
  request<CommentRequest>({
    url: `/comment/${type}`,
    params: { id, limit, offset },
  });

// 给评论点赞
export const likeComment = () => {};

// 获取歌单收藏者

export const getPlayListSubscribers = ({
  id = 0,
  limit = 30,
  offset = 0,
} = {}) =>
  request<{
    subscribers: UserProfile[];
  }>({
    url: "/playlist/subscribers",
    params: { id, limit, offset },
  });

// 私人MF
export const getUserMF = () =>
  request<{
    data: SongItem[];
  }>({
    url: "/personal_fm",
  });
// 私人MF垃圾桶
export const fm_trash = (id: ID) =>
  request({
    url: "/fm_trash",
    params: { id },
  });

// 获取用户喜欢的音乐
export const getLikeListIds = (uid: ID) =>
  request<{ ids: number[] }>({
    url: "/likelist",
    params: { uid },
  });
// 获取用户喜欢的音乐
export const getPlayListCateHot = () =>
  request<{ tags: PlayListTagItem[] }>({
    url: "/playlist/hot",
  });

// 获取精品歌单
export const getHighQualityPlayList = ({
  cat = undefined, // 默认为全部
  limit = 1,
  before = undefined,
}: {
  cat?: string;
  limit?: number;
  before?: number;
} = {}) =>
  request<{ playlists: SongListItem[] }>({
    url: "/top/playlist/highquality",
    params: {
      cat,
      limit,
      before,
    },
  });

// 获取用户喜欢的音乐
export const getHotPlaylistByCate = ({
  cat,
  limit = 50,
  offset = 0,
}: {
  cat?: string;
  limit?: number;
  offset?: number;
}) =>
  request<{ playlists: SongListItem[] }>({
    url: "/top/playlist",
    params: { cat, limit, offset },
  });
