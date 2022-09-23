type HomeData = Partial<{
  blockCode: string;
  showType: string;
  dislikeShowType: number;
  uiElement: UiElement;
  creatives: Creative[];
  canClose: boolean;
  blockStyle: number;
  resourceIdList: string[];
  canFeedback: boolean;
  extInfo: any[];
}>;

interface Creative {
  creativeType: string;
  uiElement: UiElement2;
  resources: Resource[];
  position: number;
}

interface Resource {
  uiElement: UiElement3;
  resourceType: string;
  resourceState?: any;
  resourceId: string;
  resourceUrl?: any;
  resourceExtInfo: ResourceExtInfo;
  action: string;
  actionType: string;
  valid: boolean;
  alg: string;
  logInfo: string;
  ctrp?: any;
  resourceContentList?: any;
}

interface ResourceExtInfo {
  artists: Artist[];
  song: Song;
  songData: SongData;
  songPrivilege: SongPrivilege;
  commentSimpleData?: CommentSimpleData;
}

interface CommentSimpleData {
  content: string;
  commentId: number;
  threadId?: null | string | string;
  userId: number;
  userName?: null | string | string;
}

interface SongPrivilege {
  id: number;
  fee: number;
  payed: number;
  realPayed: number;
  st: number;
  pl: number;
  dl: number;
  sp: number;
  cp: number;
  subp: number;
  cs: boolean;
  maxbr: number;
  fl: number;
  pc?: any;
  toast: boolean;
  flag: number;
  paidBigBang: boolean;
  preSell: boolean;
  playMaxbr: number;
  downloadMaxbr: number;
  maxBrLevel: string;
  playMaxBrLevel: string;
  downloadMaxBrLevel: string;
  plLevel: string;
  dlLevel: string;
  flLevel: string;
  rscl?: any;
  freeTrialPrivilege: FreeTrialPrivilege;
  chargeInfoList: ChargeInfoList[];
}

interface ChargeInfoList {
  rate: number;
  chargeUrl?: any;
  chargeMessage?: any;
  chargeType: number;
}

interface FreeTrialPrivilege {
  resConsumable: boolean;
  userConsumable: boolean;
  listenType?: any;
}

interface SongData {
  name: string;
  id: number;
  position: number;
  alias: string[][];
  status: number;
  fee: number;
  copyrightId: number;
  disc: string;
  no: number;
  artists: Artist[];
  album: Album;
  starred: boolean;
  popularity: number;
  score: number;
  starredNum: number;
  duration: number;
  playedNum: number;
  dayPlays: number;
  hearTime: number;
  sqMusic?: SqMusic | SqMusic;
  hrMusic?: any;
  ringtone?: string;
  crbt?: any;
  audition?: any;
  copyFrom: string;
  commentThreadId: string;
  rtUrl?: any;
  ftype: number;
  rtUrls: any[];
  copyright: number;
  transName?: (null | string)[];
  sign?: any;
  mark: number;
  originCoverType: number;
  originSongSimpleData?: any;
  single: number;
  noCopyrightRcmd?: any;
  hMusic: SqMusic;
  mMusic: SqMusic;
  lMusic: SqMusic;
  bMusic: SqMusic;
  mp3Url?: any;
  mvid: number;
  rtype: number;
  rurl?: any;
  transNames?: string[];
}

interface SqMusic {
  name?: any;
  id: number;
  size: number;
  extension: string;
  sr: number;
  dfsId: number;
  bitrate: number;
  playTime: number;
  volumeDelta: number;
}

interface Album {
  name: string;
  id: number;
  type: string;
  size: number;
  picId: number;
  blurPicUrl: string;
  companyId: number;
  pic: number;
  picUrl: string;
  publishTime: number;
  description: string;
  tags: string;
  company: string;
  briefDesc: string;
  artist: Artist;
  songs: any[];
  alias: string[][];
  status: number;
  copyrightId: number;
  commentThreadId: string;
  artists: Artist[];
  subType: string;
  transName?: any;
  onSale: boolean;
  mark: number;
  gapless: number;
  picId_str?: string;
}

interface SongItem {
  name: string;
  id: number;
  pst: number;
  t: number;
  ar: Ar[];
  alia: string[][];
  pop: number;
  st: number;
  rt?: string;
  fee: number;
  v: number;
  crbt?: any;
  cf: string;
  al: Al;
  dt: number;
  h: H;
  m: H;
  l: H;
  sq?: H | H;
  hr?: any;
  a?: any;
  cd: string;
  no: number;
  rtUrl?: any;
  ftype: number;
  rtUrls: any[];
  djId: number;
  copyright: number;
  s_id: number;
  mark: number;
  originCoverType: number;
  originSongSimpleData?: any;
  tagPicList?: any;
  resourceState: boolean;
  version: number;
  songJumpInfo?: any;
  entertainmentTags?: any;
  single: number;
  noCopyrightRcmd?: any;
  mst: number;
  cp: number;
  mv: number;
  rtype: number;
  rurl?: any;
  publishTime: number;
  videoInfo: VideoInfo;
  tns?: string[];
}

interface VideoInfo {
  moreThanOne: boolean;
  video?: Video | Video;
}

interface Video {
  vid: string;
  type: number;
  title?: any;
  playTime: number;
  coverUrl?: any;
  publishTime: number;
  artists?: any;
  alias?: any;
}

interface H {
  br: number;
  fid: number;
  size: number;
  vd: number;
  sr: number;
}

interface Al {
  id: number;
  name: string;
  picUrl: string;
  tns: any[];
  pic: number;
  pic_str?: string;
}

interface Ar {
  id: number;
  name: string;
  tns: any[];
  alias: any[];
}

interface Artist {
  name: string;
  id: number;
  picId: number;
  img1v1Id: number;
  briefDesc: string;
  picUrl: string;
  img1v1Url: string;
  albumSize: number;
  alias: any[];
  trans: string;
  musicSize: number;
  topicPerson: number;
}

interface UiElement3 {
  mainTitle: SubTitle;
  subTitle?: SubTitle2;
  image: Image;
  rcmdShowType: string;
}

interface Image {
  imageUrl: string;
}

interface SubTitle2 {
  title: string;
  titleType: string;
}

interface UiElement2 {
  rcmdShowType: string;
}

interface UiElement {
  subTitle: SubTitle;
  button: Button;
  rcmdShowType: string;
}

interface Button {
  action: string;
  actionType: string;
  text: string;
  iconUrl?: any;
  biData?: any;
}

interface SubTitle {
  title: string;
}
