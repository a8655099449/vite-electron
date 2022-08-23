import routes from "@/config/routes";
import { Menu } from "@mantine/core";
import React, { FC, ReactElement, useMemo } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./sidebar.module.less";
interface IProps {}
const SideBar: FC<IProps> = (): ReactElement => {
  const menus = useMemo(() => {
    return routes.filter(({ isMenu }) => isMenu);
  }, [routes]);

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
    </div>
  );
};

export default SideBar;
