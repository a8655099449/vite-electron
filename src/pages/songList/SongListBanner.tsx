import { IMAGE_AVATAR } from "@/common/images";
import Icon from "@/components/icon/Icon";
import Image from "@/components/Image/Image";
import { Button } from "@mantine/core";
import dayjs from "dayjs";
import React, { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.less";
import PalyCount from "./PalyCount";

interface IProps {
  data: SongListItem;
}
const SongListBanner: FC<IProps> = ({ data }): ReactElement => {
  const { tags, creator, createTime, description, playCount , trackCount } = data;

  return (
    <div className={`${styles["song-list-banner"]}`}>
      <div className={`${styles["pic"]}`}>
        <Image
          src={data.coverImgUrl}
          style={{
            width: 210,
          }}
        />
      </div>
      <div className={`${styles["content"]}`}>
        <h1>{data.name}</h1>
        <div className={`${styles["author"]}`}>
          <Image src={creator.avatarUrl} />
          <Link to={""}>{creator.nickname}</Link>
          <span>{dayjs(createTime).format("YYYY-MM-DD")} 创建</span>
        </div>
        <div className={`${styles["button"]}`}>
          <Button size="xs" leftIcon={<Icon type="play" />}>
            播放全部
          </Button>
          <Button
            size="xs"
            variant={"outline"}
            leftIcon={<Icon type="collect" size={18} />}
          >
            收藏
          </Button>
          <Button
            size="xs"
            variant={"outline"}
            leftIcon={<Icon type="share" size={18} />}
          >
            分享
          </Button>
          <Button
            size="xs"
            variant={"outline"}
            leftIcon={<Icon type="download" size={18} />}
          >
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
          <span>歌曲：{trackCount}</span>
          <span className={`${styles["play-count"]}`}>
            播放：
            <PalyCount count={playCount} />
          </span>
        </div>
        <div className={`${styles["item"]} mb-10 text-row-1`}>
          简介： {description}
        </div>
      </div>
    </div>
  );
};

export default SongListBanner;
