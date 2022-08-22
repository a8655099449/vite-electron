import { useEffect, useState } from "react";
import Icon, { IconProps, IconType } from "../icon/Icon";
import styles from "./index.module.less";
import { TitleBar } from "./TItleBar";
export default function Header() {
  return (
    <div className={`${styles["header"]}`}>
      {/* <TitleBar title="title" /> */}
      <div></div>
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
    api.on('unmaximize', () => {
      setFull(false);
    });
  }, []);

  return (
    <div className={`${styles["HandleWindowBar"]}`}>
      {keys.map((item) => {
        let type = item;
        if (item === "full" && full) {
          type = "zoomOut";
        }

        return (
          <Icon type={type} key={item} onClick={() => handleClick(item)} />
        );
      })}
    </div>
  );
};
