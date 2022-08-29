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
  "openDevtools"
];

type ListenerKeys =
  | "maximize"
  | "minimize"
  | "unmaximize"
  | "LOGIN_SUCCESS"
  | "PLAY"
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
type SongItem = {
  id: number;
  name: string;
  ar: UserProfile[];
  al: Album;
  dt: number;
};
