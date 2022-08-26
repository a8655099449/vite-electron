import { useLocalStorage } from "@mantine/hooks";
import React, { FC, ReactElement } from "react";
import Icon from "../icon/Icon";

interface IProps {
  clickListIcon(): void;
}
const PlayerRight: FC<IProps> = ({ clickListIcon }): ReactElement => {
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
          <div className="volume-bar"></div>
        </div>
        <Icon
          type={disabledVolume ? "disabledVolume" : "volume"}
          size={22}
          onClick={switchDisabledVolume}
        />
      </div>
      <Icon
        type="list"
        size={22}
        hoverLight
        title="播放列表"
        onClick={clickListIcon}
      />
    </div>
  );
};

export default PlayerRight;
