import PlayCount from "@/pages/playList/PalyCount";
import React, { useMemo } from "react";
import Icon from "../icon/Icon";
const PlayCountIcon = ({ count = 0 }) => {
  return (
    <span
      style={{
        color: "#eee",
        display: "flex",
        alignItems: "center",
        fontSize: 12,
      }}
    >
      <Icon type="play" size={12} />
      <span style={{marginLeft:5}}>
        <PlayCount count={count} />
      </span>
    </span>
  );
};

export default PlayCountIcon;
