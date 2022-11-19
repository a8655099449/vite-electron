import { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import ListBottomLoading from "../Cell/ListBottomLoading";
import Image from "../Image/Image";
import GridWrap from "./Grid";

type VideoListProps = {
  list: Video[];
  loading?: boolean;
};
const VideoList: FC<VideoListProps> = ({
  list = [],
  loading,
}): ReactElement => {
  return (
    <>
      <GridWrap>
        {list.map(({ coverUrl, vid, title, creator }) => {
          if (!vid) {
            return null;
          }

          return (
            <div key={vid} title={title}>
              <div>
                <Link to={`/videoDetail?id=${vid}`}>
                  <Image src={coverUrl} width={300} height={160} br={8} />
                </Link>
              </div>
              <div>{title}</div>
              {creator && (
                <p className="text-color-2 fs-12">
                  by{" "}
                  <Link to={`/user?id=${creator?.userId}`}>
                    {creator?.nickname}
                  </Link>{" "}
                </p>
              )}
            </div>
          );
        })}
      </GridWrap>
      {loading && <ListBottomLoading />}
    </>
  );
};

export default VideoList;
