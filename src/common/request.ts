import axios from "axios";

import type { AxiosRequestConfig } from "axios";
import { COOKIE_KEY } from "./consts";

const baseURL = `http://47.107.81.99:3000`;
// const baseURL = `/apis`;
function request<T = any>(
  config: AxiosRequestConfig
): Promise<{
  code: number;
  data: T;
  [K: string]: any;
} & T> {
  const instance = axios.create({
    // 公用的网络请求路径
    baseURL: baseURL,
    // 网络请求时间超时会自动断开
    timeout: 10000,
    method: "get",
    withCredentials: true,
  });

  //  请求拦截
  instance.interceptors.request.use(
    //  请求前的拦截
    (config: AxiosRequestConfig) => {
      const cookie = localStorage.getItem(COOKIE_KEY);

      if (!config.params) {
        config.params = {};
      }
      if (cookie) {
        config.params.cookie = encodeURIComponent(cookie);
      }

      config.params.timerstamp = Date.now();

      return config;
    },
    // 请求错误前的拦截
    (error) => {
      return Promise.reject(error);
    }
  );

  // ! 响应拦截
  instance.interceptors.response.use(
    (res) => {
      return res.data;
    },
    (err) => {
      return err;
    }
  );

  return instance(config) as any;
}

export default request;
