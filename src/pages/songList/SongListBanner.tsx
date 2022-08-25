import { IMAGE_AVATAR } from "@/common/images";
import Image from "@/components/Image/Image";
import { Button } from "@mantine/core";
import dayjs from "dayjs";
import React, { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.less";

interface IProps {
  data: SongListItem;
}
const SongListBanner: FC<IProps> = ({ data }): ReactElement => {
  const { tags, creator, createTime, description } = data;
  console.log("👴2022-08-25 17:59:12 SongListBanner.tsx line:14", data);
  return (
    <div className={`${styles["song-list-banner"]}`}>
      <div className={`${styles["pic"]}`}>
        <Image src={data.coverImgUrl} />
      </div>
      <div className={`${styles["content"]}`}>
        <h1>{data.name}</h1>
        <div className={`${styles["author"]}`}>
          <Image src={creator.avatarUrl} />
          <Link to={""}>{creator.nickname}</Link>
          <span>{dayjs(createTime).format("YYYY-MM-DD")} 创建</span>
        </div>
        <div className={`${styles["button"]}`}>
          <Button size="xs">播放全部</Button>
          <Button size="xs" variant={"outline"}>
            收藏
          </Button>
          <Button size="xs" variant={"outline"}>
            分享
          </Button>
          <Button size="xs" variant={"outline"}>
            下载
          </Button>
        </div>
        <div className={`${styles["item"]} mb-10`}>
          标签:
          {
            // data.tags
            tags.map((item) => (
              <span className="tag" key={item}>
                {item}
              </span>
            ))
          }
        </div>
        <div className={`${styles["item"]} mb-10`}>
          <span>歌曲：108</span>
          <span className={`${styles['play-count']}`}>播放：110万</span>
        </div>
        <div className={`${styles["item"]} mb-10`}>简介： {description}</div>
      </div>
    </div>
  );
};

export default SongListBanner;
