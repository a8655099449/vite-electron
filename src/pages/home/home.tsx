import { homepageData } from "@/api/songList";
import { HOME_PAGE_DATA } from "@/common/consts";
import { IMAGE_BANNER } from "@/common/images";
import to from "@/common/to";
import { useEvent } from "@/common/use";
import { getStore, setStorage } from "@/common/utils";
import BaseTabs from "@/components/Container/BaseTabs";
import Loading from "@/components/Container/Loading";
import PageWrap from "@/components/Container/PageWrap";
import Skeleton from "@/components/Container/Skeleton";
import Image from "@/components/Image/Image";
import Swiper from "@/components/Swiper/Swiper";
import { Tabs } from "@mantine/core";
import { useRequest } from "ahooks";
import React, { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import Swiper from "swiper";

import styles from "./home.module.less";
import HomeSongList from "./HomeSongList";
import HomeTopic from "./HomeTopic";
import RecommendSongList from "./RecommendSongList";

type BlockKeys = [
  "HOMEPAGE_BANNER",
  "HOMEPAGE_BLOCK_PLAYLIST_RCMD",
  "HOMEPAGE_BLOCK_STYLE_RCMD",
  "HOMEPAGE_MUSIC_MLOG",
  "HOMEPAGE_BLOCK_MGC_PLAYLIST",
  "HOMEPAGE_BLOCK_OFFICIAL_PLAYLIST",
  "HOMEPAGE_BLOCK_HOT_TOPIC",
  "HOMEPAGE_BLOCK_OLD_SUBSCRIBE_ARTIST_NEW"
  // "HOMEPAGE_BLOCK_MGC_PLAYLIST",
];
type homeData = {
  [K in TupleToUnion<BlockKeys>]: HomeData;
};
const home = () => {
  const {
    data = {},
    loading,
    run,
  } = useRequest(async (clare = false) => {
    const data = getStore(HOME_PAGE_DATA);
    if (data && !clare) {
      return data;
    }

    const [err, res] = await to(homepageData());
    if (err || res!.code !== 200) {
      return {} as homeData;
    }

    const blocks: homeData = {} as any;
    res!.data.blocks.forEach((item) => {
      blocks[item.blockCode as TupleToUnion<BlockKeys>] = item as any;
    });

    setStorage(HOME_PAGE_DATA, blocks, 24 * 60 * 60 * 1000);
    return blocks;
  });
  useEvent({
    key: "LOGIN_SUCCESS",
    event: () => run(true),
  });
  useEvent({
    key: "LOGOUT",
    event: () => run(true),
  });

  const { banner, recommend, official, mgc, style, topic } = useMemo(() => {
    const {
      HOMEPAGE_BANNER = {},
      HOMEPAGE_BLOCK_PLAYLIST_RCMD,
      HOMEPAGE_BLOCK_OFFICIAL_PLAYLIST,
      HOMEPAGE_BLOCK_MGC_PLAYLIST,
      HOMEPAGE_BLOCK_STYLE_RCMD,
      HOMEPAGE_BLOCK_HOT_TOPIC,
      HOMEPAGE_BLOCK_OLD_SUBSCRIBE_ARTIST_NEW,
    } = (data as homeData) || {};

    const styleSongs: Resource[] = [];
    const topics: Resource[] = [];

    if (HOMEPAGE_BLOCK_STYLE_RCMD?.creatives?.length) {
      HOMEPAGE_BLOCK_STYLE_RCMD?.creatives.forEach((item) => {
        item.resources.forEach((item) => styleSongs.push(item));
      });
    }
    if (HOMEPAGE_BLOCK_HOT_TOPIC?.creatives?.length) {
      HOMEPAGE_BLOCK_HOT_TOPIC?.creatives.forEach((item) => {
        item.resources.forEach((item) => topics.push(item));
      });
    }

    return {
      banner: HOMEPAGE_BANNER?.extInfo || [],
      recommend: {
        data: HOMEPAGE_BLOCK_PLAYLIST_RCMD?.creatives || [],
        title: HOMEPAGE_BLOCK_PLAYLIST_RCMD?.uiElement?.subTitle.title || "",
      },
      official: {
        data: HOMEPAGE_BLOCK_OFFICIAL_PLAYLIST?.creatives || [],
        title:
          HOMEPAGE_BLOCK_OFFICIAL_PLAYLIST?.uiElement?.subTitle.title || "",
      },
      mgc: {
        data: HOMEPAGE_BLOCK_MGC_PLAYLIST?.creatives || [],
        title: HOMEPAGE_BLOCK_MGC_PLAYLIST?.uiElement?.subTitle.title || "",
      },
      style: {
        data: styleSongs,
        title: HOMEPAGE_BLOCK_STYLE_RCMD?.uiElement?.subTitle?.title || "",
      },
      topic: {
        data: topics,
        title: HOMEPAGE_BLOCK_HOT_TOPIC?.uiElement?.subTitle?.title || "",
      },
    };
  }, [data]);

  return (
    <PageWrap className={`${styles["home"]}`}>
      <HomeTabs />

      <Skeleton loading={loading} type="bar" count={5}>
        <BannerSwiper data={banner} />
        <RecommendSongList {...recommend} />
        <RecommendSongList {...official} />

        <HomeSongList {...style} />
        <RecommendSongList {...mgc} />
      </Skeleton>
    </PageWrap>
  );
};

export const HomeTabs = () => {
  const { pathname } = useLocation();

  const to = useNavigate();

  return (
    <div className={`${styles["tabs"]}`}>
      <BaseTabs
        list={[
          {
            value: "/home",
            children: "个性推荐",
          },
          {
            value: "/homePlayListCate",
            children: "歌单",
          },
          {
            value: "/topList",
            children: "排行榜",
          },
          {
            value: "/artists",
            children: "歌手",
          },
        ]}
        value={pathname}
        onChange={(e) => {
          to(e);
        }}
      />
    </div>
  );
};

const BannerSwiper = ({ data }: any) => {
  return (
    <div className={`${styles["banner"]}`}>
      <Swiper>
        {data.banners.map((item: any) => (
          <div className={`${styles["banner-item"]}`} key={item.pic}>
            <Image src={item.pic} />
          </div>
        ))}
      </Swiper>
    </div>
  );
};

export default home;
