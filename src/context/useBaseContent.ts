import { getLoginStatus } from "@/api/user";
import { useLocalStorage } from "@mantine/hooks";
import React, { useState, createContext, useContext, useEffect } from "react";
import useProfile from "./useProfile";

type BaseContextProps = {
  theme: "dark" | "light";
  loginVisible: boolean;
  userInfo: UserProfile;
  toggleTheme(): void;
  setUserInfo(u: UserProfile): void;
  toggleLoginVisible(v: boolean): void;
};

export const Context = createContext<BaseContextProps>({} as any);
export const useBaseContext = () => useContext(Context);

const initContext = () => {


  const [theme, setTheme] = useLocalStorage<"dark" | "light">({
    key: "theme",
    defaultValue: "light",
  });

  const toggleTheme = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };






  const [loginVisible, toggleLoginVisible] = useState(false);

  return {
    toggleTheme,
    theme,
    loginVisible,
    toggleLoginVisible,
    ...useProfile(),
    // setLoginVisible
  };
};

export default initContext;
