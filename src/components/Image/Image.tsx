import React, { FC, ReactElement } from "react";
import LazyLoad from "react-lazyload";
interface IProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  round?: boolean;
}
const Image: FC<IProps> = ({ src, style, round, ...rest }): ReactElement => {
  if (!src) {
    return <></>;
  }

  return (
    <img
      {...rest}
      src={src}
      style={{
        ...style,
        borderRadius: round ? "50%" : undefined,
      }}
    />
  );
};

export default Image;
