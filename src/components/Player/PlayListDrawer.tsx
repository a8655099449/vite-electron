import PlayListTable from "@/pages/songList/PlayListTable";
import React, { FC, ReactElement } from "react";

interface IProps {
  visible: boolean;
  list:SongItem[]
}
const PlayListDrawer: FC<IProps> = ({ visible ,list=[]}): ReactElement => {
  return (
    <div className={`play-list-drawer ${visible ? "show" : "hidden"}`}>
      <h2>当前播放</h2>
      <div></div>
      <PlayListTable data={list} />
    </div>
  );
};

export default PlayListDrawer;
