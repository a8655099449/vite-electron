import React, { FC, ReactElement } from "react";
import "./index.less";
interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}
const PageWrap: FC<IProps> = ({
  children,
  className = "",
  ...rest
}): ReactElement => {
  return (
    <div className={`${className} page-wrap`} {...rest}>
      {children}
    </div>
  );
};

export default PageWrap;
