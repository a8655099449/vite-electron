import { getArtistList, getHotArtists } from "@/api/artists";
import { getStore } from "@/common/utils";
import PageWrap from "@/components/Container/PageWrap";
import Skeleton from "@/components/Container/Skeleton";
import { useLocalStorage } from "@mantine/hooks";
import { useRequest } from "ahooks";
import React, { useEffect, useRef, useState } from "react";
import { HomeTabs } from "../home/home";
import ArtistFilter from "./ArtistFilter";
import ArtistList from "./ArtistList";

import styles from "./index.module.less";

const artists = () => {
  const { data, run, loading } = useRequest(
    () => getArtistList(ref.current.search),
    {
      manual: true,
    }
  );

  const [search, setSearch] = useLocalStorage({
    key: "artistsSearch",
    defaultValue: {
      area: -1,
      type: -1,
      initial: -1,
    },
  });
  const ref = useRef({
    search: getStore("artistsSearch"),
  });

  const handleSearchChange = (key: keyof typeof search, value: any) => {
    search[key] = value as any;
    setSearch({ ...search });
  };

  useEffect(() => {
    ref.current.search = search;
    run();
  }, [search]);

  return (
    <PageWrap>
      <HomeTabs />
      <ArtistFilter search={search} handleSearchChange={handleSearchChange} />
      <Skeleton loading={loading}>
        <ArtistList list={data?.artists || []} />
      </Skeleton>
    </PageWrap>
  );
};

export default artists;
