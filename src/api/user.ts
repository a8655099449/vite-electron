import request from "@/common/request";
import to from "@/common/to";
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

// 发送验证码
export const captchaSent = (phone: string) =>
  request<{ qrurl: string }>({
    url: "/captcha/sent",
    params: { phone },
  });

export const sendLogout = () =>
  request({
    url: "/logout",
  });

export const getUserSubCount = () =>
  request({
    url: "/user/subcount",
  });
// 获取用户详情
export const getUserDetail = (uid: number) =>
  request({
    url: "/user/detail",
    params: { uid },
  });

// 获取用户歌单
export const getUserPlayList = async (uid: number) => {
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
