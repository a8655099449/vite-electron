import React, { FC, ReactElement } from "react";
import logo from "../../../public/logo.png";

import styles from "./index.module.less";
interface IProps {}
const Logo: FC<IProps> = (): ReactElement => {
  return (
    <div className={`${styles["logo"]} drag`}>
      <img src={logo} alt="" style={{ width: 28 }} />
      疯狂星期四
    </div>
  );
};

export default Logo;
