import { useLocalStorage } from "@mantine/hooks";
import React, { FC, ReactElement } from "react";
import Icon, { IconType } from "../icon/Icon";

interface IProps {}
const Control: FC<IProps> = (): ReactElement => {
  const playModes = ["randomPlay", "onceLoop", "listLoop"];

  const [playMode, setPlayMode] = useLocalStorage<number>({
    key: "playMode",
    defaultValue: 0,
  });

  const switchPlayMode = () => {};

  return (
    <div className="control">
      <div className="control-handle">
        <Icon
          type={playModes[playMode] as IconType}
          size={24}
          hoverLight
          onClick={(e) => {
            switchPlayMode();
          }}
        />
        <Icon type="next" size={24} className={`prov`} />
        <Icon type="play" size={24} />
        <Icon type="next" size={24} />
        <Icon type={'songWord'} size={22} />
      </div>
      <div className="progress-box">
        <div className="progress"></div>
      </div>
    </div>
  );
};

export const PlayerRight = () => {
  return <div>ComponentName</div>;
};

export default Control;
