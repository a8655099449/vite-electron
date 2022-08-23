import React from "react";

import styles from "./home.module.less";
const home = () => {
  return (
    <div className={`${styles["home"]}`}>
      <div className={`${styles["banner"]}`}></div>

    </div>
  );
};

export default home;
