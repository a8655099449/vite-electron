import {
  getSongListAllMusic,
  getSongListDetails,
  getSongListMusic,
} from "@/api/songList";
import useToBottomRequest from "@/common/hooks/useToBottomRequest";
import { useQuery } from "@/common/use";
import Comments from "@/components/Comments";
import BaseTabs from "@/components/Container/BaseTabs";
import Loading from "@/components/Container/Loading";
import Skeleton from "@/components/Container/Skeleton";
import { useStore } from "@/store";
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
  } = useStore().profile;
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
  };

  const { list, loading: loading2 } = useToBottomRequest({
    request: getSongListMusic,
    params: { id },
    listKey: "songs",
  });

  const clickPlayAll = () => {
    api.emit("PLAY_LIST", list);
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
                <PlayListTable data={list} />
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
