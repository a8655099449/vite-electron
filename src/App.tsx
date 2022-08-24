import { MantineProvider, Button } from "@mantine/core";
import { useMemo, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ICONFONT_URL } from "./common/consts";
import Header from "./components/Header";
import Layout from "./components/Layout/Layout";
import lazyLoad from "./components/lazyLoad";
import Login from "./components/Login/Login";
import Player from "./components/Player/Player";
import SideBar from "./components/SideBar/SideBar";
import routes from "./config/routes";
import BaseContext from "./context/BaseContext";
import { useBaseContext } from "./context/useBaseContent";

const App: React.FC = () => {
  const { theme, toggleTheme } = useBaseContext();
  const mod = import.meta.glob("./pages/**/[a-z[]*.tsx");
  // const
  const components = useMemo(() => {
    return routes.map((item) => {
      const names = item.path?.split("/");
      const name = names[names?.length - 1];

      item.component = lazyLoad(mod[`./pages${item.path}/${name}.tsx`]);
      return item;
    });
  }, [routes]);

  // console.log("👴", components);
  return (
    <div className={`main-container ${theme}`}>
      <style>
        {`
          @import url('${ICONFONT_URL}');
          `}
      </style>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme: theme, primaryColor: "red" }}
      >
        <Login />

        <Header />
        <Layout sideBar={<SideBar />}>
          <Routes>
            {components.map(({ component: EL, path }) => (
              <Route element={<EL />} path={path} key={path} />
            ))}
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </Layout>
        <Player />
      </MantineProvider>
    </div>
  );
};

export default App;
