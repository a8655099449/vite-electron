import { IMAGE_ALBUM } from "@/common/images";
import { useBaseContext } from "@/context/useBaseContent";
import React, { FC, ReactElement } from "react";
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
  const { togglePlayDetailVisible } = useBaseContext();

  return (
    <div className="player">
      <audio src={currentSongUrl} ref={audioInstance} />
      {currentSong?.name ? (
        <div className="music-info" onClick={togglePlayDetailVisible}>
          <div className="image">
            <img src={currentSong.al.picUrl} alt="" />
          </div>
          <div className="text-box">
            <div>{currentSong.name}</div>
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
          setPlayListVisible(!playListVisible);
        }}
        {...{ volume, changeVolume }}
      />
    </div>
  );
};

export default Player;
