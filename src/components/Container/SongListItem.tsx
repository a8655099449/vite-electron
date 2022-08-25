import React, { FC, ReactElement } from "react";
import Image from "../Image/Image";

interface IProps {
  item: SongListItem;
}
const SongListItem: FC<IProps> = ({ item }): ReactElement => {
  return (
    <div className="song-list-item">
      <div>
        <Image src={item.picUrl} />
      </div>

      <div>{item.name}</div>
    </div>
  );
};

export default SongListItem;
