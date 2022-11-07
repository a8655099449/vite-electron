import { useStore } from "@/store";
import { Button } from "@mantine/core";
import { observer } from "mobx-react";
import React, { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import Comments from "../Comments";
import styles from "./index.module.less";
import SongDetailInfo from "./SongDetailInfo";
interface IProps {}
const PlayDetail: FC<IProps> = (): ReactElement => {
  const { currentSong } = useStore().player;

  return (
    <div className={`${styles["play-detail"]}`}>
      <SongDetailInfo />
      <div className={`${styles["comment"]}`}>
        <Comments id={currentSong.id} type="music" />
      </div>
    </div>
  );
};

export default observer(PlayDetail);
