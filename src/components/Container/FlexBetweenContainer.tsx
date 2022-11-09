import { FC, ReactElement, ReactNode } from "react";
interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  leftWidth?: number;
  space?: number; // 间距
  left?: ReactNode;
}
const FlexBetweenContainer: FC<IProps> = ({
  children,
  left,
  leftWidth = 100,
  space = 10,

  ...rest
}): ReactElement => {
  return (
    <div
      {...rest}
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          width: leftWidth,
        }}
      >
        {left}
      </div>
      <div
        style={{
          width: `calc(100% - ${leftWidth + space}px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default FlexBetweenContainer;
