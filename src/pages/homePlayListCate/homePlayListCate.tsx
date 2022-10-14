import {
  getHighQualityPlayList,
  getHotPlaylistByCate,
  getPlayListCateHot,
} from "@/api/songList";
import to from "@/common/to";
import { useLayoutToBottom } from "@/common/use";
import PageWrap from "@/components/Container/PageWrap";
import PlayListWrap from "@/components/Container/PlayListWrap";
import Skeleton from "@/components/Container/Skeleton";
import { useLocalStorage } from "@mantine/hooks";
import { useRequest } from "ahooks";
import React, { FC, ReactElement, useEffect, useState } from "react";
import { HomeTabs } from "../home/home";
import HightPlayListBanner from "./HightPlayListBanner";
import styles from "./index.module.less";

interface IProps {}
const homePlayListCate: FC<IProps> = (): ReactElement => {
  const { data: cates = [] } = useRequest(async () => {
    const [err, res] = await to(getPlayListCateHot());
    if (err) {
      return [];
    }

    setActiveCate(res.tags[0].name);
    return res.tags;
  });
  const [activeCate, setActiveCate] = useLocalStorage({
    defaultValue: "",
    key: "activeCate",
  });
  const {
    data: hightPlayList,
    loading: hightPlayListLoading,
    run: getHightPlayList,
  } = useRequest(
    (cat = "") =>
      getHighQualityPlayList({
        limit: 1,
        cat,
      }),
    { manual: true }
  );
  const [playList, setPlayList] = useState<SongListItem[]>([]);
  const {
    // data: playList,
    run: _getHotPlaylistByCate,
    loading: playListLoading,
  } = useRequest(
    async ({ cat, offset }) => {
      const [err, res] = await to(getHotPlaylistByCate({ cat, offset }));
      if (err) {
        return;
      }
      if (!offset) {
        setPlayList(res.playlists);
      } else {
        setPlayList([...playList, ...res.playlists]);
      }
      return res;
    },
    { manual: true }
  );

  useLayoutToBottom((e) => {
    console.log("👴触底了", e);
    _getHotPlaylistByCate({
      offset: e,
      cat: activeCate,
    });
  });

  useEffect(() => {
    if (activeCate) {
      getHightPlayList(activeCate);
      _getHotPlaylistByCate({ cat: activeCate });
    }
  }, [activeCate]);

  return (
    <PageWrap>
      <HomeTabs />
      <Skeleton loading={hightPlayListLoading} minHeight={180}>
        <HightPlayListBanner data={hightPlayList?.playlists[0]} />
      </Skeleton>

      <div className={`${styles["cates"]}`}>
        <div></div>
        <div>
          {cates?.map((item) => (
            <span
              key={item.name}
              className={`${activeCate === item.name ? styles["active"] : ""}`}
              onClick={(e) => {
                if (activeCate === item.name) {
                  return;
                }
                setPlayList([])
                setActiveCate(item.name);
              }}
            >
              {item.name}
            </span>
          ))}
        </div>
      </div>
      <PlayListWrap list={playList || []} loading={playListLoading} />
    </PageWrap>
  );
};

export default homePlayListCate;
