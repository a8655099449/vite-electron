import React, { FC, ReactElement } from "react";
import LazyLoad from "react-lazyload";
interface IProps extends React.ImgHTMLAttributes<HTMLImageElement> {}
const Image: FC<IProps> = ({ src, ...rest }): ReactElement => {
  if (!src) {
    return <></>;
  }

  return <img {...rest} src={src} />;
};

export default Image;
