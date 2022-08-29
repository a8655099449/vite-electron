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
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default NotPlayInfo;
