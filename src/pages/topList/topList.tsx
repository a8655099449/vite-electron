import { getTopList } from "@/api/songList";
import PageWrap from "@/components/Container/PageWrap";
import PlayListWrap from "@/components/Container/PlayListWrap";
import { useRequest } from "ahooks";
import { HomeTabs } from "../home/home";

const topList = () => {
  const { data } = useRequest(getTopList);

  return (
    <PageWrap title="首页 - 排行榜">
      <HomeTabs />
      <PlayListWrap list={data?.list || []} />
    </PageWrap>
  );
};

export default topList;
