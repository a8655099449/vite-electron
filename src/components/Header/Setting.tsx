import { Burger, Button, Menu, Text } from "@mantine/core";
import React, { FC, ReactElement, useState } from "react";
import {
  IconSettings,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
  IconAdjustmentsHorizontal,
  IconRefresh,
  IconMoon,
} from "@tabler/icons";
import Icon from "../icon/Icon";
import { useBaseContext } from "@/context/useBaseContent";

interface IProps {}
const Setting: FC<IProps> = (): ReactElement => {
  const [opened, setOpened] = useState(false);

  const { toggleTheme } = useBaseContext();

  return (
    <Menu
      // position={"bottom-end"}
      transition="rotate-right"
      shadow={"md"}
      width={150}
      withArrow
      trigger="hover"
    >
      <Menu.Target>
        <span>
          <Icon type="setting" button size={18} />
        </span>
      </Menu.Target>
      <Menu.Dropdown>
        {/* <Menu.Label>开发相关</Menu.Label> */}
        <Menu.Item
          icon={<IconAdjustmentsHorizontal size={14} />}
          onClick={() => {
            api.send("openDevtools");
          }}
        >
          打开控制台
        </Menu.Item>
        <Menu.Item
          icon={<IconMoon size={14} />}
          onClick={() => {
            toggleTheme?.();
          }}
        >
          切换主题
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default Setting;
