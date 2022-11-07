import { useStore } from "@/store";
import { observer } from "mobx-react";
import React, { FC, ReactElement, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Image from "../Image/Image";
import styles from "./index.module.less";
interface IProps {}
const SongDetailInfo: FC<IProps> = (): ReactElement => {
  const { isPlay, currentSong } = useStore().player;

  return (
    <div className={`${styles["SongDetailInfo"]}`}>
      <div className={`${styles["left"]}`}>
        <div
          className={`${styles["song-pic"]}`}
          style={{
            animationPlayState: isPlay ? "running" : "paused",
          }}
        >
          <Image src={currentSong.al.picUrl} />
        </div>
      </div>
      <div className={`${styles["center"]}`}>
        <Lyric />
      </div>
    </div>
  );
};

interface ILyricProps {}
export const Lyric: FC<ILyricProps> = observer(() => {
  const { lyric, currentTime, currentSong } = useStore().player;
  const ref = useRef({
    isFirst: true,
  });

  useEffect(() => {
    handleCurrentTimeChange(currentTime);
    ref.current.isFirst = false;
  }, [currentTime]);
  const handleCurrentTimeChange = (currentTime: number): boolean => {
    const current = document.querySelector(
      `[data-current_time="${currentTime}"]`
    );
    if (current) {
      // console.dir(current);
      // @ts-ignore
      const offsetTop = current!.offsetTop;
      wrap.current!.scrollTo({
        top: offsetTop - 150,
        behavior: "smooth",
      });
      setFinder(currentTime);

      return true;
    }

    if (ref.current.isFirst) {
      const find = lyric.find((fin, i) => {
        return currentTime > fin.time && currentTime < lyric[i + 1]?.time;
      });
      if (find) {
        return handleCurrentTimeChange(find!.time);
      }
    }

    return false;
  };

  const wrap = useRef<HTMLDivElement>(null);
  const [finder, setFinder] = useState(0);
  return (
    <div className={`${styles["lyric"]}`}>
      <div className={`${styles["head"]}`}>
        <h2> {currentSong.name}</h2>
        <div>
          <span>
            专辑：
            <Link className="link" to={`/artist?id=${currentSong?.al?.id}`}>
              {currentSong.al?.name}
            </Link>
          </span>
          <span>
            歌手：
            <Link className="link" to={`/artist?id=${currentSong.ar?.[0].id}`}>
              {currentSong.ar?.[0]?.name}
            </Link>
          </span>
        </div>
      </div>
      <div className={`${styles["lyric-wrap"]}`} ref={wrap}>
        {lyric.map((item, index) => {
          return (
            <div
              key={index}
              className={`${styles["lyric-item"]} ${
                finder == item.time ? styles["active"] : ""
              }`}
              data-current_time={item.time}
            >
              {item.text}
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default observer(SongDetailInfo);
