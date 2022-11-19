import Image from "@/components/Image/Image";
import React, { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.less";
interface IProps {
  list?: Artist[];
  loading?: boolean;
}
const ArtistList: FC<IProps> = ({ list = [], loading }): ReactElement => {
  return (
    <div>
      <div className={`${styles["ArtistList"]}`}>
        {list.map((item) => {
          return (
            <Link
              key={item.id}
              className={`${styles["item"]}`}
              to={`/artistDetail?id=${item.id}`}
            >
              <div className={`${styles["pic"]}`}>
                <Image src={item.picUrl} width={150} />
              </div>
              <div>{item.name}</div>
            </Link>
          );
        })}
      </div>
      {loading && <div className="center">正在加载 ...</div>}
    </div>
  );
};

export default ArtistList;
