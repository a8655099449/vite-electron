import { getLikeListIds, getSongListAllMusic } from "@/api/songList";
import { getLoginStatus, getUserPlayList, sendLogout } from "@/api/user";
import { COOKIE_KEY, USER_LIKE_LIST } from "@/common/consts";
import to from "@/common/to";
import { getStore, setStorage } from "@/common/utils";
import { useLocalStorage } from "@mantine/hooks";
import { useRequest } from "ahooks";
import { useEffect, useMemo, useState } from "react";

const useProfile = () => {
  const [userInfo, setUserInfo] = useLocalStorage<UserProfile>({
    key: "userInfo",
    defaultValue: {},
  });
  const [userPlayList, setUserPlayList] = useLocalStorage<UserPlayList>({
    key: "userPlayList",
    defaultValue: {
      create: [],
      collect: [],
    },
  });

  const [userLikeList, setUserLikeList] = useState<SongItem[]>([]);

  const login = async () => {
    if (userInfo.avatarUrl) {
      return;
    }
    const [err, res] = await to(getLoginStatus());
    if (err || !res?.data?.profile) {
      // setStorage)
      return;
    }
    setUserInfo(res.data.profile);
    _getUserPlayList(res.data.profile.userId);
    setTimeout(() => {
      _getUserLikeListIds();
    }, 50);
  };

  const _getUserPlayList = async (id: any) => {
    const res = await getUserPlayList(id);
    if (res?.create.length > 0) {
      getUserLikeList(res?.create[0].id);
    }

    setUserPlayList(res);
  };

  const logout = async () => {
    await sendLogout();
    setUserInfo({});
    localStorage.setItem(COOKIE_KEY, "");

    api.emit("LOGOUT");
  };

  /*
    获取用户喜欢的歌单
  */
  const getUserLikeList = async (id: ID) => {
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
      setUserLikeList(songs);
    }

    // const
  };

  const getUserLikeListIds = async () => {
    const [err, res] = await to(getLikeListIds(userInfo.userId as ID));
    if (err) {
      return [];
    }
    return res.ids;
  };
  const { data: userLikeIds = [], run: _getUserLikeListIds } = useRequest(
    getUserLikeListIds,
    {
      manual: true,
    }
  );

  const likeListID = useMemo(() => {
    return userPlayList?.create?.[0]?.id;
  }, [userPlayList]);

  useEffect(() => {
    api.on("LOGIN_SUCCESS", login);
    login();
  }, []);

  return {
    userInfo,
    setUserInfo,
    logout,
    userPlayList,
    getUserLikeList: _getUserLikeListIds,
    likeListID,
    userLikeIds,
    userLikeList,
  };
};

export default useProfile;
