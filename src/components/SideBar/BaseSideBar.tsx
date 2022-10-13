import routes from "@/config/routes";
import { useBaseContext } from "@/context/useBaseContent";
import { Menu } from "@mantine/core";
import React, { FC, ReactElement, useMemo } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./sidebar.module.less";

// @ts-ignore
import PlayListMenu from "../Container/playListMenu";
import Icon from "../icon/Icon";
import { useQuery } from "@/common/use";

interface IProps {}
const BaseSideBar: FC<IProps> = (): ReactElement => {
  const menus = useMemo(() => {
    return routes.filter(({ isMenu }) => isMenu);
  }, [routes]);
  const { likeListID } = useBaseContext();


  const {id} = useQuery()

  return (
    <div className={`${styles["sidebar"]} `}>
      {menus.map(({ path, icon, name }) => {
        return (
          <NavLink
            className={({ isActive }) =>
              `${styles["menu-icon"]} ${isActive ? styles["active"] : ""} hover`
            }
            to={path}
            key={path}
            title={name}
          >
            <Icon type={icon as any} size={30} />
            <div>{name}</div>
          </NavLink>
        );
      })}
      <NavLink
        className={({ isActive }) =>
          `${styles["menu-icon"]} ${isActive && id ==  likeListID? styles["active"] : ""} hover`
        }
        to={`/playList?id=${likeListID}`}
        key={`我喜欢`}
        title={`我喜欢`}
      >
        <Icon type={`like` as any} size={30} />
        <div>我喜欢</div>
      </NavLink>
    </div>
  );
};

export default BaseSideBar;
