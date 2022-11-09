import { getArtistDesc, getArtistDetail } from "@/api/artists";
import { useQuery } from "@/common/use";
import BaseTabs from "@/components/Container/BaseTabs";
import FlexBetweenContainer from "@/components/Container/FlexBetweenContainer";
import PageWrap from "@/components/Container/PageWrap";
import Skeleton from "@/components/Container/Skeleton";
import Image from "@/components/Image/Image";
import { useRequest } from "ahooks";
import React, { useEffect, useState } from "react";
import ArtistMv from "./ArtistMv";
import ArtistSelection from "./ArtistSelection";

import styles from "./index.module.less";

const artistDetail = () => {
  const { id } = useQuery();

  const { run, data, loading } = useRequest(() => getArtistDetail(id), {
    manual: true,
  });
  const { data: desc, run: run2 } = useRequest(() => getArtistDesc(id), {
    manual: true,
  });

  useEffect(() => {
    run();
    run2();
  }, [id]);
  const artist = data?.data?.artist;
  const [active, setActive] = useState("MV");

  return (
    <PageWrap title={`歌手 - ${artist?.name || ""}`}>
      <Skeleton loading={loading}>
        <FlexBetweenContainer
          leftWidth={180}
          left={
            <div className={`${styles["pic"]}`}>
              <Image src={artist?.cover} width={180} />
            </div>
          }
          className={`${styles["info"]}`}
        >
          <div className={`${styles["left-info"]}`}>
            <h2>{artist?.name}</h2>
            <div>
              <div>职业：{artist?.identifyTag} </div>
            </div>
            <div className={`${styles["count"]}`}>
              <span>单曲数：{artist?.musicSize}</span>
              <span>专辑数：{artist?.albumSize}</span>
              <span>mv数：{artist?.mvSize}</span>
            </div>
            <div className={`text-row-2`}>描述 ：{artist?.briefDesc}</div>
          </div>
        </FlexBetweenContainer>
        <BaseTabs
          list={[
            { children: "精选", value: "精选", content: <ArtistSelection /> },
            { children: "MV", value: "MV", content: <ArtistMv /> },
            { children: "专辑", value: "专辑" },
            { children: "介绍", value: "介绍" },
            { children: "相似歌手", value: "相似歌手" },
          ]}
          value={active}
          onChange={(e) => {
            setActive(e);
          }}
        />
      </Skeleton>
    </PageWrap>
  );
};

export default artistDetail;
