import SongTimeBar from "@/components/Container/SongTimeBar";
import Icon from "@/components/icon/Icon";
import React, { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.less";
interface IProps {
  data: SongItem[];
}
const PlayListTable: FC<IProps> = ({ data }): ReactElement => {
  return (
    <div>
      <table className={`play-list-table`}>
        <thead>
          <tr>
            <th></th>
            <th>操作</th>
            <th>歌名</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时间</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>
                <Icon type="like" size={18} hoverLight />
                <Icon type="download" size={18} hoverLight />
                <Icon
                  type="play"
                  size={18}
                  hoverLight
                  onClick={(e) => {
                    api.emit("PLAY", item.id);
                  }}
                />
              </td>
              <td>
                <div className={`song-name text-row-1`}>{item.name}</div>
              </td>
              <td>
                <Link
                  to={"/"}
                  style={{
                    display: "block",
                    width: 150,
                  }}
                  className="text-row-1"
                >
                  {" "}
                  {item.ar?.[0].name}
                </Link>
              </td>
              <td>{item.al.name}</td>
              <td>
                <SongTimeBar dt={item.dt} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayListTable;
