import { useBaseContext } from "@/context/useBaseContent";
import { Button } from "@mantine/core";
import React, { FC, ReactElement } from "react";
import Image from "../Image/Image";

interface IProps {}
const Avatar: FC<IProps> = (): ReactElement => {
  const { toggleLoginVisible, userInfo } = useBaseContext();

  return (
    <div>
      {userInfo.avatarUrl ? (
        <Image src={userInfo.avatarUrl} />
      ) : (
        <Button
          onClick={() => {
            toggleLoginVisible(true);
          }}
          size="xs"
        >
          登录
        </Button>
      )}
    </div>
  );
};

export default Avatar;
