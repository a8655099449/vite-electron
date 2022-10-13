import { getHighQualityPlayList, getPlayListCateHot } from "@/api/songList";
import PageWrap from "@/components/Container/PageWrap";
import { useRequest } from "ahooks";
import React, { FC, ReactElement } from "react";
import { HomeTabs } from "../home/home";
import HightPlayListBanner from "./HightPlayListBanner";

interface IProps {}
const homePlayListCate: FC<IProps> = (): ReactElement => {
  const { data } = useRequest(getPlayListCateHot);

  const { data: hightPlayList } = useRequest(() => getHighQualityPlayList({}));

  console.log(
    "👴2022-10-13 10:39:21 homePlayListCate.tsx line:11",
    hightPlayList
  );
  return (
    <PageWrap>
      <HomeTabs />
      <HightPlayListBanner />
    </PageWrap>
  );
};

export default homePlayListCate;
