import { getSongListAllMusic, getSongListDetails } from "@/api/songList";
import Loading from "@/components/Container/Loading";
import { Skeleton } from "@mantine/core";
import { useRequest } from "ahooks";
import React, { FC, ReactElement } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import PlayListTable from "./PlayListTable";
import SongListBanner from "./SongListBanner";

interface IProps {}
const songList: FC<IProps> = (): ReactElement => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const { data, loading } = useRequest(() => getSongListDetails(id as string));
  const { data: list, loading: loading2 } = useRequest(() =>
    getSongListAllMusic(id as string)
  );
  const clickPlayAll = () => {
    api.emit("PLAY_LIST", list?.songs);
  };

  if (loading) {
    return <Loading />;
  }
  // console.log("👴2022-08-25 17:41:45 songList.tsx line:13", data);
  return (
    <div className="p-20">
      <SongListBanner
        data={data?.playlist as SongListItem}
        clickPlayAll={clickPlayAll}
      />

      {loading2 && <Loading />}
      <PlayListTable data={list?.songs || []} />
    </div>
  );
};

export default songList;
