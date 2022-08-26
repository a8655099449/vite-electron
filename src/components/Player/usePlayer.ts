import { getSongDetail, getSongUrl } from "@/api/song";
import to from "@/common/to";
import { useLocalStorage } from "@mantine/hooks";
import { useEffect, useRef, useState } from "react";

const usePlayer = () => {
  // fun
  const audioInstance = useRef<HTMLAudioElement>(null);
  const [currentSong, setCurrentSong] = useLocalStorage<SongItem>({
    key: "currentSong",
    defaultValue: {} as SongItem,
  });
  const [currentSongUrl, setCurrentSongUrl] = useLocalStorage<string>({
    key: "currentSongUrl",
    defaultValue: "",
  });
  const store = useRef({
    isBind: false,
    playList: [] as SongItem[],
  });

  // const s = () => {}

  const [playList, setPlayList] = useLocalStorage<SongItem[]>({
    defaultValue: [],
    key: "CURRENT_PLAY_LIST",
  });

  const [playListVisible, setPlayListVisible] = useState(false);

  const [currentTime, setCurrentTime] = useLocalStorage({
    key: "currentTime",
    defaultValue: 0,
  });
  // 加载的进度条
  const [loadProgress, setLoadProgress] = useState(0);

  const [isPlay, setIsPlay] = useState(false);
  // console.log("👴playOne", playList);

  const playOne = async (e: any, id: string) => {
    getSongUrlAndPlay(id);
    const [err, res] = await to(getSongDetail(id));
    if (err || res.code !== 200) {
      return;
    }
    setCurrentSong(res.songs[0]);
    addPlayListItem(res.songs[0]);
  };
  const addPlayListItem = (item: SongItem) => {
    const { playList } = store.current;
    if (!playList.some((it) => it.id === item.id)) {
      playList.push(item);
      setPlayList([...playList]);
      console.log("👴addPlayListItem", playList);

      store.current.playList = playList;
    }
  };

  const getSongUrlAndPlay = async (id: string) => {
    const [err, res] = await to(getSongUrl(id));
    if (err || res.code !== 200) {
      return;
    }
    setCurrentSongUrl(res.data[0].url);
    if (!isPlay) {
      console.log("👴play");
      setTimeout(() => {
        play();
      }, 100);
    }
  };

  const handleLoadMusic = () => {
    const player = audioInstance.current as HTMLAudioElement;
    if (player.buffered.length > 0) {
      let loadLength = player?.buffered.end(player.buffered.length - 1);
      const loadProgress = loadLength / player.duration;
      setLoadProgress(loadProgress);
      console.log("👴loadLength", loadProgress);
    }
  };
  const handleMusicPlayProgressChange = () => {
    const player = audioInstance.current as HTMLAudioElement;

    if (!player.paused) {
      setCurrentTime(Math.floor(player.currentTime));
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
  };
  const play = () => {
    if (!isPlay && audioInstance.current) {
      audioInstance.current.currentTime = currentTime;
      audioInstance.current?.play();
      setIsPlay(true);
    }
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
    (audioInstance.current as HTMLAudioElement).currentTime =
      p * (currentSong.dt / 1000);
    play();
  };

  useEffect(() => {
    const { isBind } = store.current;
    if (!isBind) {
      bindAudioEvent();
      api.on("PLAY", playOne);
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
    playList
  };
};

export default usePlayer;
