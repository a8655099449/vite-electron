import { useCallback, useEffect, useState } from "react";
import Icon from "../icon/Icon";

export type TitleBarProps = {
  title: string;
};

export const TitleBar = (props: TitleBarProps) => {
  const [restartClassName, setRestartClassName] = useState("restart-button");
  const [minimizeClassName, setMinimizeClassName] = useState("minimize-button");
  const [maximizeClassName, setMaximizeClassName] = useState("maximize-button");
  const [maximizedClassName, setMaximizedClassName] = useState("");
  const [closeClassName, setCloseClassName] = useState("close-button");
  const [titleClassName, setTitleClassName] = useState("title");
  const [restartEnterClassName, setRestartEnterClassName] = useState("");
  const [minimizeEnterClassName, setMinimizeEnterClassName] = useState("");
  const [maximizeEnterClassName, setMaximizeEnterClassName] = useState("");
  const [closeEnterClassName, setCloseEnterClassName] = useState("");
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    window.onfocus = () => {
      setRestartClassName("restart-button");
      setMinimizeClassName("minimize-button");
      setMaximizeClassName(
        isMaximized ? "maximized-button" : "maximize-button"
      );
      setCloseClassName("close-button");
      setTitleClassName("title");
    };

    window.onblur = () => {
      setRestartClassName("restart-button-inactive");
      setMinimizeClassName("minimize-button-inactive");
      setMaximizeClassName(
        isMaximized ? "maximized-button-inactive" : "maximize-button-inactive"
      );
      setCloseClassName("close-button-inactive");
      setTitleClassName("title-inactive");
    };
  }, []);

  const restartEnterHandler = useCallback((e: any) => {
    if (
      !document
        .querySelector("#restart")!
        .classList.contains("restart-button-inactive")
    ) {
      setRestartEnterClassName("restart-button-hover");
    }
  }, []);

  const restartLeaveHandler = useCallback((e: any) => {
    setRestartEnterClassName("");
  }, []);

  const minimizeEnterHandler = useCallback((e: any) => {
    if (
      !document
        .querySelector("#minimize")!
        .classList.contains("minimize-button-inactive")
    ) {
      setMinimizeEnterClassName("minimize-button-hover");
    }
  }, []);

  const minimizeLeaveHandler = useCallback((e: any) => {
    setMinimizeEnterClassName("");
  }, []);

  const maximizeEnterHandler = useCallback(
    (e: any) => {
      if (
        !document
          .querySelector("#maximize")!
          .classList.contains("maximize-button-inactive")
      ) {
        setMaximizeEnterClassName(
          isMaximized ? "maximized-button-hover" : "maximize-button-hover"
        );
      }
    },
    [isMaximized]
  );

  const maximizeLeaveHandler = useCallback((e: any) => {
    setMaximizeEnterClassName("");
  }, []);

  const closeEnterHandler = useCallback((e: any) => {
    if (
      !document
        .querySelector("#close")!
        .classList.contains("close-button-inactive")
    ) {
      setCloseEnterClassName("close-button-hover");
    }
  }, []);

  const closeLeaveHandler = useCallback((e: any) => {
    setCloseEnterClassName("");
  }, []);

  const restartButtonHandler = useCallback((e: any) => {
    window.focus();
    // socket.emit("reload");
  }, []);

  const minimizeButtonHandler = useCallback((e: any) => {
    window.focus();
    setMinimizeEnterClassName("");

    // need to wait a tiny bit for the hover state to clear otherwise the
    // preview of the app on the Windows taskbar will still have the minimize
    // button's hover state incorrect.
    let minimizeInterval = setInterval(() => {
      clearInterval(minimizeInterval);
      // socket.emit("minimize");
    }, 25);
  }, []);

  const maximizeButtonHandler = useCallback((e: any) => {
    // socket.emit("isMaximized");
  }, []);

  const closeButtonHandler = useCallback((e: any) => {
    window.focus();
    // socket.emit("close");
  }, []);
  
  return (
    <div>
      <div
        id="restart"
        className={`${restartClassName} ${restartEnterClassName} fas fa-recycle`}
        onClick={restartButtonHandler}
        onMouseEnter={restartEnterHandler}
        onMouseLeave={restartLeaveHandler}
      />
      <div id="title" className={`${titleClassName} titlebar`}>
        {props.title}
      </div>
   {/*    <div
        id="minimize"
        className={`${minimizeClassName} ${minimizeEnterClassName}`}
        onClick={minimizeButtonHandler}
        onMouseEnter={minimizeEnterHandler}
        onMouseLeave={minimizeLeaveHandler}
      >
        <Icon type="minus" />
      </div>
      <div
        id="maximize"
        className={`${maximizeClassName} ${maximizeEnterClassName} ${maximizedClassName}`}
        onClick={maximizeButtonHandler}
        onMouseEnter={maximizeEnterHandler}
        onMouseLeave={maximizeLeaveHandler}
      >
        <Icon type="full" />
      </div> */}
      <div
        id="close"
        className={`${closeClassName} ${closeEnterClassName}`}
        onClick={closeButtonHandler}
        onMouseEnter={closeEnterHandler}
        onMouseLeave={closeLeaveHandler}
      >
        <Icon type="close" />
      </div>
    </div>
  );
};
