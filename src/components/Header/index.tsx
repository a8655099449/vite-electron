import { useBaseContext } from "@/context/useBaseContent";
import { Button } from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon, { IconProps, IconType } from "../icon/Icon";
import Image from "../Image/Image";
import Avatar from "./Avatar";
import styles from "./index.module.less";
import Logo from "./Logo";
import Setting from "./Setting";
import { TitleBar } from "./TItleBar";
export default function Header() {
  return (
    <div className={`${styles["header"]}`}>
      <Logo />

      <DragBar />
      <HandleWindowBar />
    </div>
  );
}

const DragBar = () => {
  return <div className={`${styles["drag"]}`} />;
};

const HandleWindowBar = () => {
  const keys: IconType[] = ["minus", "full", "close"];
  const [full, setFull] = useState(false);
  const { toggleLoginVisible, userInfo } = useBaseContext();
  const navigate = useNavigate();

  const handleClick = (key: IconType) => {
    const keyMap: Partial<{
      [K in IconType]: string;
    }> = {
      minus: "window-min",
      full: "window-max",
      close: "window-close",
    };

    api.send(keyMap[key] as any);
  };

  useEffect(() => {
    api.on("maximize", () => {
      setFull(true);
    });
    api.on("unmaximize", () => {
      setFull(false);
    });
  }, []);

  return (
    <div className={`${styles["HandleWindowBar"]}`}>
      <Avatar />
      <Icon
        type="arrow-right"
        style={{
          transform: "rotate(180deg)",
          marginLeft: 10,
        }}
        size={18}
        button
        onClick={(e) => navigate(-1)}
      />
      <Icon
        type="reload"
        size={18}
        button
        onClick={(e) => {
          api.send("reload");
        }}
      />
      <Setting />
      {keys.map((item) => {
        let type = item;
        if (item === "full" && full) {
          type = "zoomOut";
        }

        return (
          <Icon
            type={type}
            key={item}
            onClick={() => handleClick(item)}
            button
            size={18}
          />
        );
      })}
    </div>
  );
};
