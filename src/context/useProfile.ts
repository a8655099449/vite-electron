import {
  getLoginStatus,
  getUserDetail,
  getUserPlayList,
  sendLogout,
} from "@/api/user";
import { COOKIE_KEY } from "@/common/consts";
import to from "@/common/to";
import { setStorage } from "@/common/utils";
import { useLocalStorage } from "@mantine/hooks";
import { useEffect, useState } from "react";

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
  };

  const _getUserPlayList = async (id: any) => {
    const res = await getUserPlayList(id);
    setUserPlayList(res);
  };

  const logout = async () => {
    await sendLogout();
    setUserInfo({});
    localStorage.setItem(COOKIE_KEY, "");

    api.emit('LOGOUT')

  };

  useEffect(() => {
    api.on("LOGIN_SUCCESS", login);
    login();
  }, []);

  return {
    userInfo,
    setUserInfo,
    logout,
    userPlayList,
  };
};

export default useProfile;
