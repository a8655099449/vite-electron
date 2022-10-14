import { debounce, throttle } from "@/common/utils";
import React, { FC, ReactElement, ReactNode, useEffect, useRef } from "react";
import ErrorCatch from "../Container/ErrorCatch";
import "./layout.less";
interface IProps {
  // Header: ReactNode;
  sideBar: ReactNode;
  children: ReactNode;
}
const Layout: FC<IProps> = ({ sideBar, children }): ReactElement => {
  const content = useRef<HTMLDivElement>(null);

  const handleScroll = (e: any) => {
    const { scrollTop, clientHeight, scrollHeight } =
      content.current as HTMLDivElement;
    if (scrollTop + clientHeight >= scrollHeight) {
      emit();
    }
  };

  const emit = debounce(() => {
    api.emit("LAYOUT_TO_BOTTOM");
  });

  useEffect(() => {
    content.current?.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="layout">
      <div className="sidebar border-right-1 scroll-y">{sideBar}</div>
      <div className="content" ref={content}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
