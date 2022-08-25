import { loginByPhone } from "@/api/user";
import to from "@/common/to";
import { Button, Input, PasswordInput } from "@mantine/core";
import { IconDeviceMobile, IconLockAccess } from "@tabler/icons";
import md5 from "blueimp-md5";
import React, { FC, ReactElement, useState } from "react";
import Icon from "../icon/Icon";

import styles from "./login.module.less";

interface IProps {
  backScanCode(): void;
}
const FromLogin: FC<IProps> = ({ backScanCode }): ReactElement => {
  const [loginInput, setLoginInput] = useState({
    phone: "",
    password: "",
  });

  const login = async () => {
    const [err, res] = await to(
      loginByPhone({
        phone: loginInput.phone,
        password: loginInput.password,
        // md5_password: md5(loginInput.password),
      })
    );
    if (err) {
      return;
    }

    console.log("👴2022-08-25 07:19:39 FromLogin.tsx line:31", res);
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
      <div className={`${styles["input"]}`}>
        <PasswordInput
          placeholder="输入密码"
          icon={<IconLockAccess size={20} />}
          onChange={(e: any) => {
            setLoginInput({
              ...loginInput,
              password: e.target.value,
            });
          }}
        />
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
