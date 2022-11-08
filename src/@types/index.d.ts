/// <reference types="electron" />

type TupleToUnion<T> = T extends [infer P, ...infer K]
  ? P | TupleToUnion<K>
  : never;
type RouteItem = {
  name: string;
  path: string;
  component?: any;
  icon?: any;
  isMenu?: boolean;
};

type ID = string | number;

type APISendKeys = [
  "window-min",
  "window-max",
  "window-close",
  "reload",
  "toggle-theme",
  "openDevtools",
  "open-url"
];

type ListenerKeys =
  | "maximize"
  | "minimize"
  | "unmaximize"
  | "FM_NEXT" // 私人FM 下一首歌
  | "LOGIN_SUCCESS" // 登录
  | "PLAY" // 播放一首歌，需要传入id
  | "LOGOUT" //登出
  | "LAYOUT_TO_BOTTOM" // 页面滚动到底
  | "PLAY_LIST"; // 播放一个列表，需要传入id

declare module "@loadable/component";
declare module "qrcode.react";

type API = {
  send(key: TupleToUnion<APISendKeys>, ...args: any[]);
  on(
    key: ListenerKeys,
    listener: (event: Electron.IpcRendererEvent, ...args: any[]) => void
  );
  off(
    key: ListenerKeys,
    listener: (event: Electron.IpcRendererEvent, ...args: any[]) => void
  );
  emit(key: ListenerKeys, ...args: any[]);
};

declare var api: API;
type UserProfile = Partial<{
  backgroundImgIdStr: string;
  followed: boolean;
  backgroundUrl: string;
  detailDescription: string;
  avatarImgIdStr: string;
  userId: ID;
  vipType: number;
  nickname: string;
  birthday: number;
  gender: number;
  province: number;
  city: number;
  avatarImgId: number;
  backgroundImgId: number;
  userType: number;
  accountStatus: number;
  avatarUrl: string;
  defaultAvatar: boolean;
  expertTags: null;
  experts: {};
  mutual: boolean;
  remarkName: null;
  authStatus: number;
  djStatus: number;
  description: string;
  signature: string;
  authority: number;
  avatarImgId_str: string;
  followeds: number;
  follows: number;
  eventCount: number;
  avatarDetail: null;
  playlistCount: number;
  playlistBeSubscribedCount: number;
  name: string;
}>;

type Album = {
  id: number;
  name: string;
  picUrl: string;
  tns: any[];
  pic_str: string;
  pic: number;
};

type SongListItem = {
  id: number;
  type: number;
  name: string;
  coverImgUrl: string;
  copywriter: string;
  picUrl: string;
  playcount: number;
  playCount: number;
  trackCount: number;
  createTime: number;
  trackCount: number;
  userId: number;
  alg: string;
  description: string;
  tags: string[];
  creator: UserProfile;
};

type LyricItem = {
  time: number;
  text: string;
};

type UserPlayList = {
  create: SongListItem[];
  collect: SongListItem[];
};

interface CommentRequest {
  isMusician: boolean;
  cnum: number;
  userId: number;
  topComments: any[];
  moreHot: boolean;
  hotComments: Comment[];
  commentBanner?: any;
  code: number;
  comments: Comment[];
  total: number;
  more: boolean;
}

interface Comment {
  user: UserProfile;
  beReplied: (BeReplied2 | BeReplied)[];
  pendantData?: PendantDatum;
  showFloorComment?: any;
  status: number;
  commentId: number;
  content: string;
  richContent?: string;
  contentResource?: any;
  time: number;
  timeStr: string;
  needDisplayTime: boolean;
  likedCount: number;
  expressionUrl?: any;
  commentLocationType: number;
  parentCommentId: number;
  decoration?: Decoration;
  repliedMark?: any;
  grade?: any;
  userBizLevels?: any;
  liked: boolean;
}

interface BeReplied2 {
  user: UserProfile;
  beRepliedCommentId: number;
  content?: any;
  richContent?: any;
  status: number;
  expressionUrl?: any;
}

interface AvatarDetail {
  userType: number;
  identityLevel: number;
  identityIconUrl: string;
}

interface Decoration {}

interface PendantDatum {
  id: number;
  imageUrl: string;
}

interface BeReplied {
  user: UserProfile;
  beRepliedCommentId: number;
  content: string;
  richContent?: any;
  status: number;
  expressionUrl?: any;
}

type CommentTypes = "playlist" | "music" | "album" | "video";

/*
歌单的标签
*/
interface PlayListTagItem {
  playlistTag: PlaylistTag;
  activity: boolean;
  hot: boolean;
  createTime: number;
  usedCount: number;
  position: number;
  category: number;
  name: string;
  id: number;
  type: number;
}

interface PlaylistTag {
  id: number;
  name: string;
  category: number;
  usedCount: number;
  type: number;
  position: number;
  createTime: number;
  highQuality: number;
  highQualityPos: number;
  officialPos: number;
}
/**
 * @name 歌手
 */
interface Artist {
  name: string;
  id: number;
  picId: number;
  img1v1Id: number;
  briefDesc: string;
  picUrl: string;
  img1v1Url: string;
  albumSize: number;
  alias: string[];
  trans: string;
  musicSize: number;
  topicPerson: number;
  showPrivateMsg?: any;
  isSubed?: any;
  accountId?: any;
  picId_str: string;
  img1v1Id_str: string;
  transNames?: any;
  followed: boolean;
  mvSize?: any;
  publishTime?: any;
  identifyTag?: any;
  alg?: any;
  fansCount: number;
}


