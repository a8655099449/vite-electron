import React from "react";
import Icon from "../icon/Icon";

export default function Empty({ desc = "空空如也" }) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: 20,
        color:"var(--text-color-2)"
      }}
    >
      <div
        style={{
          // marginBottom: 20,
        }}
      >
        <Icon type="empty" size={50} />
      </div>
      <div>{desc}</div>
    </div>
  );
}
