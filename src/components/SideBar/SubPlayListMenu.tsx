import React, { FC, ReactElement } from "react";
import styles from "./sidebar.module.less";
interface IProps {
  label: string;
  list: SongListItem[];
}
const SubPlayListMenu: FC<IProps> = ({ label, list = [] }): ReactElement => {
  return (
    <div>
      {label}
      {list.map((item) => (
        <div className={`${styles["menu-item"]} hover`}>{item.name}</div>
      ))}
    </div>
  );
};

export default SubPlayListMenu;
