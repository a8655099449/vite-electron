import { FC, ReactElement } from "react";
import SongListItem from "./SongListItem";
import "./index.less";
import Empty from "./Empty";

interface IPlayListWrapProps {
  list: SongListItem[];
  loading?: boolean;
}
const PlayListWrap: FC<IPlayListWrapProps> = ({
  list = [],
  loading = false,
}): ReactElement => {
  return (
    <div>
      <div className="play-list-wrap">
        {list.length === 0 && !loading && <Empty />}

        {list.map((item) => (
          <SongListItem item={item} key={item.id} />
        ))}
      </div>
      {loading && (
        <div
          style={{
            textAlign: "center",
          }}
        >
          正在加载...
        </div>
      )}
    </div>
  );
};

export default PlayListWrap;
