import { getSongListAllMusic, getSongListDetails } from "@/api/songList";
import Loading from "@/components/Container/Loading";
import { Skeleton } from "@mantine/core";
import { useRequest } from "ahooks";
import React, { FC, ReactElement, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import PlayListTable from "./PlayListTable";
import SongListBanner from "./SongListBanner";

interface IProps {}
const songList: FC<IProps> = (): ReactElement => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const {
    data,
    loading,
    run: _getSongListDetails,
  } = useRequest((id) => getSongListDetails(id as string), {
    manual: true,
  });

  useEffect(() => {
    run(id);
  }, [searchParams]);

  const run = (id: any) => {
    _getSongListDetails(id);
    _getSongListAllMusic();
  };

  const {
    data: list,
    loading: loading2,
    run: _getSongListAllMusic,
  } = useRequest(() => getSongListAllMusic(id as string));
  const clickPlayAll = () => {
    api.emit("PLAY_LIST", list?.songs);
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="p-20">
      {data?.playlist && (
        <SongListBanner
          data={data?.playlist as SongListItem}
          clickPlayAll={clickPlayAll}
        />
      )}

      {loading2 ? <Loading /> : <PlayListTable data={list?.songs || []} />}
    </div>
  );
};

export default songList;
