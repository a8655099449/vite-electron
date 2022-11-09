import React, {
  FC,
  ReactElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import LazyLoad from "react-lazyload";
interface IProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  round?: boolean;
  width?: number;
}

const Image: FC<IProps> = ({
  src,
  style,
  round,
  width,
  height,
  ...rest
}): ReactElement => {
  const _src = useMemo(() => {
    let param = "";

    if (width) {
      param = `${src?.indexOf("?") === -1 ? `?` : ""}param=${width}y${
        height ? height : width
      }`;
    }

    return src + param;
  }, [src, width]);

  if (!src) {
    return <></>;
  }

  return (
    <img
      {...rest}
      src={_src}
      style={{
        ...style,
        borderRadius: round ? "50%" : undefined,
      }}
    />
  );
};

export default Image;
