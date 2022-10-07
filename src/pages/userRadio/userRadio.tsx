import { getUserMF } from "@/api/songList";
import to from "@/common/to";
import { getStore, setStorage } from "@/common/utils";
import Skeleton from "@/components/Container/Skeleton";
import Icon from "@/components/icon/Icon";
import Image from "@/components/Image/Image";
import { Lyric } from "@/components/PlayDetail/SongDetailInfo";
import { useBaseContext } from "@/context/useBaseContent";
import { useRequest } from "ahooks";
import React, { FC, ReactElement, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.less";
interface IProps {}
const userRadio: FC<IProps> = (): ReactElement => {
  const { data, loading } = useRequest(async () => {
    let storeRes = getStore("userRadio");
    if (!storeRes) {
      const [err, res] = await to(getUserMF());
      if (res) {
        storeRes = res;
      }
    }
    if (storeRes) {
      setStorage("userRadio", storeRes);
    }

    return storeRes as {
      data: SongItem[];
    };
  });
  const { currentSong: song } = useBaseContext();
  const currentIndex = useRef(0);

  const songList = useMemo(() => {
    if (Array.isArray(data?.data) && data?.data.length) {
      return data?.data;
    }
    return [];
  }, [data]);

  useEffect(() => {
    if (!songList.length) {
      return;
    }
    const song = songList[currentIndex.current];

    if (song?.id) {
      api.emit("PLAY", song?.id);
    }
  }, [songList, currentIndex]);
  const handleNext = () => {
    if (currentIndex.current + 1 === songList.length) {
    }
  };

  return (
    <div className={`${styles["user-radio"]}`}>
      <Skeleton loading={loading}>
        {data && (
          <div>
            <div className={`${styles["info"]}`}>
              <div className={`${styles["pic"]}`}>
                <Image src={song?.al?.picUrl} />

                <div className={`${styles["iconBox"]}`}>
                  <Icon type="like" hoverLight title="喜欢" />
                  <Icon type="delete" hoverLight title="放入垃圾箱" />
                  <Icon
                    type="next"
                    hoverLight
                    title="下一首"
                    onClick={handleNext}
                  />
                </div>
              </div>
              <div className={`${styles["right"]}`}>
                <h2>{song.name}</h2>
                <div className={`${styles["album-info"]}`}>
                  <span>
                    专辑：
                    <Link className="link" to={`/artist?id=${song?.al?.id}`}>
                      {song.al?.name}
                    </Link>
                  </span>
                  <span>
                    歌手：
                    <Link className="link" to={`/artist?id=${song.ar?.[0].id}`}>
                      {song.ar?.[0]?.name}
                    </Link>
                  </span>
                </div>
                <Lyric />
              </div>
            </div>
          </div>
        )}
      </Skeleton>
    </div>
  );
};

export default userRadio;
