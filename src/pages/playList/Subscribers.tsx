import { getPlayListSubscribers } from "@/api/songList";
import { useQuery } from "@/common/use";
import Empty from "@/components/Container/Empty";
import Skeleton from "@/components/Container/Skeleton";
import Image from "@/components/Image/Image";
import { Pagination } from "@mantine/core";
import { useRequest } from "ahooks";
import React, { FC, ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.less";
interface IProps {
  id: any;
}
const Subscribers: FC<IProps> = (): ReactElement => {
  const { id } = useQuery();

  const [offset, setOffset] = useState(1);
  const { run, data, loading } = useRequest(
    () => getPlayListSubscribers({ id, offset: offset - 1 }),
    {
      manual: true,
    }
  );
  useEffect(() => {
    run();
  }, [id, offset]);
  return (
    <Skeleton loading={loading} count={3} type="bar">
      {data?.subscribers.length ? (
        <>
          <div className={`${styles["subscribers"]} `}>
            {data?.subscribers.map((item) => (
              <Link
                to={`/user?id=${item.userId}`}
                key={item.userId}
                className={`${styles["subscribers-item"]} hover`}
              >
                <div className={`${styles["avatar"]}`}>
                  <Image src={item.avatarUrl} round />
                </div>
                <div>{item.nickname}</div>
              </Link>
            ))}
          </div>
          <div className="center">
            <Pagination total={10} page={offset} onChange={setOffset} />
          </div>
        </>
      ) : (
        <Empty />
      )}
    </Skeleton>
  );
};

export default Subscribers;
