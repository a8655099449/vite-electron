import axios from "axios";

import type { AxiosRequestConfig } from "axios";
import { COOKIE_KEY } from "./consts";
import { eqObject, getStore, message, setStorage } from "./utils";
const CACHE_KEY = `REQUEST_CACHE`;
// const baseURL = `http://47.107.81.99:3000`;
const baseURL = `/apis`;
function request<T = any>(
  config: AxiosRequestConfig & {
    cacheTime?: number; // 缓存时间 , 默认都有一分钟的缓存，如果不要缓存则写0
  }
): Promise<
  {
    code: number;
    data: T;
    [K: string]: any;
  } & T
> {
  const instance = axios.create({
    // 公用的网络请求路径
    baseURL: baseURL,
    // 网络请求时间超时会自动断开
    timeout: 10000,
    method: "get",
    withCredentials: true,
  });

  const { cacheTime = 60 * 1000, url, data = {}, params = {} } = config;
  const query = { ...data, ...params };

  const saveCache = (data: any) => {
    if (!cacheTime) {
      return;
    }
    const cacheData: any = getStore(CACHE_KEY) || {};
    const now = Date.now();
    cacheData[url as string] = {
      data,
      time: cacheTime,
      saveTime: now,
      query,
    };
    setStorage(CACHE_KEY, cacheData);
  };

  const getCache = () => {
    if (!cacheTime) {
      return false;
    }
    const cacheData: any = getStore(CACHE_KEY) || {};
    const current = cacheData[url as string];

    if (!current) {
      return false;
    }
    const { saveTime, time, data, query: oldQuery = {} } = current;
    const now = Date.now();

    if (saveTime + time < now) {
      return false;
    }

    if (!eqObject(query, oldQuery)) {
      return false;
    }

    return data;
  };
  if (cacheTime) {
    const cache = getCache();
    if (cache) {
      return Promise.resolve(cache);
    }
  }

  //  请求拦截
  instance.interceptors.request.use(
    //  请求前的拦截
    (config: AxiosRequestConfig) => {
      const cookie = localStorage.getItem(COOKIE_KEY);

      if (!config.params) {
        config.params = {};
      }
      // if (cookie) {
      //   config.params.cookie = encodeURIComponent(cookie);
      // }
      config.params.timerstamp = Date.now();

      return config;
    },
    // 请求错误前的拦截
    (error) => {
      return Promise.reject(error?.response);
    }
  );

  // ! 响应拦截
  instance.interceptors.response.use(
    (res) => {
      saveCache(res.data);
      return res.data;
    },
    (err) => {
      if (err?.response?.data?.message) {
        message.error(err?.response?.data?.message);
      }

      return Promise.reject(err?.response?.data || err);
    }
  );

  return instance(config) as any;
}

export default request;
