import React, { FC, ReactElement } from "react";
import "./index.less";
import { Helmet } from "react-helmet";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}
const PageWrap: FC<IProps> = ({
  children,
  className = "",
  title = "Crazy music",
  ...rest
}): ReactElement => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className={`${className} page-wrap`} {...rest}>
        {children}
      </div>
    </>
  );
};

export default PageWrap;
