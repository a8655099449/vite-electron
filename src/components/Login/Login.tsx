import { checkQrLogin, getCreateQr, getLoginQrKey } from "@/api/user";
import to from "@/common/to";
import { useBaseContext } from "@/context/useBaseContent";
import { Button, Modal } from "@mantine/core";
import React, { FC, ReactElement, useEffect, useRef, useState } from "react";
import Image from "../Image/Image";
import { QRCodeSVG } from "qrcode.react";
interface IProps {}
const Login: FC<IProps> = (): ReactElement => {
  const { loginVisible, toggleLoginVisible } = useBaseContext();
  // const
  const [qrCodeSrc, setQrCodeSrc] = useState("");

  const ref = useRef({
    key: "",
    timer: 0,
  });

  const createQrCode = async () => {
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
    const { key, timer } = ref.current;
    const [err, res] = await to(checkQrLogin(key));
    if (err) {
      clearCheckQrLoginStatusTimer();
      return;
    }
    if (res.code === 803) {
      clearCheckQrLoginStatusTimer();
      
    }
  };
  const clearCheckQrLoginStatusTimer = () => {
    const { key, timer } = ref.current;
    clearInterval(timer);
  };

  useEffect(() => {
    if (loginVisible) {
      createQrCode();
    } else {
      clearCheckQrLoginStatusTimer();
    }
  }, [loginVisible]);

  return (
    <Modal
      opened={loginVisible}
      onClose={() => toggleLoginVisible(false)}
      title="扫码登录"
    >
      <div>
        <div className="center">
          {qrCodeSrc && <QRCodeSVG value={qrCodeSrc} />}
        </div>
      </div>
    </Modal>
  );
};

export default Login;
