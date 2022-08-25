import { homepageData } from "@/api/songList";
import { HOME_PAGE_DATA } from "@/common/consts";
import { IMAGE_BANNER } from "@/common/images";
import to from "@/common/to";
import { getStore, setStorage } from "@/common/utils";
import PageWrap from "@/components/Container/PageWrap";
import Image from "@/components/Image/Image";
import Swiper from "@/components/Swiper/Swiper";
import { Skeleton, Tabs } from "@mantine/core";
import { useRequest } from "ahooks";
import React from "react";
// import Swiper from "swiper";

import styles from "./home.module.less";
import RecommendSongList from "./RecommendSongList";

type BlockKeys = [
  "HOMEPAGE_BANNER",
  "HOMEPAGE_BLOCK_PLAYLIST_RCMD",
  "HOMEPAGE_BLOCK_STYLE_RCMD",
  "HOMEPAGE_MUSIC_MLOG",
  "HOMEPAGE_BLOCK_MGC_PLAYLIST",
  "HOMEPAGE_BLOCK_HOT_TOPIC"
];
type homeData = {
  [K in TupleToUnion<BlockKeys>]: any;
};
const home = () => {
  const { data, loading } = useRequest(async () => {
    const data = getStore(HOME_PAGE_DATA);
    if (data) {
      return data;
    }

    const [err, res] = await to(homepageData());
    if (err || res.code !== 200) {
      return {} as homeData;
    }

    const blocks: homeData = {} as any;
    res.data.blocks.forEach((item) => {
      blocks[item.blockCode as TupleToUnion<BlockKeys>] = item as any;
    });

    setStorage(HOME_PAGE_DATA, blocks, 24 * 60 * 60 * 1000);
    return blocks;
  });
  console.log('👴',data)

  return (
    <PageWrap className={`${styles["home"]}`}>
      {loading ? (
        <Skeleton />
      ) : (
        <>
          <HomeTabs />
          <BannerSwiper data={data?.HOMEPAGE_BANNER.extInfo} />
          <RecommendSongList />
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
