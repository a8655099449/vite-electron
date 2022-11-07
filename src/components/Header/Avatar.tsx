import { confirm } from "@/common/utils";
import { useStore } from "@/store";
import { Button, Menu } from "@mantine/core";
import { IconOutlet } from "@tabler/icons";
import { observer } from "mobx-react";
import React, { FC, ReactElement } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Icon from "../icon/Icon";
import Image from "../Image/Image";

interface IProps {}
const Avatar: FC<IProps> = (): ReactElement => {
  const { profile, setting } = useStore();
  const { toggleLoginVisible } = setting;
  const { userInfo, logout } = profile;

  const to = useNavigate();
  const { pathname } = useLocation();
  return (
    <div>
      {userInfo.avatarUrl ? (
        <Menu
          // position={"bottom-end"}
          transition="rotate-right"
          shadow={"md"}
          width={150}
          withArrow
          trigger="hover"
        >
          <Menu.Target>
            <div>
              <Image
                src={userInfo.avatarUrl}
                onClick={(e) => {
                  to(`/user?id=${userInfo.userId}`, {
                    replace: pathname === "/user",
                  });
                }}
              />
            </div>
          </Menu.Target>

          <Menu.Dropdown>
            {/* <Menu.Label>开发相关</Menu.Label> */}
            <Menu.Label>{userInfo.nickname}</Menu.Label>
            <Menu.Item
              icon={<Icon type="logout" size={14} />}
              onClick={async () => {
                await confirm({
                  children: "是否确认退出登录？",
                  title: "退出登录",
                });
                logout();
              }}
            >
              退出登录
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
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

export default observer(Avatar);
