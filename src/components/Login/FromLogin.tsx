import { Button, Input, PasswordInput } from "@mantine/core";
import {
  IconDeviceMobile,
  IconLockAccess,

} from "@tabler/icons";
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

  const login = () => {
    console.log("👴2022-08-24 21:56:09 FromLogin.tsx line:24", loginInput);
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
