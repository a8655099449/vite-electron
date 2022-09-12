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
