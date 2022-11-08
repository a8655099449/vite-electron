import Image from "@/components/Image/Image";
import React, { FC, ReactElement } from "react";
import styles from './index.module.less';
interface IProps {
  list: Artist[];
}
const ArtistList: FC<IProps> = ({ list }): ReactElement => {
  return (
    <div className={`${styles['ArtistList']}`}>
      {list.map((item) => {
        return (
          <div>
            <div className={`${styles['pic']}`}>
            <Image src={item.picUrl} />
            </div>
            <div>{item.name}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ArtistList;
