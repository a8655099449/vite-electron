import { FC, HTMLAttributes, ReactElement } from "react";
import Icon from "../icon/Icon";

type LoadMoreButtonProps = HTMLAttributes<HTMLDivElement>;
const LoadMoreButton: FC<LoadMoreButtonProps> = (p): ReactElement => {
  return (
    <div className="center hover" {...p}>
      加载更多
      <Icon
        type={"arrow-right"}
        style={{
          transform: "rotate(90deg)",
        }}
      />
    </div>
  );
};

export default LoadMoreButton;
