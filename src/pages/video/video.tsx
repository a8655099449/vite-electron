import { getAllVideoList, getVideoCategory, getVideoTags } from "@/api/video";
import useToBottomRequest from "@/common/hooks/useToBottomRequest";
import LoadMoreButton from "@/components/Cell/LoadMoreButton";
import MvList from "@/components/Container/MvList";
import PageWrap from "@/components/Container/PageWrap";
import TagsList from "@/components/Container/TagsList";
import VideoList from "@/components/Container/VideoList";
import { useStore } from "@/store";
import { useLocalStorage } from "@mantine/hooks";
import { useRequest } from "ahooks";
import { observer } from "mobx-react";
import React, { FC, ReactElement, useEffect, useRef, useState } from "react";

interface IProps {}
const video: FC<IProps> = (): ReactElement => {
  const { data: { data = [] } = {} } = useRequest(() => getVideoCategory());
  const [videoList, setVideoList] = useState<Video[]>([]);

  const [cate, setCate] = useLocalStorage({
    key: "cate",
    defaultValue: "全部",
  });

  const ref = useRef({
    videoGroup: cate,
    offset: 0,
  });

  const { loading, run } = useRequest(
    async () => {
      const res = await getAllVideoList(ref.current);

      if (res.datas) {
        const l = ref.current.offset == 0 ? [] : videoList;
        setVideoList([...l, ...res.datas.map(({ data }) => data)]);
      }

      return res;
    },
    {
      manual: true,
    }
  );
  useEffect(() => {
    ref.current.offset = 0;
    ref.current.videoGroup = cate;
    run();
  }, [cate]);
  console.log('👴2022-11-13 16:34:19 video.tsx line:49',videoList)

  return (
    <PageWrap title="视频">
      <TagsList
        list={[
          {
            value: "全部",
            label: "全部",
          },
          ...data.map((item) => ({
            value: item.id,
            label: item.name,
          })),
        ]}
        onChange={(e) => setCate(e)}
        value={cate}
      />
      <VideoList list={videoList} loading={loading} />
      {!loading && (
        <LoadMoreButton
          onClick={(e) => {
            ref.current.offset++;
            run();
          }}
        />
      )}
    </PageWrap>
  );
};

export default observer(video);
