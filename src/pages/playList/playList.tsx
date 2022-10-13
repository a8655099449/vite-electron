import { getSongListAllMusic, getSongListDetails } from "@/api/songList";
import { useQuery } from "@/common/use";
import Comments from "@/components/Comments";
import BaseTabs from "@/components/Container/BaseTabs";
import Loading from "@/components/Container/Loading";
import Skeleton from "@/components/Container/Skeleton";
import { useBaseContext } from "@/context/useBaseContent";
import { useRequest } from "ahooks";
import React, { FC, ReactElement, useEffect, useState } from "react";
import PlayListTable from "./PlayListTable";
import SongListBanner from "./SongListBanner";
import Subscribers from "./Subscribers";

interface IProps {}
const songList: FC<IProps> = (): ReactElement => {
  const { id } = useQuery();

  const {
    likeListID, // 我喜欢的歌单列表id
    userLikeList, // 我喜欢的歌单列表id
  } = useBaseContext();
  const [tabValue, setTabValue] = useState(`list`);

  const {
    data,
    loading,
    run: _getSongListDetails,
  } = useRequest((id) => getSongListDetails(id as string), {
    manual: true,
  });

  useEffect(() => {
    run(id);
  }, [id]);

  const run = (id: any) => {
    _getSongListDetails(id);
    _getSongListAllMusic();
  };

  const {
    data: list,
    loading: loading2,
    run: _getSongListAllMusic,
  } = useRequest(async () => {
    if (id == likeListID && userLikeList.length > 0) {
      return {
        songs: userLikeList,
      };
    }

    const res = await getSongListAllMusic(id as string);
    return res;
  });
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
      <div
        style={{
          margin: "20px 0",
        }}
      >
        <BaseTabs
          onChange={setTabValue}
          list={[
            {
              value: "list",
              children: "歌曲列表",
              content: (
                <Skeleton loading={loading2} type="bar" count={5}>
                  <PlayListTable data={list?.songs || []} />
                </Skeleton>
              ),
            },
            {
              value: "comment",
              children: "评论",
              content: <Comments id={id} type="playlist" />,
            },
            {
              value: "collectors",
              children: <div>收藏者</div>,
              content: <Subscribers id={id} />,
            },
          ]}
          value={tabValue}
        />
      </div>
    </div>
  );
};

export default songList;
