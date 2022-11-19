import { useLocalStorage } from "@mantine/hooks";
import React, { FC, ReactElement, useRef } from "react";
import Icon from "../icon/Icon";

interface IProps {
  clickListIcon(): void;
  volume: number;
  changeVolume(v: number): void;
}
const PlayerRight: FC<IProps> = ({
  clickListIcon,
  volume,
  changeVolume,
}): ReactElement => {
  const [disabledVolume, setDisabledVolume] = useLocalStorage({
    key: "disabledVolume",
    defaultValue: false,
  });
  const volumeControl = useRef<HTMLDivElement>(null);

  const switchDisabledVolume = () => {
    if (!disabledVolume) {
      changeVolume(0);
    } else {
      changeVolume(60);
    }

    setDisabledVolume(!disabledVolume);
  };

  return (
    <div className="right-bar">
      <Icon
        type="list"
        size={22}
        hoverLight
        title="播放列表"
        onClick={clickListIcon}
      />
      <div className="volumeWrap">
        <div className="volumeControl">
          <div
            className="volume-bar"
            onClick={(e) => {
              const rect = volumeControl.current?.getClientRects()[0];
              if (rect) {
                const { top } = rect;
                const { clientY } = e;
                let v = 100 - (clientY - top);
      
                if (v < 0) {
                  setDisabledVolume(true);
                  v = 0;
                } else {
                  setDisabledVolume(false);
                }
                if (v > 100) {
                  v = 100;
                }
                changeVolume(v);
              }
            }}
            ref={volumeControl}
          >
            <div
              className="volume-circle"
              style={{
                bottom: volume,
              }}
            ></div>
            <div
              className="volume-progress"
              style={{
                height: volume,
              }}
            ></div>
          </div>
        </div>
        <Icon
          type={disabledVolume ? "disabledVolume" : "volume"}
          size={22}
          onClick={switchDisabledVolume}
        />
      </div>
    </div>
  );
};

export default PlayerRight;
