import React, { FC, ReactElement, useMemo } from "react";

interface IProps {
  count: number;
}
const PlayCount: FC<IProps> = ({ count }): ReactElement => {
  const countString = useMemo(() => {
    // 亿级
    if (count > 99999999) {
      return (count / 100000000).toFixed(1) + "亿";
    }
    // 5万级
    if (count > 50000) {
      return Math.floor(count / 10000) + "万";
    }

    return count;
  }, [count]);

  return <>{countString}</>;
};

export default PlayCount;
