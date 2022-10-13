/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-09-28 07:45:09
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-09-29 21:48:36
 * @FilePath: \vite-electron\src\components\PlayDetail\SongDetailInfo.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useBaseContext } from "@/context/useBaseContent";
import React, { FC, ReactElement, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Image from "../Image/Image";
import styles from "./index.module.less";
interface IProps {}
const SongDetailInfo: FC<IProps> = (): ReactElement => {
  const { isPlay, currentSong } = useBaseContext();

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
export const Lyric: FC<ILyricProps> = (): ReactElement => {
  const { lyric, currentTime, currentSong } = useBaseContext();
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
};

export default SongDetailInfo;
