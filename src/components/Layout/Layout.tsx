import React, { FC, ReactElement, ReactNode } from "react";
import './layout.less'
interface IProps {
  // Header: ReactNode;
  sideBar: ReactNode;
  children: ReactNode;
}
const Layout: FC<IProps> = ({ sideBar, children }): ReactElement => {
  return (
    <div className="layout">
      <div className="sidebar border-right-1">{sideBar}</div>
      <div className="content">{children}</div>
    </div>
  );
};

export default Layout;
