import PlayListTable from "@/pages/songList/PlayListTable";
import React, { FC, ReactElement, useMemo } from "react";
import Empty from "../Container/Empty";
import SongTimeBar from "../Container/SongTimeBar";
import Icon from "../icon/Icon";

interface IProps {
  visible: boolean;
  list: SongItem[];
  currentSong: SongItem;
  isPlay: boolean;
  clearList(): void;
}
const PlayListDrawer: FC<IProps> = ({
  visible,
  list = [],
  currentSong,
  isPlay,
  clearList,
}): ReactElement => {
  return (
    <div className={`play-list-drawer ${visible ? "show" : "hidden"}`}>
      <div className="header">
        <h2>当前播放</h2>
      </div>
      <div className="play-list-handle">
        <div>共{list.length}首</div>
        <div className="link" onClick={clearList}>
          清空列表
        </div>
      </div>
      <div>{list.length === 0 && <Empty  />}</div>
      <table className={`player-list play-list-table`}>
        <tbody>
          {list.map((item) => (
            <tr
              className={currentSong.name === item.name ? "active" : ""}
              onDoubleClick={(e) => {
                api.emit("PLAY", item.id);
              }}
              key={item.id}
            >
              <td>
                <Icon type={isPlay ? "play" : "pause"} size={12} />

                {item.name}
              </td>
              <td>
                <div
                  style={{
                    width: 120,
                  }}
                  className="text-row-1"
                >
                  {item.ar[0].name}
                </div>
              </td>
              <td>
                <SongTimeBar dt={item.dt} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <PlayListTable data={list} /> */}
    </div>
  );
};

export default PlayListDrawer;
