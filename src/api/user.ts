import request from "@/common/request";
import { useRequest } from "ahooks";


export const getLoginQrKey = () => {
  return request<{ unikey: string }>({
    url: "/login/qr/key",
  });
};
export const getCreateQr = (key: string) => {
  return request<{ qrurl: string }>({
    url: "/login/qr/create",
    params: { key },
  });
};
export const checkQrLogin = (key: string) => {
  return request<{ qrurl: string }>({
    url: "/login/qr/check",
    params: { key },
  });
};
// 账号密码登录
