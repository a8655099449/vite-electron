import { useQuery } from "@/common/use";
import { useLocalStorage } from "@mantine/hooks";
import React, { FC, ReactElement, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Icon from "../icon/Icon";
import Image from "../Image/Image";
import styles from "../Sidebar/sidebar.module.less";
interface IProps {
  label: string;
  list: SongListItem[];
}
const SubPlayListMenu: FC<IProps> = ({ label, list = [] }): ReactElement => {
  const [open, setOpen] = useLocalStorage({
    defaultValue: false,
    key: label + "SubPlayListMenuOpen",
  });
  const { pathname } = useLocation();
  const { id } = useQuery();

  useEffect(() => {
    if (
      pathname === "/playList" &&
      list.some((item) => item.id == id) &&
      !open
    ) {
      setOpen(true);
    }
  }, [pathname]);


  return (
    <div>
      <div
        className={`${styles["label"]}`}
        onClick={() => {
          setOpen(!open);
        }}
      >
        {label}
        <Icon
          type="play"
          size={10}
          color="var(--text-color-2)"
          style={{
            transform: `rotate(${open ? 90 : 0}deg)`,
          }}
        />
      </div>

      {open &&
        list.map((item) => (
          <NavLink
            className={`${styles["menu-item"]} hover text-row-1

              ${
                pathname === `/playList` && id == item.id
                  ? styles["playList-active"]
                  : ""
              }
            `}
            to={`/playList?id=${item.id}`}
            replace
            key={item.id}
          >
            <Image
              src={item.coverImgUrl}
              className={`${styles["playlist-pic"]}`}
            />
            {item.name}
          </NavLink>
        ))}
    </div>
  );
};

export default SubPlayListMenu;
