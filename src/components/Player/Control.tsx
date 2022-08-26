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
  setPlayProgress(n: number): void;
  loadProgress: number;
  currentTime: number;
}
const Control: FC<IProps> = ({
  song,
  playOrPause,
  isPlay,
  loadProgress,
  currentTime,
  setPlayProgress,
}): ReactElement => {
  const boxElement = useRef<HTMLDivElement>(null);
  const data = useRef({
    clientWidth: 283,
    pageX: 323,
    offsetLeft: 0,
    left: 0,
  });

  const playModes = [
    {
      icon: "randomPlay",
      label: "随机播放",
    },
    {
      icon: "onceLoop",
      label: "单曲循环",
    },
    {
      icon: "listLoop",
      label: "列表循环",
    },
  ];
  useEffect(() => {
    data.current.clientWidth = boxElement.current?.clientWidth || 283;
  }, []);

  const [playMode, setPlayMode] = useLocalStorage<number>({
    key: "playMode",
    defaultValue: 0,
  });

  const switchPlayMode = () => {
    setPlayMode((mode) => (mode + 1 === 3 ? 0 : mode + 1));
  };

  const [playProgress, _setPlayProgress] = useState<string | number>(0);

  useEffect(() => {
    _setPlayProgress((currentTime / (song.dt / 1000)) * 100 + `%`);
    return;
  }, [currentTime, song]);

  const bodyMove = (e: MouseEvent) => {
    // console.log("👴", e.pageX , data.current);
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
    data.current.pageX = pageX;
    document.body.addEventListener("mousemove", bodyMove);
    const handleMouseup = () => {
      const { left, clientWidth } = data.current;
      setPlayProgress(left / clientWidth);
      document.body.removeEventListener("mousemove", bodyMove);
      document.body.removeEventListener("mouseup", handleMouseup);
    };

    document.body.addEventListener("mouseup", handleMouseup);
    // document.body.addEventListener("mouseleave", handleMouseup);
  };

  const onMouseUp = () => {
    // console.log("👴拉起");
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
        <Icon type="next" size={24} className={`prov`} hoverLight />
        <Icon
          type={isPlay ? "pause" : "play"}
          size={24}
          onClick={playOrPause}
        />
        <Icon type="next" size={24} hoverLight />
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
              console.log("👴2022-08-26 15:01:54 Control.tsx line:135", e);
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
