import { useLocalStorage } from "@mantine/hooks";
import React, { useState } from "react";

export default function useGlobalPlay() {
  const [isPlay, setIsPlay] = useState(false); // 是否在播放
  const [currentSong, setCurrentSong] = useLocalStorage<SongItem>({
    key: "currentSong",
    defaultValue: {} as SongItem,
  }); // 当前播放的歌曲
  const [lyric, setLyric] = useLocalStorage<LyricItem[]>({
    key: "lyric",
    defaultValue: [],
  }); // 歌词
  const [playDetailVisible, setPlayDetailVisible] = useState(false);

  const togglePlayDetailVisible = () => {
    setPlayDetailVisible(!playDetailVisible);
  };
  const [currentTime, _setCurrentTime] = useLocalStorage({
    key: "currentTime",
    defaultValue: 0,
  });
  return {
    isPlay,
    setIsPlay,
    currentSong,
    setCurrentSong,
    setLyric,
    lyric,
    playDetailVisible,
    togglePlayDetailVisible,
    currentTime,
    _setCurrentTime
  };
}
