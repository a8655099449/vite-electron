import { getRecommendSongList } from "@/api/songList";
import to from "@/common/to";
import SongListItem from "@/components/Container/SongListItem";
import Icon from "@/components/icon/Icon";
import { useBaseContext } from "@/context/useBaseContent";
import { Skeleton } from "@mantine/core";
import { useRequest } from "ahooks";
import React, { FC, ReactElement, useMemo } from "react";
import styles from "./home.module.less";

interface IProps {
  data: any[];
  title?: string;
}
const RecommendSongList: FC<IProps> = ({
  data: _data = [],
  title,
}): ReactElement => {
  const data = useMemo(() => {
    const allList: any[] = [];

    _data.forEach((item) => {
      if (Array.isArray(item.resources)) {
        allList.push(...item.resources);
      }
    });

    return allList.map(
      (item) =>
        ({
          name: item.uiElement.mainTitle.title,
          id: item.resourceId,
          coverImgUrl: item.uiElement.image.imageUrl,
          playCount: item.resourceExtInfo.playCount,
        } as SongListItem)
    );
  }, [_data]);

  if (data.length === 0) {
    return <div></div>;
  }

  return (
    <div className={`${styles["recommend-list"]}`}>
      <h2>{title}</h2>
      <div>
        <div className={`${styles["list"]}`}>
          {data?.map((item, index) =>
            index < 9 ? <SongListItem item={item} key={item.id} /> : null
          )}
        </div>
      </div>
    </div>
  );
};

export default RecommendSongList;
