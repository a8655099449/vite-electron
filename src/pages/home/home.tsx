import { IMAGE_BANNER } from "@/common/images";
import PageWrap from "@/components/Container/PageWrap";
import Image from "@/components/Image/Image";
import Swiper from "@/components/Swiper/Swiper";
import { Tabs } from "@mantine/core";
import React from "react";
// import Swiper from "swiper";

import styles from "./home.module.less";
const home = () => {
  return (
    <PageWrap className={`${styles["home"]}`}>
      <HomeTabs />
      <BannerSwiper />
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

const BannerSwiper = () => {
  return (
    <div className={`${styles["banner"]}`}>
      <Swiper />
    </div>
  );
};

export default home;
