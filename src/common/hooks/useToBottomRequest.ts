import { useRequest } from "ahooks";
import { Options } from "ahooks/lib/useRequest/src/types";
import { useMemo, useRef } from "react";
import request from "../request";
import { useLayoutToBottom } from "../use";

type useToBottomRequestProps = {
  request: (...e: any) => Promise<any>;
  params?: any;
  listKey: string;
  haveMoreKey?: string;
  limit?: number;
};

const useToBottomRequest = <T = any>(options: useToBottomRequestProps) => {
  const {
    request,
    params = {},
    listKey = "",
    limit = 30,
    haveMoreKey = "more",
  } = options;

  const { run, data, ...rest } = useRequest(async (offset = 0) => {
    if (!ref.current.haveMore) {
      return;
    }

    const res = await request({
      ...params,
      offset: offset * limit,
      limit,
    }).finally(resetLoading);
    if (haveMoreKey && res[haveMoreKey] !== undefined) {
      ref.current.haveMore = res[haveMoreKey];
    }

    return res;
  });

  const { resetLoading } = useLayoutToBottom(run);

  const ref = useRef({
    list: [] as T[],
    haveMore: true,
  });

  const list = useMemo(() => {
    const { list } = ref.current;
    let newList = [];
    if (Array.isArray(data?.[listKey])) {
      newList = data?.[listKey];
    }

    const allList = [...list, ...newList];
    ref.current.list = allList;

    return allList;
  }, [data]);

  return { data, list, ...rest };
};

export default useToBottomRequest;
