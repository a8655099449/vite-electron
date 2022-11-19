import React, { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import PlayCount from "../Cell/PlayCount";
import Image from "../Image/Image";
import GridWrap from "./Grid";
import "./index.less";
interface IProps {
  mvs?: MvItem[] ;
}
const MvList: FC<IProps> = ({ mvs = [] }): ReactElement => {
  return (
    <div className="mv-list">
      <GridWrap row={4}>
        {mvs.map((item) => {
          return (
            <Link to={`/mv`} className={`mv-item`} key={item.id}>
              <div className="mv-play-count">
                <PlayCount count={item.playCount} />
              </div>

              <div>
                <Image src={item.imgurl} width={260} height={150} />
              </div>
              <div>{item.name}</div>
            </Link>
          );
        })}
      </GridWrap>
    </div>
  );
};

export default MvList;
