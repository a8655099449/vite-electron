import { HoverCard } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import React, {
  FC,
  ReactElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import SongTimeBar from "../Container/SongTimeBar";
import Icon, { IconType } from "../icon/Icon";

interface IProps {
  song: SongItem;
  isPlay: boolean;
  playOrPause(): void;
  playNext(count: number): void;
  setPlayProgress(n: number): void;
  setPlayMode(n: any): void;
  loadProgress: number;
  currentTime: number;
  playMode: number;
}
const Control: FC<IProps> = ({
  song,
  playOrPause,
  playNext,
  isPlay,
  loadProgress,
  currentTime,
  setPlayProgress,
  setPlayMode,
  playMode,
  // disable = false,
}): ReactElement => {
  const boxElement = useRef<HTMLDivElement>(null);
  const data = useRef({
    clientWidth: 300,
    pageX: 323,
    offsetLeft: 0,
    left: 0,
  });

  const disable = useMemo(() => !song?.name, [song]);

  useEffect(() => {
    data.current.clientWidth = boxElement.current?.clientWidth || 300;
  }, []);
  const playModes = [
    {
      icon: "randomPlay",
      label: "随机播放",
    },
    {
      icon: "listLoop",
      label: "列表循环",
    },
    {
      icon: "onceLoop",
      label: "单曲循环",
    },
  ];

  const switchPlayMode = () => {
    setPlayMode((mode: number) => (mode + 1 === 3 ? 0 : mode + 1));
  };

  const [playProgress, _setPlayProgress] = useState<string | number>(0);

  useEffect(() => {
    _setPlayProgress((currentTime / (song.dt / 1000)) * 100 + `%`);
    return;
  }, [currentTime, song]);

  const bodyMove = (e: MouseEvent) => {
    const { pageX, offsetLeft, clientWidth } = data.current;
    let left = e.pageX - pageX + offsetLeft;

    if (left < 0) {
      left = 0;
    }
    if (left > clientWidth) {
      left = clientWidth;
    }
    data.current.left = left;
    _setPlayProgress(left);
  };

  const onMouseDown = (pageX: number) => {
    if (disable) {
      return
    }
    data.current.pageX = pageX;
    document.body.addEventListener("mousemove", bodyMove);
    const handleMouseup = () => {

      document.body.removeEventListener("mousemove", bodyMove);
      document.body.removeEventListener("mouseup", handleMouseup);
      const { left, clientWidth } = data.current;
      setPlayProgress(left / clientWidth);
    };

    document.body.addEventListener("mouseup", handleMouseup);
    // document.body.addEventListener("mouseleave", handleMouseup);
  };

  const onMouseUp = () => {
    document.body.removeEventListener("mousemove", bodyMove);
  };
  return (
    <div className="control">
      <div className="control-handle">
        <HoverCard>
          <Icon
            type={playModes[playMode].icon as IconType}
            size={20}
            hoverLight
            onClick={(e) => {

              switchPlayMode();
            }}
            title="单曲循环"
          />
        </HoverCard>
        <Icon
          type="next"
          size={24}
          className={`prov`}
          hoverLight
          onClick={() => playNext(-1)}
        />
        <Icon
          type={isPlay ? "pause" : "play"}
          size={24}
          onClick={playOrPause}
        />
        <Icon type="next" size={24} hoverLight onClick={() => playNext(1)} />
        <Icon type={"songWord"} size={18} hoverLight />
      </div>
      <div className="progress-box">
        <span>
          <SongTimeBar dt={currentTime * 1000} />
        </span>
        <div
          className="progress"
          ref={boxElement}
          onClick={(e) => {
            // const layerX = (e.target as any).offsetWidth;
            const layerX = e.pageX - (boxElement.current?.offsetLeft || 0);

            setPlayProgress(layerX / data.current.clientWidth);
          }}
          style={{
            width: 300,
          }}
        >
          {/* 下载进度条 */}
          <div
            className="loadProgress"
            style={{
              width: `${loadProgress * 100}%`,
            }}
          />
          {/* 播放进度条 */}
          <div
            className="playProgress"
            style={{
              width: playProgress,
            }}
          />
          {/* 圆环 */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="circle"
            onMouseDown={(e) => {
              onMouseDown(e.pageX);
              // @ts-ignore
              data.current.offsetLeft = e.target.offsetLeft;
            }}
            onMouseUp={onMouseUp}
            style={{
              left: playProgress,
            }}
          />
        </div>
        <span>
          <SongTimeBar dt={song.dt} />
        </span>
      </div>
    </div>
  );
};

export const PlayerRight = () => {
  // const [volume,setvolume] = useState(volume);
};

export default Control;
