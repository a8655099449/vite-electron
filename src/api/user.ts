import request from "@/common/request";
import to from "@/common/to";
import { useRequest } from "ahooks";

export const getLoginQrKey = () => {
  return request<{ unikey: string }>({
    url: "/login/qr/key",
    cacheTime: 0,
  });
};
export const getCreateQr = (key: string) => {
  return request<{ qrurl: string }>({
    url: "/login/qr/create",
    params: { key },
    cacheTime: 0,
  });
};
export const checkQrLogin = (key: string) => {
  return request<{ qrurl: string }>({
    url: "/login/qr/check",
    params: { key },
    method: "post",
    cacheTime: 0,
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
    cacheTime: 0,
  });
};

// /login/status
export const getLoginStatus = () =>
  request<{ profile: UserProfile }>({
    url: "/login/status",
    cacheTime: 60 * 1000 * 60,
  });

// 发送验证码
export const captchaSent = (phone: string) =>
  request<{ qrurl: string }>({
    url: "/captcha/sent",
    params: { phone },
    cacheTime: 0,
  });

export const sendLogout = () =>
  request({
    url: "/logout",
    cacheTime: 0,
  });

export const getUserSubCount = () =>
  request({
    url: "/user/subcount",
  });
// 获取用户详情
export const getUserDetail = (uid: number) =>
  request<{
    profile: UserProfile;
  }>({
    url: "/user/detail",
    params: { uid },
  });

// 获取用户歌单
export const getUserPlayList = async (uid: ID) => {
  const object: UserPlayList = {
    collect: [],
    create: [],
  };
  const [err, res] = await to(
    request<{
      playlist: SongListItem[];
    }>({
      url: "/user/playlist",
      params: { uid },
    })
  );
  if (err) {
    return object;
  }

  if (res) {
    const { playlist } = res;
    playlist.forEach((item) => {
      if (item.userId == Number(uid)) {
        object.create.push(item);
      } else {
        object.collect.push(item);
      }
    });
  }

  return object;
};
