import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const parseQuery = <T = any>(s: string = ""): T => {
  const object = {} as any;
  if (!s) {
    return object;
  }

  const [, query] = s.split("?");
  const queryList = query.split("&");
  queryList.forEach((item) => {
    const [key, value] = item.split("=").map((s) => s.trim());
    object[key] = value;
  });
  return object;
};

export const useQuery = () => {
  const { search } = useLocation();
  return parseQuery(search);
};

type UseEventParams = {
  key: ListenerKeys;
  event(...e: any[]): void;
};
export const useEvent = ({ key, event }: UseEventParams) => {
  useEffect(() => {
    api.on(key, event);

    return () => api.off(key, event);
  }, []);
};

export const useLayoutToBottom = (event = (n: number) => {}) => {
  const offset = useRef(0);
  useEvent({
    key: "LAYOUT_TO_BOTTOM",
    event() {
      offset.current++;
      event(offset.current);
    },
  });
  const clearOffset = () => {
    offset.current = 0;
  };
  return { clearOffset };
};
