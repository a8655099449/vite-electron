import { MantineProvider, Button } from "@mantine/core";
import { useMemo, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes ,  } from "react-router-dom";
import { ICONFONT_URL } from "./common/consts";
import Header from "./components/Header";
import Layout from "./components/Layout/Layout";
import lazyLoad from "./components/lazyLoad";
import Login from "./components/Login/Login";
import PlayDetail from "./components/PlayDetail/PlayDetail";
import Player from "./components/Player/Player";
import BaseSideBar from "./components/SideBar/BaseSideBar";
// import SideBar from "./components/Sidebar/BaseSideBar";

import routes from "./config/routes";
import BaseContext from "./context/BaseContext";
import { useBaseContext } from "./context/useBaseContent";




const App: React.FC = () => {
  const { theme, playDetailVisible } = useBaseContext();
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
        <Toaster />
        <Header />
        <Layout sideBar={<BaseSideBar />}>
          <Routes>
            {components.map(({ component: EL, path }) => (
              <Route element={<EL />} path={path} key={path} />
            ))}
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </Layout>
        <Player />
        {playDetailVisible && <PlayDetail />}
      </MantineProvider>
    </div>
  );
};

export default App;
