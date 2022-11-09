import { getArtistList, getHotArtists } from "@/api/artists";
import to from "@/common/to";
import { useLayoutToBottom } from "@/common/use";
import { getStore } from "@/common/utils";
import PageWrap from "@/components/Container/PageWrap";
import Skeleton from "@/components/Container/Skeleton";
import { useLocalStorage } from "@mantine/hooks";
import { useDebounceFn, useRequest } from "ahooks";
import React, { useEffect, useRef, useState } from "react";
import { HomeTabs } from "../home/home";
import ArtistFilter from "./ArtistFilter";
import ArtistList from "./ArtistList";

import styles from "./index.module.less";

const artists = () => {
  const [list, setList] = useState<Artist[]>([]);

  const { data, run, loading } = useRequest(
    async (offset = 0) => {
      // return;
      const [err, res] = await to(
        getArtistList({
          ...ref.current.search,
          offset: offset * 50,
        })
      );
      if (res?.artists) {
        setList([...list, ...res?.artists]);
      }

      resetLoading();

      return res;
    },
    {
      manual: true,
    }
  );

  const { clearOffset, resetLoading } = useLayoutToBottom((e) => {
    run(e);
  });

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

  const { run: getBySearchChange } = useDebounceFn(
    () => {
      ref.current.search = search;
      clearOffset();
      setList([]);
      setTimeout(() => {
        run();
      }, 50);
    },
    {
      wait: 10,
    }
  );

  useEffect(() => {
    getBySearchChange();
  }, [search]);

  return (
    <PageWrap title={"首页 - 歌手"}>
      <HomeTabs />
      <ArtistFilter search={search} handleSearchChange={handleSearchChange} />
      {/* <Skeleton loading={loading}> */}
      <ArtistList list={list || []} loading={loading} />
      {/* </Skeleton> */}
    </PageWrap>
  );
};

export default artists;
