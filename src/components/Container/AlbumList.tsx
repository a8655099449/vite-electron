import { useLayoutToBottom } from "@/common/use";
import { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import Image from "../Image/Image";
import GridWrap from "./Grid";

type AlbumListProps = {
  list?: Album[];
  loading?: boolean;
};
const AlbumList: FC<AlbumListProps> = ({
  list = [],
  loading,
}): ReactElement => {
  return (
    <>
      <GridWrap row={5}>
        {list.map(({ picUrl, name, id }) => (
          <Link to={`/album?id=${id}`} className="al-item" key={id}>
            <div className="al-pic">
              <Image src={picUrl} width={150} br={4} />
            </div>
            <div>{name}</div>
          </Link>
        ))}
      </GridWrap>
      {
        loading && <div className="center">加载中...</div>
      }
    </>
  );
};

export default AlbumList;
