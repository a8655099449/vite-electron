import { useBaseContext } from "@/context/useBaseContent";
import React, { FC, ReactElement, useEffect, useRef, useState } from "react";
import Image from "../Image/Image";
import styles from "./index.module.less";
interface IProps {}
const SongDetailInfo: FC<IProps> = (): ReactElement => {
  const { isPlay, currentSong, lyric, currentTime } = useBaseContext();
  const wrap = useRef<HTMLDivElement>(null);
  const [finder, setFinder] = useState(0);
  const ref = useRef({
    isFirst: true,
  });
  const handleCurrentTimeChange = (currentTime: number): boolean => {
    const current = document.querySelector(
      `[data-currentTime="${currentTime}"]`
    );
    if (current) {
      // console.dir(current);
      // @ts-ignore
      const offsetTop = current!.offsetTop;
      wrap.current!.scrollTo({
        top: offsetTop - 150,
        behavior:'smooth'
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
  useEffect(() => {
    handleCurrentTimeChange(currentTime);
    ref.current.isFirst = false;
  }, [currentTime]);

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
        <div className={`${styles["lyric-wrap"]}`} ref={wrap}>
          {lyric.map((item) => {
            return (
              <div
                key={item.time}
                className={`${styles["lyric-item"]} ${
                  finder == item.time ? styles["active"] : ""
                }`}
                data-currentTime={item.time}
              >
                {item.text}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SongDetailInfo;
