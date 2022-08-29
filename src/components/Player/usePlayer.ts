import { getSongDetail, getSongUrl } from "@/api/song";
import to from "@/common/to";
import { getStore } from "@/common/utils";
import { useLocalStorage } from "@mantine/hooks";
import { useEffect, useRef, useState } from "react";

const usePlayer = () => {
  const audioInstance = useRef<HTMLAudioElement>(null);
  const [currentSong, setCurrentSong] = useLocalStorage<SongItem>({
    key: "currentSong",
    defaultValue: {} as SongItem,
  });

  const [playMode, setPlayMode] = useLocalStorage<number>({
    key: "playMode",
    defaultValue: 0,
  }); // 0 随机播放  1 列表循环 2 单曲循环

  const [currentSongUrl, setCurrentSongUrl] = useLocalStorage<string>({
    key: "currentSongUrl",
    defaultValue: "",
  });

  const [playList, _setPlayList] = useLocalStorage<SongItem[]>({
    defaultValue: [],
    key: "CURRENT_PLAY_LIST",
  });
  const setPlayList = (playList: SongItem[]) => {
    store.current.playList = playList;
    _setPlayList(playList);
  };

  const store = useRef({
    isBind: false,
    playList: (getStore("CURRENT_PLAY_LIST") || []) as SongItem[],
    currentSong: (getStore("currentSong") || {}) as SongItem,
  });

  const [playListVisible, setPlayListVisible] = useState(false);

  const [currentTime, _setCurrentTime] = useLocalStorage({
    key: "currentTime",
    defaultValue: 0,
  });
  const setCurrentTime = (currentTime: number) => {
    _setCurrentTime(currentTime);
    audioInstance.current!.currentTime = currentTime;
  };

  // 加载的进度条
  const [loadProgress, setLoadProgress] = useState(0);

  const [isPlay, setIsPlay] = useState(false);

  const clearList = () => {
    setCurrentTime(0);
    setCurrentSong({} as SongItem);
    setPlayList([]);
    pause();
  };

  const playOne = async (e: any, id: number) => {
    getSongUrlAndPlay(id);
    const [err, res] = await to(getSongDetail(id));
    if (err || res.code !== 200) {
      return;
    }
    store.current.currentSong = res.songs[0];
    setCurrentSong(res.songs[0]);
    addPlayListItem(res.songs[0]);
  };
  const handlePlayList = (e: any, list: SongItem[]) => {
    if (list && list.length > 0) {
      setPlayList(list);
      setTimeout(() => {
        playOne({}, list[0]?.id);
      }, 100);
    }
  };

  const addPlayListItem = (item: SongItem) => {
    const { playList } = store.current;
    if (!playList.some((it) => it.id === item.id)) {
      playList.push(item);
      setPlayList([...playList]);
    }
  };

  const getSongUrlAndPlay = async (id: number) => {
    audioInstance.current?.pause();

    const [err, res] = await to(getSongUrl(id));
    if (err || res.code !== 200) {
      return;
    }
    setCurrentSongUrl(res.data[0].url);
    setTimeout(() => {
      play();
      // backStart();
      setCurrentTime(0);
    }, 500);
  };

  const handleLoadMusic = () => {
    const player = audioInstance.current as HTMLAudioElement;
    if (player.buffered.length > 0) {
      let loadLength = player?.buffered.end(player.buffered.length - 1);
      const loadProgress = loadLength / player.duration;
      setLoadProgress(loadProgress);
    }
  };
  const handleMusicPlayProgressChange = () => {
    const player = audioInstance.current as HTMLAudioElement;

    if (!player.paused) {
      _setCurrentTime(Math.floor(player.currentTime));
    }
  };

  const bindAudioEvent = () => {
    // ! 加载元数据
    audioInstance.current?.addEventListener("loadedmetadata", () => {
      // if (audioInstance.current) {
      // }
    });
    // ! 监听下载进度
    audioInstance.current?.addEventListener("progress", handleLoadMusic);
    // ! 监听音乐播放进度变化
    audioInstance.current?.addEventListener(
      "timeupdate",
      handleMusicPlayProgressChange
    );
    audioInstance.current?.addEventListener("ended", (e) => {
      playNext(1);
    });
  };
  const play = () => {
    audioInstance.current?.play();
    setIsPlay(true);
  };
  const pause = () => {
    audioInstance.current?.pause();
    setIsPlay(false);
  };

  const playOrPause = () => {
    if (isPlay) {
      pause();
    } else {
      play();
    }
  };
  const setPlayProgress = (p: number) => {
    const currentTime = p * (currentSong.dt / 1000);
    setCurrentTime(currentTime);
  };

  const playNext = (count: number) => {
    const { playList, currentSong } = store.current;
    if (playList.length <= 1) {
      return;
    }

    const currentIndex = playList.findIndex(
      (item) => item.id === currentSong.id
    );
    if (playMode === 0) {
      playOne({}, getRandomId(currentIndex));
      return;
    }

    let playIndex;
    if (count > 0) {
      if (currentIndex === playList.length - 1) {
        playIndex = 0;
      } else {
        playIndex = currentIndex + 1;
      }
    } else {
      // 播放上一首
      if (currentIndex === 0) {
        playIndex = playList.length - 1;
      } else {
        playIndex = currentIndex - 1;
      }
    }

    playOne({}, playList[playIndex].id);
  };
  const getRandomId = (currentIndx: number) => {
    const { playList } = store.current;
    const filterList = playList.filter((item, index) => index !== currentIndx);

    return filterList[Math.ceil(Math.random() * filterList.length)].id;
  };

  useEffect(() => {
    const { isBind } = store.current;
    if (!isBind) {
      bindAudioEvent();
      api.on("PLAY", playOne);
      api.on("PLAY_LIST", handlePlayList);

      store.current.isBind = true;
    }
  }, []);

  return {
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
    clearList
  };
};

export default usePlayer;
