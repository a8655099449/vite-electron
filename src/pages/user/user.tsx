import { getUserDetail, getUserPlayList } from "@/api/user";
import { useQuery } from "@/common/use";
import BaseTabs from "@/components/Container/BaseTabs";
import PlayListWrap from "@/components/Container/PlayListWrap";
import Skeleton from "@/components/Container/Skeleton";
import SongListItem from "@/components/Container/SongListItem";
import { useRequest } from "ahooks";
import React, { FC, ReactElement, useEffect, useState } from "react";
import UserDetail from "./UserDetail";

interface IProps {}
const user: FC<IProps> = (): ReactElement => {
  const { id } = useQuery();

  useEffect(() => {
    run();
    run2();
  }, [id]);

  const { data, run, loading } = useRequest(() => getUserDetail(id), {
    manual: true,
  });

  const {
    data: playList,
    run: run2,
    loading: loading2,
  } = useRequest(() => getUserPlayList(id));

  const [tabsValue, setTabsValue] = useState("create");

  return (
    <div
      style={{
        padding: 30,
      }}
    >
      {/* <Skeleton /> */}
      <Skeleton loading={loading} type="circle">
        <UserDetail profile={data?.profile || {}} />
      </Skeleton>
      <Skeleton loading={loading2} type="bar" count={3}>
        <BaseTabs
          value={tabsValue}
          list={[
            {
              value: "create",
              children: "创建的歌单",
              content: <PlayListWrap list={playList?.create || []} />,
            },
            {
              value: "collect",
              children: "收藏的歌单",
              content: <PlayListWrap list={playList?.collect || []} />,
            },
          ]}
          onChange={setTabsValue}
        />
      </Skeleton>
    </div>
  );
};

export default user;
