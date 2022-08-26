import { IMAGE_ALBUM } from "@/common/images";
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
  } = usePlayer();

  return (
    <div className="player">
      <audio src={currentSongUrl} ref={audioInstance} />
      {currentSong?.name ? (
        <div className="music-info">
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
      <PlayListDrawer visible={playListVisible} list={playList} />
      <Control
        song={currentSong}
        isPlay={isPlay}
        playOrPause={playOrPause}
        loadProgress={loadProgress}
        currentTime={currentTime}
        setPlayProgress={setPlayProgress}

        // {...{ playListVisible, setPlayListVisible }}
      />
      <PlayerRight
        clickListIcon={() => {
          setPlayListVisible(!playListVisible);
        }}
      />
      {/* <PlayerRight /> */}
    </div>
  );
};

export default Player;
