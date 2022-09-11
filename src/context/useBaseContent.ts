import { getLoginStatus } from "@/api/user";
import { useLocalStorage } from "@mantine/hooks";
import React, { useState, createContext, useContext, useEffect } from "react";
import useGlobalPlay from "./useGlobalPlay";
import useProfile from "./useProfile";

type BaseContextProps = {
  theme: "dark" | "light";
  loginVisible: boolean;
  toggleTheme(): void;
  toggleLoginVisible(v: boolean): void;
  logout(): void;

} & ReturnType<typeof useProfile> &
  ReturnType<typeof useGlobalPlay>;
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
    ...useGlobalPlay(),
    // setLoginVisible
  };
};

export default initContext;
