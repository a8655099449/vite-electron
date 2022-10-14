import Icon from "@/components/icon/Icon";
import Image from "@/components/Image/Image";
import React, { FC, ReactElement } from "react";

import styles from "./index.module.less";

interface IProps {
  data?: SongListItem;
}
const HightPlayListBanner: FC<IProps> = ({ data }): ReactElement => {
  return (
    <div className={`${styles["HightPlayListBanner"]}`}>
      <div className={`${styles["mask"]}`} style={{
        backgroundImage:`url(${data?.coverImgUrl})`
      }} />
      <div className={`${styles["content"]}`}>
        <div className={`${styles["pic"]}`}>
          <Image src={data?.coverImgUrl} />
        </div>
        <div className={`${styles["desc"]}`}>
          <div className={`${styles["tag"]}`}>
            <Icon type="crown" />
            精品歌单
          </div>
          <div>{data?.name}</div>
        </div>
      </div>
    </div>
  );
};

export default HightPlayListBanner;
