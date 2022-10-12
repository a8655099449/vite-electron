import { useBaseContext } from "@/context/useBaseContent";
import React, { FC, ReactElement } from "react";
import logo from "../../../public/logo.png";
import Icon from "../icon/Icon";

import styles from "./index.module.less";
interface IProps {}
const Logo: FC<IProps> = (): ReactElement => {
  const { playDetailVisible, togglePlayDetailVisible } = useBaseContext();
  return (
    <div className={`${styles["logo"]} `}>
      {playDetailVisible ? (
        <div className={`${styles['down-arrow']}`}>
          <Icon type="arrow-right" size={20} button onClick={togglePlayDetailVisible} />
        </div>
      ) : (
        <>
          <img src={logo} alt="" style={{ width: 28 }} />
          <span className="bold" style={{
            fontSize:16
          }}>Crazy Music</span>
        </>
      )}
    </div>
  );
};

export default Logo;
