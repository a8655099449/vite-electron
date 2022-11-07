import { Provider } from "mobx-react";
import React, { FC, ReactElement } from "react";

interface IProps {
  children: React.ReactNode;
}
const BaseContext: FC<IProps> = ({ children }): ReactElement => {

  return (
    <Provider>{children}</Provider>
  );
};

export default BaseContext;
