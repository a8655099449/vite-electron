import React, { FC, ReactElement, useMemo } from "react";

interface IProps {
  dt: number;
}
const SongTimeBar: FC<IProps> = ({ dt = 0 }): ReactElement => {
  const time = useMemo(() => {
    let second: string | number = Math.floor(dt / 1000);
    let min: string | number = Math.floor(second / 60);
    second = second - min * 60;
    if (min < 10) {
      min = "0" + min;
    }
    if (second < 10) {
      second = "0" + second;
    }

    return {
      second,
      min,
    };
  }, [dt]);

  return (
    <div>
      {time.min}:{time.second}
    </div>
  );
};

export default SongTimeBar;
