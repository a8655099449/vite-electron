import { getLyric, getSongDetail, getSongUrl } from "@/api/song";
import to from "@/common/to";
import { getStore } from "@/common/utils";
import { useBaseContext } from "@/context/useBaseContent";
import { useLocalStorage } from "@mantine/hooks";
import { useEffect, useRef, useState } from "react";

const usePlayer = () => {
  const {
    isPlay,
    setIsPlay,
    currentSong,
    setCurrentSong,
    setLyric,
    currentTime,
    _setCurrentTime,
  } = useBaseContext();
  const audioInstance = useRef<HTMLAudioElement>(null);

  const [playMode, setPlayMode] = useLocalStorage<number>({
    key: "playMode",
    defaultValue: 0,
  }); // 0 随机播放  1 列表循环 2 单曲循环

  const [currentSongUrl, setCurrentSongUrl] = useLocalStorage<string>({
    key: "currentSongUrl",
    defaultValue: "",
  });
  const [volume, setVolume] = useLocalStorage({
    key: "volume",
    defaultValue: 60,
  });

  const changeVolume = (v: number) => {
    audioInstance.current!.volume = v / 100;
    setVolume(v);
  };

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
    volume: Number(localStorage.getItem("volume")) || 60,
    isFirstPlay: true,
  });

  const [playListVisible, setPlayListVisible] = useState(false);

  const setCurrentTime = (currentTime: number) => {
    _setCurrentTime(currentTime);
    audioInstance.current!.currentTime = currentTime;
  };

  // 加载的进度条
  const [loadProgress, setLoadProgress] = useState(0);

  const clearList = () => {
    setCurrentTime(0);
    setCurrentSong({} as SongItem);
    setPlayList([]);
    pause();
  };

  const _getLyric = async (id: number) => {
    const [err, res] = await to(getLyric(id));

    if (err) {
      return;
    }
    if (res?.lrc?.lyric) {
      const lyric = res.lrc.lyric as string;

      const lyricList = lyric
        .split("\n")
        .filter((item) => item)
        .map((item) => {
          let [time, text] = item.split("]").map((item) => item.trim());

          time = time.replace("[", "");
          time = time.split(".")[0];
          const [min, second] = time.split(":");
          const _time = Number(min) * 60 + Number(second);
          return {
            time: _time,
            text,
          };
        });
      setLyric(lyricList);
    }
  };

  const playOne = async (
    e: any,
    id: number,
    { isClearCurrentTime = true } = {}
  ) => {
    store.current.isFirstPlay = false;
    getSongUrlAndPlay(id, isClearCurrentTime);
    _getLyric(id);
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

  const getSongUrlAndPlay = async (id: number, isClearCurrentTime: boolean) => {
    audioInstance.current?.pause();

    const [err, res] = await to(getSongUrl(id));
    if (err || res.code !== 200) {
      console.log("👴2022-09-28 08:00:43 usePlayer.ts line:139", res);
      if (res?.code === -462) {

      }


      return;
    }
    setCurrentSongUrl(res.data[0].url);
    setTimeout(() => {
      play();
      if (isClearCurrentTime) {
        setCurrentTime(0);
      } else {
        audioInstance.current!.currentTime = currentTime;
      }
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
    // audioInstance.current!.volume = volume;
    // ! 加载元数据
    // audioInstance.current?.addEventListener("loadedmetadata", () => {
    //   // if (audioInstance.current) {
    //   // }
    // });
    audioInstance.current!.volume = store.current.volume / 100;

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
    if (store.current.isFirstPlay) {
      getSongUrlAndPlay(currentSong.id, false);
      audioInstance.current!.currentTime = currentTime;
      store.current.isFirstPlay = false;
      return;
    }
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
    clearList,
    volume,
    changeVolume,
  };
};

export default usePlayer;
