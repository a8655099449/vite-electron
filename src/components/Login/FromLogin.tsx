import { captchaSent, loginByPhone } from "@/api/user";
import { COOKIE_KEY } from "@/common/consts";
import to from "@/common/to";
import { message } from "@/common/utils";
import { Button, Input, PasswordInput } from "@mantine/core";
import { IconDeviceMobile, IconLockAccess } from "@tabler/icons";
import md5 from "blueimp-md5";
import React, { FC, ReactElement, useRef, useState } from "react";
import Icon from "../icon/Icon";

import styles from "./login.module.less";

interface IProps {
  backScanCode(): void;
  loginSuccess(res: any): void;
}
const FromLogin: FC<IProps> = ({
  backScanCode,
  loginSuccess,
}): ReactElement => {
  const [loginInput, setLoginInput] = useState({
    phone: "",
    password: "",
    readOny: true,
  });

  // const c = () => {}
  const [count, setCount] = useState(60);

  const [readOnly, setReadOnly] = useState(false);
  const ref = useRef({
    timer: 0 as any,
  });

  const login = async () => {
    const [err, res] = await to(
      loginByPhone({
        phone: loginInput.phone,
        captcha: loginInput.password,
        // md5_password: md5(loginInput.password),
      })
    );
    if (err) {
      return;
    }
    if (res.code === 200) {
      loginSuccess(res);
      // localStorage.setItem(COOKIE_KEY, res.cookie);
    }
  };

  const getPhoneCode = async () => {
    const [err, res] = await to(captchaSent(loginInput.phone));
    if (err) {
      return;
    }
    if (res.code === 200) {
      setReadOnly(true);
      startCountDown();
      message.success("验证码已发送");
      ref.current.timer = setInterval(startCountDown, 1000);
    }
  };
  const startCountDown = () => {
    setCount((c) => {
      if (c - 1 === 60) {
        setReadOnly(false);
        clearInterval(ref.current.timer);
        c = 61;
      }

      return c - 1;
    });
  };

  return (
    <div className={`${styles["form"]}`}>
      <div className={`${styles["input"]}`}>
        <Input
          placeholder="输入手机号"
          icon={<IconDeviceMobile size={20} />}
          onChange={(e: any) => {
            setLoginInput({
              ...loginInput,
              phone: e.target.value,
            });
          }}
        />
      </div>
      <div className={`${styles["input"]} ${styles["password"]}`}>
        <div>
          <Input
            placeholder="输入密码"
            icon={<IconLockAccess size={20} />}
            onChange={(e: any) => {
              setLoginInput({
                ...loginInput,
                password: e.target.value,
              });
            }}
            style={{
              borderRadius: 0,
            }}
          />
        </div>
        <Button onClick={getPhoneCode} disabled={readOnly}>
          {readOnly ? count + "s" : "获取验证码"}
        </Button>
      </div>
      <div className={`${styles["input"]}`}>
        <Button fullWidth onClick={login}>
          登录
        </Button>
      </div>

      <div onClick={backScanCode} className="center underline">
        扫码登录
      </div>
    </div>
  );
};

export default FromLogin;
