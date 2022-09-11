import { useBaseContext } from "@/context/useBaseContent";
import { Button } from "@mantine/core";
import React, { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.less";
import SongDetailInfo from "./SongDetailInfo";
interface IProps {}
const PlayDetail: FC<IProps> = (): ReactElement => {
  const { currentSong } = useBaseContext();

  return (
    <div className={`${styles["play-detail"]}`}>
      <Head currentSong={currentSong} />
      <SongDetailInfo />
    </div>
  );
};

const Head = ({ currentSong }: { currentSong: SongItem }) => {
  return (
    <div className={`${styles["title-bar"]}`}>
      <h2>{currentSong.name}</h2>
      <div>
        <Link to={""}>{currentSong.ar[0].name}</Link>
        <span>-</span>
        <Link to={""}>{currentSong.al.name}</Link>
      </div>
    </div>
  );
};

export default PlayDetail;
