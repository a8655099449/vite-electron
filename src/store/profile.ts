import { getLikeListIds, getSongListAllMusic } from "@/api/songList";
import { getLoginStatus, getUserPlayList, sendLogout } from "@/api/user";
import { COOKIE_KEY, USER_LIKE_LIST } from "@/common/consts";
import to from "@/common/to";
import { getStore, setStorage } from "@/common/utils";
import { makeAutoObservable, computed, toJS } from "mobx";

class Profile {
  userInfo = {} as UserProfile;
  userLikeList: SongItem[] = [];

  userPlayList: UserPlayList = {
    collect: [],
    create: [],
  };
  userLikeIds: ID[] = [];

  constructor() {
    makeAutoObservable(this);
    if (window.api) {
      window.api.on("LOGIN_SUCCESS", this.login);
    }
    this.init();
  }
  init = () => {
    const userInfo = getStore("userInfo") || {};

    if (userInfo) {
      this.userInfo = userInfo;
      this.login();
    }
    const userPlayList = getStore("userPlayList");
    if (userPlayList) {
      this.userPlayList = userPlayList;
    }
  };

  login = async () => {
    const [err, res] = await to(getLoginStatus());
    if (err || !res?.data?.profile) {
      setStorage("userInfo", {});
      this.userInfo = {}
      return;
    }
    this.userInfo = res.data.profile;
    if (this.userInfo.userId) {
      this._getUserPlayList(this.userInfo?.userId);
      this._getUserLikeListIds();
    }
    setStorage("userInfo", this.userInfo);
  };

  _getUserLikeListIds = async () => {

    const [err, res] = await to(getLikeListIds(this.userInfo.userId as ID));

    if (err) {
      return [];
    }
    this.userLikeIds = res.ids;
  };

  _getUserPlayList = async (id: ID) => {
    const res = await getUserPlayList(id);
    if (res?.create.length > 0) {
      this.getUserLikeList();
    }
    this.userPlayList = res;
  };

  getUserLikeList = async () => {
    const id = this.userInfo.userId || 0;

    let songs = getStore(USER_LIKE_LIST);
    if (!songs) {
      const [err, res] = await to(getSongListAllMusic(id));
      if (err) {
        return;
      }
      setStorage(USER_LIKE_LIST, res.songs);
      songs = res.songs;
    }

    if (songs) {
      this.userLikeList = songs;
    }
  };
  logout = async () => {
    await sendLogout();
    this.userInfo = {};
    localStorage.setItem(COOKIE_KEY, "");
    api.emit("LOGOUT");
  };
  @computed get likeListID() {

    return this.userPlayList.create?.[0]?.id || 0;
  }
}

export default Profile;
