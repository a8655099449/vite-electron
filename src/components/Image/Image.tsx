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
}
import loadingImage from "./loadng.gif";

const Image: FC<IProps> = ({ src, style, round, ...rest }): ReactElement => {
  const [loading, setLoading] = useState(true);
  const imageRef = useRef<HTMLImageElement>(null);

  const _src = useMemo(() => {
    return src;
  }, [src]);

  if (!src) {
    return <></>;
  }

  return (
    <img
      {...rest}
      ref={imageRef}
      src={_src}
      style={{
        ...style,
        borderRadius: round ? "50%" : undefined,
      }}
      onLoad={() => setLoading(false)}
    />
  );
};

export default Image;
