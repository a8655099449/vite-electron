import { IMAGE_ALBUM } from "@/common/images";
import React, { FC, ReactElement } from "react";
import Control, { PlayerRight } from "./Control";
import "./player.less";
interface IProps {}
const Player: FC<IProps> = (): ReactElement => {
  return (
    <div className="player">
      <div className="music-info">
        <div className="image">
          <img src={IMAGE_ALBUM} alt="" />
        </div>
        <div className="text-box">
          <div>贝加尔湖畔</div>
          <div>李建</div>
        </div>
      </div>
      <Control />
      <PlayerRight />
    </div>
  );
};

export default Player;
