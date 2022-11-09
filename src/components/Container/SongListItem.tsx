import React, { FC, ReactElement } from "react";
import Image from "../Image/Image";
import { useNavigate } from "react-router-dom";

interface IProps {
  item: SongListItem;
}
const SongListItem: FC<IProps> = ({ item }): ReactElement => {
  // const {} = useHistory()
  const navigate = useNavigate();

  return (
    <div
      className="song-list-item"
      onClick={(e) => {
        navigate(`/playList?id=${item.id}`);
      }}
      style={{
        maxWidth: 300,
      }}
    >
      <div>
        <Image src={item.picUrl || item.coverImgUrl} width={150} />
      </div>

      <div>{item.name}</div>
    </div>
  );
};

export default SongListItem;
