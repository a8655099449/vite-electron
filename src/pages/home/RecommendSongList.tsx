import { getRecommendSongList } from "@/api/songList";
import SongListItem from "@/components/Container/SongListItem";
import Icon from "@/components/icon/Icon";
import { Skeleton } from "@mantine/core";
import { useRequest } from "ahooks";
import React, { FC, ReactElement } from "react";
import styles from "./home.module.less";

interface IProps {}
const RecommendSongList: FC<IProps> = (): ReactElement => {
  const { data, loading } = useRequest(getRecommendSongList);
  if (data?.code !== 200 ) {
    return <></>
  }

  return (
    <div className={`${styles["recommend-list"]}`}>
      <h2>
        推荐歌单 <Icon type="arrow-right" size={20} />
      </h2>
      <div>
        <div className={`${styles["list"]}`}>
          {data?.recommend.map((item, index) =>
            index < 9 ? <SongListItem item={item} key={item.id} /> : null
          )}
        </div>
      </div>
    </div>
  );
};

export default RecommendSongList;
