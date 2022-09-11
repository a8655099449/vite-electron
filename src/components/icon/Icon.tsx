import React, { FC, ReactElement } from "react";
import "./index.less";

const typeMap = {
  close: "icon-guanbi1",
  full: "icon-fangda",
  minus: "icon-jianhao",
  reload: "icon-refresh",
  message: "icon-xiaoxi",
  setting: "icon-setting",
  zoomOut: "icon-suoxiao1",
  play: "icon-bofang",
  volume: "icon-volume",
  disabledVolume: "icon-volume_close",
  next: "icon-M_bofangkuaijin",
  randomPlay: "icon-suijibofang",
  onceLoop: "icon-danquxunhuan",
  listLoop: "icon-24gl-repeat2",
  songWord: "icon-geciweidianji",
  list: "icon-list",
  "arrow-right": "icon-arrow-right",
  download: "icon-download",
  share: "icon-share",
  collect: "icon-folder-add",
  like: "icon-fabulous",
  pause: "icon-pause1",
  empty: "icon-empty",
  logout: "icon-logout",
};
export type IconType = keyof typeof typeMap;
export interface IconProps extends React.HTMLAttributes<HTMLElement> {
  type: IconType;
  button: boolean;
  hoverLight: boolean;
  size: number;
}

const Icon: FC<Partial<IconProps>> = ({
  type = "close",
  button = false,
  hoverLight = false,
  className = "",
  size = 14,
  style = {},
  ...rest
}): ReactElement => {
  let _className = `base-icon iconfont ${typeMap[type] || typeMap["close"]}`;
  if (button) {
    _className += ` icon-button`;
  }
  if (hoverLight) {
    _className += ` hover-hightLight`;
  }

  return (
    <i
      {...rest}
      className={`${_className} ${className}`}
      style={{
        fontSize: size,
        ...style,
      }}
    />
  );
};

export default Icon;
