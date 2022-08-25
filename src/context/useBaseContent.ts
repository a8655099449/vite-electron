import { getLoginStatus } from "@/api/user";
import { useLocalStorage } from "@mantine/hooks";
import React, { useState, createContext, useContext, useEffect } from "react";

type BaseContextProps = {
  theme: "dark" | "light";
  loginVisible: boolean;
  toggleTheme(): void;
  toggleLoginVisible(v: boolean): void;
};

export const Context = createContext<BaseContextProps>({} as any);
export const useBaseContext = () => useContext(Context);

const initContext = () => {
  // const [store, setStore] = useState<Pick<BaseContextProps, "theme">>({
  //   theme: "light",
  // });

  const [theme, setTheme] = useLocalStorage<"dark" | "light">({
    key: "theme",
    defaultValue: "light",
  });

  const toggleTheme = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };

  const initLogin = async () => {
    // const res = await getLoginStatus()

  }



  // 登录成功的回调函数
  const loginSuccess = (...e:any) => {
    console.log('👴登录成功',e)
  };

  useEffect(() => {
    api.on("LOGIN_SUCCESS", loginSuccess);
    initLogin()
    console.log('👴2022-08-25 10:41:27 useBaseContent.ts line:45','useEffect')
  }, []);

  const [loginVisible, toggleLoginVisible] = useState(false);

  // const toggleLoginVisible = (v) => {}

  return {
    toggleTheme,
    theme,
    loginVisible,
    toggleLoginVisible,
    // setLoginVisible
  };
};

export default initContext;
