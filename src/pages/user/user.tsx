import { getUserDetail, getUserPlayList } from "@/api/user";
import { useQuery } from "@/common/use";
import BaseTabs from "@/components/Container/BaseTabs";
import PlayListWrap from "@/components/Container/PlayListWrap";
import SongListItem from "@/components/Container/SongListItem";
import { useRequest } from "ahooks";
import React, { FC, ReactElement, useState } from "react";
import UserDetail from "./UserDetail";

interface IProps {}
const user: FC<IProps> = (): ReactElement => {
  const { id } = useQuery();
  const { data } = useRequest(() => getUserDetail(id));

  const { data: playList } = useRequest(() => getUserPlayList(id));

  const [tabsValue, setTabsValue] = useState("create");

  return (
    <div style={{
      padding:30
    }}>
      <UserDetail profile={data?.profile || {}} />
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
    </div>
  );
};

export default user;
