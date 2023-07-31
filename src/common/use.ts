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
  const ref = useRef({
    destroyed: false,
  });

  useEffect(() => {
    api.on(key, event);

    return () => {
      console.log("👴2023-02-26 14:00:04 use.ts line:33 删除事件");
      api.off(key, event);
    };
  }, []);
};

export const useLayoutToBottom = (event = (n: number) => {}) => {
  const offset = useRef(0);

  const ref = useRef({
    isLoading: false,
  });

  useEvent({
    key: "LAYOUT_TO_BOTTOM",
    event() {
      if (ref.current.isLoading) {
        return;
      }
      offset.current++;
      event(offset.current);
      ref.current.isLoading = true;
    },
  });
  const clearOffset = () => {
    ref.current.isLoading = false;
    offset.current = 0;
  };
  const resetLoading = () => {
    ref.current.isLoading = false;
  };

  return { clearOffset, resetLoading };
};
