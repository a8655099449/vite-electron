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
  | "FM_NEXT"
  | "LOGIN_SUCCESS"
  | "PLAY"
  | "LOGOUT"
  | "PLAY_LIST";

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
  userId: number;
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
