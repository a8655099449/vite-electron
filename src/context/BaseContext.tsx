import React, { FC, ReactElement } from "react";
import initContext, { Context } from "./useBaseContent";

interface IProps {
  children: React.ReactNode;
}
const BaseContext: FC<IProps> = ({ children }): ReactElement => {
  const store= initContext();

  return <Context.Provider value={{ ...store }}>{children}</Context.Provider>;
};

export default BaseContext;
