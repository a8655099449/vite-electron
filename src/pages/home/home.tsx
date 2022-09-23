import { homepageData } from "@/api/songList";
import { HOME_PAGE_DATA } from "@/common/consts";
import { IMAGE_BANNER } from "@/common/images";
import to from "@/common/to";
import { useEvent } from "@/common/use";
import { getStore, setStorage } from "@/common/utils";
import Loading from "@/components/Container/Loading";
import PageWrap from "@/components/Container/PageWrap";
import Image from "@/components/Image/Image";
import Swiper from "@/components/Swiper/Swiper";
import { Skeleton, Tabs } from "@mantine/core";
import { useRequest } from "ahooks";
import React, { useEffect, useMemo } from "react";
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
  "HOMEPAGE_BLOCK_HOT_TOPIC"
  // "HOMEPAGE_BLOCK_MGC_PLAYLIST",
];
type homeData = {
  [K in TupleToUnion<BlockKeys>]: HomeData;
};
const home = () => {
  const { data, loading, run } = useRequest(async (clare = false) => {
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
    } = (data as homeData) || {};
    console.log("👴HOMEPAGE_BLOCK_HOT_TOPIC", HOMEPAGE_BLOCK_HOT_TOPIC);

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

      {loading ? (
        <Loading />
      ) : (
        <>
          <BannerSwiper data={banner} />
          <RecommendSongList {...recommend} />
          <RecommendSongList {...official} />

          <HomeSongList {...style} />
          <RecommendSongList {...mgc} />
          <HomeTopic {...topic} />

          {Object.keys(data).map((key, index) =>
            data[key].uiElement ? (
              <h2 key={index}>
                {data[key].uiElement.subTitle.title}
                {key}
              </h2>
            ) : null
          )}
        </>
      )}
    </PageWrap>
  );
};

const HomeTabs = () => {
  const list = [
    {
      value: "0",
      label: "个性推荐",
    },
    {
      value: "1",
      label: "专属定制",
    },
    {
      value: "2",
      label: "歌单",
    },
  ];

  return (
    <div className={`${styles["tabs"]}`}>
      <Tabs defaultValue={"0"}>
        <Tabs.List>
          {list.map((item) => (
            <Tabs.Tab key={item.label} value={item.value}>
              {item.label}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>
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
