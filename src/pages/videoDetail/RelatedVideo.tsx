import { getVideoRelated } from "@/api/video";
import VideoList from "@/components/Container/VideoList";
import { useRequest } from "ahooks";
import { FC, ReactElement } from "react";

type RelatedVideoProps = {
  id: ID;
};
const RelatedVideo: FC<RelatedVideoProps> = ({ id }): ReactElement => {
  const { data } = useRequest(() => getVideoRelated(id));
  console.log("👴2022-11-13 13:34:48 RelatedVideo.tsx line:12", data);
  return (
    <div>
      <VideoList list={data?.data || []} />
    </div>
  );
};

export default RelatedVideo;
