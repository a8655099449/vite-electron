import { IMAGE_ALBUM } from "@/common/images";
import { useStore } from "@/store";
import { observer } from "mobx-react";
import  { FC, ReactElement } from "react";
import LikeButton from "../Container/LikeButton";
import Control from "./Control";
import NotPlayInfo from "./NotPlayInfo";
import "./player.less";
import PlayerRight from "./PlayerRight";
import PlayListDrawer from "./PlayListDrawer";
import usePlayer from "./usePlayer";
interface IProps {}

const Player: FC<IProps> = (): ReactElement => {
  const {
    currentSong,
    currentSongUrl,
    audioInstance,
    isPlay,
    playOrPause,
    loadProgress,
    currentTime,
    setPlayProgress,
    playListVisible,
    setPlayListVisible,
    playList,
    playOne,
    playNext,
    playMode,
    setPlayMode,
    clearList,
    volume,
    changeVolume,
  } = usePlayer();
  const { togglePlayDetailVisible } = useStore().setting;

  return (
    <div className="player">
      <audio src={currentSongUrl} ref={audioInstance} />
      {currentSong?.name ? (
        <div className="music-info">
          <div className="image" onClick={togglePlayDetailVisible}>
            <img src={currentSong.al.picUrl} alt="" />
          </div>
          <div className="text-box">
            <div className="song-name">
              {currentSong.name} <LikeButton />
            </div>
            <div>{currentSong.ar[0].name}</div>
          </div>
        </div>
      ) : (
        <NotPlayInfo />
      )}
      <PlayListDrawer
        visible={playListVisible}
        list={playList}
        isPlay={isPlay}
        currentSong={currentSong}
        clearList={clearList}
      />
      <Control
        song={currentSong}
        isPlay={isPlay}
        playOrPause={playOrPause}
        loadProgress={loadProgress}
        currentTime={currentTime}
        setPlayProgress={setPlayProgress}
        playNext={playNext}
        {...{ playMode, setPlayMode }}
      />
      <PlayerRight
        clickListIcon={() => {
          const handleBodyClick = (e: MouseEvent) => {
            const { path = [] } = e as any;
            let close = true;
            path.forEach((element: any) => {
              const { className = "" } = element || {};
              if (className.indexOf("play-list-drawer") !== -1) {
                close = false;
              }
            });

            if (close) {
              document.body.removeEventListener("click", handleBodyClick);
              setPlayListVisible(false);
            }
          };

          if (!playListVisible) {
            setTimeout(() => {
              document.body.removeEventListener("click", handleBodyClick);

              document.body.addEventListener("click", handleBodyClick);
            }, 100);
          }

          setPlayListVisible(!playListVisible);
        }}
        {...{ volume, changeVolume }}
      />
    </div>
  );
};

export default observer(Player);
