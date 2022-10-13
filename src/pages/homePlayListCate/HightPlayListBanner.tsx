import Image from "@/components/Image/Image";
import React, { FC, ReactElement } from "react";

import styles from "./index.module.less";

interface IProps {}
const HightPlayListBanner: FC<IProps> = (): ReactElement => {
  return (
    <div className={`${styles["HightPlayListBanner"]}`}>
      <div className={`${styles["mask"]}`} />
      <div  className={`${styles['content']}`}>
        <div className={`${styles['pic']}`}>
          <Image src="http://p2.music.126.net/NDdtSac66rpsF_jMBh1JMQ==/109951164929306650.jpg" />
        </div>
        <div>

          
        </div>
      </div>
    </div>
  );
};

export default HightPlayListBanner;
