
import routes from "@/config/routes";
import { useBaseContext } from "@/context/useBaseContent";
import { Menu } from "@mantine/core";
import React, { FC, ReactElement, useMemo } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./sidebar.module.less";

// @ts-ignore
import PlayListMenu from "../Container/playListMenu";

interface IProps {}
const BaseSideBar: FC<IProps> = (): ReactElement => {
  const menus = useMemo(() => {
    return routes.filter(({ isMenu }) => isMenu);
  }, [routes]);
  const { userInfo, userPlayList } = useBaseContext();
  console.log('👴2022-09-29 21:51:50 BaseSideBar.tsx line:18',userInfo)
  return (
    <div className={`${styles["sidebar"]} `}>
      {menus.map(({ name, path }) => {
        return (
          <NavLink
            className={({ isActive }) =>
              `${styles["menu-item"]} ${isActive ? styles["active"] : ""} hover`
            }

            to={path}
            key={name}
          >
            {name}
          </NavLink>
        );
      })}
      {userInfo.avatarUrl && (
        <>
          <PlayListMenu label="创建的歌单" list={userPlayList.create} />
          <PlayListMenu label="收藏的歌单" list={userPlayList.collect} />
        </>
      )}
    </div>
  );
};

export default BaseSideBar;
