import { getTopList } from "@/api/songList";
import PageWrap from "@/components/Container/PageWrap";
import PlayListWrap from "@/components/Container/PlayListWrap";
import { useRequest } from "ahooks";
import { HomeTabs } from "../home/home";

const topList = () => {
  const { data } = useRequest(getTopList);
  console.log("👴2022-11-08 16:29:58 topList.tsx line:8", data);

  return (
    <PageWrap title="首页 - 排行榜">
      <HomeTabs />
      <PlayListWrap list={data?.list || []} />
    </PageWrap>
  );
};

export default topList;
