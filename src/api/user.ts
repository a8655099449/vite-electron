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
    method: "post",
  });
};
// 账号密码登录

export const loginByPhone = (data: {
  phone: string;
  md5_password?: string;
  password?: string;
  captcha?: string;
}) => {
  return request<{ qrurl: string }>({
    url: "/login/cellphone",
    data,
    method: "post",
  });
};

// /login/status
export const getLoginStatus = () =>
  request<{ profile: UserProfile }>({
    url: "/login/status",
  });
export const captchaSent = (phone: string) =>
  request<{ qrurl: string }>({
    url: "/captcha/sent",
    params: { phone },
  });
