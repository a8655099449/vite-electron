import React, { FC, ReactElement } from "react";
import styles from "./index.module.less";
interface IProps {
  data: SongItem[];
}
const PlayListTable: FC<IProps> = ({ data }): ReactElement => {
  return (
    <div>
      <table className={`${styles["play-list-table"]}`}>
        <thead>
          <tr>
            <th>歌名</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td><div className={`${styles['name']}`}>{item.name}</div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayListTable;
