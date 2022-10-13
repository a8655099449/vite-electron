import { FC, ReactElement } from "react";
import SongListItem from "./SongListItem";
import "./index.less";
import Empty from "./Empty";

interface IPlayListWrapProps {
  list: SongListItem[];
}
const PlayListWrap: FC<IPlayListWrapProps> = ({ list = [] }): ReactElement => {
  return (
    <div className="play-list-wrap">
      {list.length === 0 && <Empty  />}

      {list.map((item) => (
        <SongListItem item={item} key={item.id} />
      ))}
    </div>
  );
};

export default PlayListWrap;
