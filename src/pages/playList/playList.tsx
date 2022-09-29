import { getSongListAllMusic, getSongListDetails } from "@/api/songList";
import Loading from "@/components/Container/Loading";
import Skeleton from "@/components/Container/Skeleton";
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


  return (
    <div className="p-20">
      <Skeleton loading={loading || !data?.playlist}>
        <SongListBanner
          data={data?.playlist as SongListItem}
          clickPlayAll={clickPlayAll}
        />
      </Skeleton>

      {/* {data?.playlist && (

      )} */}
      <Skeleton loading={loading2} type="bar" count={5}>
        <PlayListTable data={list?.songs || []} />
      </Skeleton>
      {/* {loading2 ? <Loading /> : } */}
    </div>
  );
};

export default songList;
