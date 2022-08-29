import { getLoginStatus } from "@/api/user";
import { COOKIE_KEY } from "@/common/consts";
import to from "@/common/to";
import { setStorage } from "@/common/utils";
import { useLocalStorage } from "@mantine/hooks";
import { useEffect } from "react";

const useProfile = () => {
  const [userInfo, setUserInfo] = useLocalStorage<UserProfile>({
    key: "userInfo",
    defaultValue: {},
  });
  const login = async () => {
    // const cookie = localStorage.getItem(COOKIE_KEY);
    if (userInfo.avatarUrl) {
      return;
    }

    const [err, res] = await to(getLoginStatus());
    if (err || !res.data.profile) {
      // setStorage)
      return;
    }
    setUserInfo(res.data.profile);
  };

  useEffect(() => {
    api.on("LOGIN_SUCCESS", login);
    login();
  }, []);

  return {
    userInfo,
    setUserInfo,
  };
};

export default useProfile;
