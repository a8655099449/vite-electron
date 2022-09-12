import { getUserDetail } from "@/api/user";
import { useQuery } from "@/common/use";
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
    </div>
  );
};

export default user;
