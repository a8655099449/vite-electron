import Icon from "@/components/icon/Icon";
import Image from "@/components/Image/Image";
import React, { FC, ReactElement } from "react";

import styles from "./home.module.less";

interface IProps {
  title: string;
  data: Resource[];
}
const HomeSongList: FC<IProps> = ({ title, data = [] }): ReactElement => {
  if (data.length == 0) {
    return <React.Fragment />;
  }


  return (
    <div>
      <h2>{title}</h2>
      <div className={`${styles["song-list"]}`}>
        {data.map((item) => {
          return (
            <div className={`${styles["songItem"]}`} key={item.resourceId}>
              <div className={`${styles["song-pic"]}`}>
                <Image src={item.uiElement.image.imageUrl} />
              </div>
              <div className={`${styles["song-text"]}`}>
                <div>{item.uiElement.mainTitle.title}</div>
                <p
                  className="text-row-1"
                  title={item.uiElement.subTitle?.title}
                >
                  {item.uiElement.subTitle?.title}
                </p>
              </div>
              <div className={`${styles["icon"]}`}>
                <Icon
                  type="play"
                  hoverLight
                  onClick={(e) => {
                    api.emit("PLAY", item.resourceId);
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomeSongList;
