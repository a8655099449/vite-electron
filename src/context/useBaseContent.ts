import { useLocalStorage } from "@mantine/hooks";
import React, { useState, createContext, useContext } from "react";

type BaseContextProps = {
  theme: "dark" | "light";
  toggleTheme(): void;
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

  return {

    toggleTheme,
    theme,
  };
};

export default initContext;
