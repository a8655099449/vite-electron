import { getUserDetail } from "@/api/user";
import { useQuery } from "@/common/use";
import BaseTabs from "@/components/Container/BaseTabs";
import { useRequest } from "ahooks";
import React, { FC, ReactElement } from "react";
import UserDetail from "./UserDetail";

interface IProps {}
const user: FC<IProps> = (): ReactElement => {
  const { id } = useQuery();
  const { data } = useRequest(() => getUserDetail(id));
  return (
    <div>
      <UserDetail profile={data?.profile || {}} />
      <BaseTabs
        list={[
          {
            value: "create",
            children: "创建的歌单",
          },
          {
            value: "collect",
            children: "收藏的歌单",
          },

        ]}
      />
    </div>
  );
};

export default user;
