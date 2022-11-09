import { fm_trash, getUserMF } from "@/api/songList";
import to from "@/common/to";
import { useEvent } from "@/common/use";
import { getStore, message, setStorage } from "@/common/utils";
import Comments from "@/components/Comments";
import LikeButton from "@/components/Container/LikeButton";
import Skeleton from "@/components/Container/Skeleton";
import Icon from "@/components/icon/Icon";
import Image from "@/components/Image/Image";
import { Lyric } from "@/components/PlayDetail/SongDetailInfo";
import { useStore } from "@/store";
import { useRequest } from "ahooks";
import { observer } from "mobx-react";
import React, { FC, ReactElement, useEffect, useMemo, useRef } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import styles from "./index.module.less";
interface IProps {}
const userRadio: FC<IProps> = (): ReactElement => {
  const store = useRef({
    currentIndex: 0,
    isFirst: true,
    songList: [] as SongItem[],
  });
  const { currentSong: song } = useStore().player;

  const { data, loading, run } = useRequest(async ({ clear = false } = {}) => {
    let storeRes = getStore("userRadio");

    if (!storeRes || clear) {
      const [err, res] = await to(getUserMF());
      if (res) {
        storeRes = res;
      }
    }

    if (storeRes) {
      setStorage("userRadio", storeRes);
    }
    setTimeout(() => {
      play();
    }, 100);
    store.current.isFirst = false;
    store.current.songList = storeRes?.data;
    return storeRes as {
      data: SongItem[];
    };
  });

  // 下一首
  const handleNext = () => {
    const { songList = [] } = store.current;
    console.log('👴2022-11-09 11:00:32 userRadio.tsx line:53',store.current.currentIndex , songList.length)
    if (store.current.currentIndex + 1 === songList.length) {
      store.current.currentIndex = 0;
      run({ clear: true });
    } else {
      store.current.currentIndex++;
      play();
    }
  };
  useEvent({ key: "FM_NEXT", event: handleNext });

  // 播放第一首
  const play = () => {
    const { songList = [] } = store.current;

    const song = songList[store.current.currentIndex];
    if (!song) {
      return;
    }
    api.emit("PLAY", song?.id);
  };

  return (
    <div className={`${styles["user-radio"]}`}>
      <Skeleton loading={loading && store.current.isFirst}>
        {data && (
          <div>
            <div className={`${styles["info"]}`}>
              <div className={`${styles["pic"]}`}>
                <Image src={song?.al?.picUrl} />

                <div className={`${styles["iconBox"]}`}>
                  <LikeButton />
                  <Icon
                    type="delete"
                    hoverLight
                    title="放入垃圾箱"
                    onClick={async () => {
                      const res = await fm_trash(song.id);
                      if (res.code == 200) {
                        handleNext();
                        message.success("删除成功");
                      }
                    }}
                  />
                  <Icon
                    type="next"
                    hoverLight
                    title="下一首"
                    onClick={handleNext}
                  />
                </div>
              </div>
              <div className={`${styles["right"]}`}>

                <Lyric />
              </div>
            </div>
            <Comments type={`music`} id={song.id} />
          </div>
        )}
      </Skeleton>
    </div>
  );
};

export default observer(userRadio);
