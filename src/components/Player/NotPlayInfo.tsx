import { IMAGE_ALBUM } from "@/common/images";
import React, { FC, ReactElement } from "react";

interface IProps {}
const NotPlayInfo: FC<IProps> = (): ReactElement => {
  return (
    <div className="music-info">
      <div className="image">
        <img src={IMAGE_ALBUM} alt="" />
      </div>
      <div className="text-box">
        <div>贝加尔湖畔</div>
        <div>李建</div>
      </div>
    </div>
  );
};

export default NotPlayInfo;
