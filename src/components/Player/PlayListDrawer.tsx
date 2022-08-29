import PlayListTable from "@/pages/songList/PlayListTable";
import React, { FC, ReactElement, useMemo } from "react";
import SongTimeBar from "../Container/SongTimeBar";
import Icon from "../icon/Icon";

interface IProps {
  visible: boolean;
  list: SongItem[];
  currentSong: SongItem;
  isPlay: boolean;
  playOne(e: any, id: any): void;
}
const PlayListDrawer: FC<IProps> = ({
  visible,
  list = [],
  currentSong,
  isPlay,
  playOne,
}): ReactElement => {
  return (
    <div className={`play-list-drawer ${visible ? "show" : "hidden"}`}>
      <div className="header">
        <h2>当前播放</h2>
      </div>
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
