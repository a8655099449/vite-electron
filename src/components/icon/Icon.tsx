import React, { FC, ReactElement } from "react";
import  "./index.less";

const typeMap = {
  close: "icon-guanbi1",
  full: "icon-fangda",
  minus: "icon-jianhao",
  reload: "icon-shuaxin",
  message: "icon-xiaoxi",
  setting: "icon-shezhi",
  zoomOut: "icon-suoxiao1",
};
export type IconType =  keyof typeof typeMap
export interface IconProps extends React.HTMLAttributes<HTMLElement> {
  type: IconType;
  button:boolean
}


const Icon: FC<Partial<IconProps>> = ({
  type = "close",
  button = true ,
  className='',
  ...rest
}): ReactElement => {

  let _className = `base-icon iconfont ${typeMap[type]}`
  if (button) {
    _className += ` icon-button`
  }

  return <i {...rest} className={`${_className} ${className}`} />;
};

export default Icon;
