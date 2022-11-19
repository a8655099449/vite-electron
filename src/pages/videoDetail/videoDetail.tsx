import { getVideoDetail, getVideoUrl } from "@/api/video";
import { useQuery } from "@/common/use";
import PlayCountIcon from "@/components/Cell/PlayCount";
import Comments from "@/components/Comments";
import BaseTabs from "@/components/Container/BaseTabs";
import PageWrap from "@/components/Container/PageWrap";
import Icon from "@/components/icon/Icon";
import Image from "@/components/Image/Image";
import { useRequest } from "ahooks";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PlayCount from "../playList/PalyCount";
import styles from "./index.module.less";
import RelatedVideo from "./RelatedVideo";

const videoDetail = () => {
  const { id } = useQuery();

  const { data } = useRequest(() => getVideoUrl(id));
  const { data: { data: details = {} as Video } = {} } = useRequest(() =>
    getVideoDetail(id)
  );
  const navigate = useNavigate();
  const [tag, setTag] = useState("评论");

  return (
    <PageWrap
      title={details.title || `视频详情`}
      className={`${styles["video"]}`}
    >
      <h2>
        <Icon
          type="arrow-right"
          style={{
            transform: "rotate(180deg)",
          }}
          button
          size={24}
          hoverLight
          onClick={(e) => navigate(-1)}
        />
        {details.title}
      </h2>
      <div className={`${styles["count-wrap"]} text-color-2`}>
        <div>
          <span>
            <Icon type="play" /> <PlayCount count={details.playTime} />
          </span>
          <span>
            <Icon type="comment" /> <PlayCount count={details.commentCount} />
          </span>
          <span>
            <Icon type="like2" /> <PlayCount count={details.praisedCount} />
          </span>
        </div>
        <div>
          <Link to={`/user?id=${details?.creator?.userId}`}>
            <span>
              <Image src={details?.creator?.avatarUrl} width={30} round />
              {details?.creator?.nickname}
            </span>
          </Link>
        </div>
      </div>
      <div>
        <video
          src={data?.urls[0].url}
          style={{
            width: `100%`,
          }}
          controls
          poster={details?.coverUrl}
        />
      </div>

      <div
        style={{
          margin: `10px 0`,
        }}
      >
        <BaseTabs
          list={[
            {
              children: "评论",
              value: "评论",
              content: <Comments id={id} type="video" />,
            },
            {
              children: "相关推荐",
              value: "相关推荐",
              content: <RelatedVideo id={id}  />,
            },
          ]}
          value={tag}
          onChange={setTag}
        />
      </div>
    </PageWrap>
  );
};

export default videoDetail;
