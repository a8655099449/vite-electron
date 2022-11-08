import { getStore, setStorage } from "@/common/utils";
import { makeAutoObservable } from "mobx";

class PlayerModel {
  lyric: LyricItem[] = [];
  currentSong = {} as SongItem;
  isPlay: boolean = false;
  currentTime = 0;

  constructor() {
    makeAutoObservable(this);
    this.init();
  }
  setIsPlay = (b: boolean) => (this.isPlay = b);
  setCurrentSong = (s: SongItem) => {
    this.currentSong = s;
    setStorage("currentSong", s);
  };
  setLyric = (l: LyricItem[]) => (this.lyric = l);

  _setCurrentTime = (time: number) => {
    this.currentTime = time;
  };
  init = () => {
    const lyric = getStore("lyric");
    if (lyric) {
      this.lyric = lyric;
    }
    const currentTime = getStore("currentTime");
    if (currentTime) {
      this.currentTime = currentTime;
    }
    const currentSong = getStore("currentSong");
    if (currentSong) {
      this.currentSong = currentSong;
    }
  };
}

export default PlayerModel;
