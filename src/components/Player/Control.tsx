import { HoverCard } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import React, { FC, ReactElement } from "react";
import Icon, { IconType } from "../icon/Icon";

interface IProps {}
const Control: FC<IProps> = (): ReactElement => {
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

  const [playMode, setPlayMode] = useLocalStorage<number>({
    key: "playMode",
    defaultValue: 0,
  });

  const switchPlayMode = () => {
    setPlayMode((mode) => (mode + 1 === 3 ? 0 : mode + 1));
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
        <Icon type="play" size={24} />
        <Icon type="next" size={24} hoverLight />
        <Icon type={"songWord"} size={18} hoverLight />
      </div>
      <div className="progress-box">
        <span>00:00</span>
        <div className="progress"></div>
        <span>00:00</span>
      </div>
    </div>
  );
};

export const PlayerRight = () => {
  // const [volume,setvolume] = useState(volume);

  const [volume, setVolume] = useLocalStorage({
    key: "volume",
    defaultValue: 0,
  });
  const [disabledVolume, setDisabledVolume] = useLocalStorage({
    key: "disabledVolume",
    defaultValue: false,
  });

  const switchDisabledVolume = () => {
    setDisabledVolume((e) => !e);
  };

  return (
    <div className="right-bar">
      <div className="volumeWrap">
        <div className="volumeControl">
          <div className="volume-bar">

          </div>

        </div>
        <Icon
          type={disabledVolume ? "disabledVolume" : "volume"}
          size={22}
          onClick={switchDisabledVolume}
        />
      </div>
      <Icon type="list" size={22} hoverLight title="播放列表" />
    </div>
  );
};

export default Control;
