import routes from "@/config/routes";
import { useBaseContext } from "@/context/useBaseContent";
import { Menu } from "@mantine/core";
import React, { FC, ReactElement, useMemo } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./sidebar.module.less";
import SubPlayListMenu from "./SubPlayListMenu";
interface IProps {}
const SideBar: FC<IProps> = (): ReactElement => {
  const menus = useMemo(() => {
    return routes.filter(({ isMenu }) => isMenu);
  }, [routes]);
  const { userInfo, userPlayList } = useBaseContext();

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
      <SubPlayListMenu label="创建的歌单" list={userPlayList.create} />
    </div>
  );
};

export default SideBar;
