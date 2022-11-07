import { checkQrLogin, getCreateQr, getLoginQrKey } from "@/api/user";
import to from "@/common/to";
import { Button, Modal } from "@mantine/core";
import React, { FC, ReactElement, useEffect, useRef, useState } from "react";
import Image from "../Image/Image";
import { QRCodeSVG } from "qrcode.react";
interface IProps {}
import styles from "./login.module.less";
import Icon from "../icon/Icon";
import { IMAGE_AVATAR } from "@/common/images";
import { useLocalStorage } from "@mantine/hooks";
import { message } from "@/common/utils";
import FromLogin from "./FromLogin";
import { COOKIE_KEY } from "@/common/consts";
import { observer } from "mobx-react";
import { useStore } from "@/store";

const Login: FC<IProps> = (): ReactElement => {
  const { loginVisible, toggleLoginVisible } = useStore().setting;
  // const
  const [qrCodeSrc, setQrCodeSrc] = useState("");
  const [value, setCookie] = useLocalStorage({
    key: COOKIE_KEY,
  });

  const [loginMode, setLoginMode] = useLocalStorage({
    defaultValue: 0,
    key: "loginMode",
  });

  const [loginUserInfo, setLoginUserInfo] = useState({
    nickname: "nick",
    avatar: IMAGE_AVATAR,
  });

  const [qrCodeStatus, setQrCodeStatus] = useState(0);

  const ref = useRef({
    key: "",
    timer: 0,
  });

  const createQrCode = async () => {
    setQrCodeStatus(0);
    clearCheckQrLoginStatusTimer();
    // const [err, res] = await to(getLoginQrKey());
    const [err, res] = await to(getLoginQrKey());
    if (err) {
      return;
    }
    ref.current.key = res.data.unikey;
    const [err2, qr] = await to(getCreateQr(res.data.unikey));
    if (err2) {
      return;
    }
    setQrCodeSrc(qr.data.qrurl);
    ref.current.timer = setInterval(checkQrLoginStatus, 3000) as any;
  };
  const checkQrLoginStatus = async () => {
    /**
     * 801=待验证
     * 802=已经扫码
     * 803=登录成功
     */
    const { key } = ref.current;
    const [err, res] = await to(checkQrLogin(key));

    if (err) {
      clearCheckQrLoginStatusTimer();
      return;
    }
    if (res.code === 800) {
      clearCheckQrLoginStatusTimer();
      setQrCodeStatus(2);
    }
    if (res.code === 802) {
      setQrCodeStatus(1);
      setLoginUserInfo({
        avatar: res.avatarUrl,
        nickname: res.nickname,
      });
    }
    if (res.code === 803) {
      clearCheckQrLoginStatusTimer();
      loginSuccess(res);
    }
  };
  const clearCheckQrLoginStatusTimer = () => {
    const { timer } = ref.current;
    clearInterval(timer);
  };
  const close = () => {
    clearCheckQrLoginStatusTimer();
    setQrCodeStatus(0);
    toggleLoginVisible(false);
  };
  const loginSuccess = (res: any) => {
    message.success("登录成功");
    setCookie(res.cookie);
    api.emit("LOGIN_SUCCESS", res);
    close();
  };

  useEffect(() => {
    if (loginVisible && loginMode === 0) {
      createQrCode();
    }
  }, [loginVisible]);

  return (
    <Modal
      opened={loginVisible}
      onClose={close}
      title={loginMode === 0 ? "扫码登录" : "账号密码登录"}
    >
      <div className={`${styles["login"]}`}>
        {loginMode === 0 && (
          <div>
            {qrCodeStatus == 0 && (
              <div className="center mb-20">
                {qrCodeSrc && <QRCodeSVG value={qrCodeSrc} />}
              </div>
            )}
            {qrCodeStatus == 1 && (
              <div className={`${styles["user"]}`}>
                <div className="center">
                  <Image src={loginUserInfo.avatar} />
                </div>
                <div className="center ">{loginUserInfo.nickname}</div>
              </div>
            )}
            {qrCodeStatus == 2 && (
              <div className={`${styles["user"]}`}>
                <div className="center">二维码过期</div>
                <div className="center">
                  <Button onClick={createQrCode}>刷新</Button>
                </div>
              </div>
            )}

            <div
              className="center underline"
              onClick={() => {
                clearCheckQrLoginStatusTimer();
                setLoginMode(1);
              }}
            >
              账号密码登录
            </div>
          </div>
        )}
        <div
          style={{
            display: loginMode === 1 ? "block" : "none",
          }}
        >
          <FromLogin
            backScanCode={() => {
              createQrCode();
              setLoginMode(0);
            }}
            loginSuccess={loginSuccess}
          />
        </div>
      </div>
    </Modal>
  );
};

export default observer(Login);
