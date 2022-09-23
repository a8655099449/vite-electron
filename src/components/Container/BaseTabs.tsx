import { TabProps, Tabs } from "@mantine/core";
import React, { FC, ReactElement, ReactNode, useMemo } from "react";

type tabItem = {
  content?: ReactNode;
} & TabProps;

interface IProps {
  list: tabItem[];
  value: string;
  onChange?(e: string): void;
}
const BaseTabs: FC<IProps> = ({ list, value, onChange }): ReactElement => {
  const haveContent = useMemo(() => list.some((item) => item.content), list);

  return (
    <Tabs
      value={value}
      onTabChange={(e) => {
        onChange?.(e as string);
      }}
    >
      <Tabs.List>
        {list.map((item) => (
          <Tabs.Tab {...item} key={item.value} />
        ))}
      </Tabs.List>
      {haveContent &&
        list.map((item) => (
          <Tabs.Panel value={item.value} pt="xs" key={item.value}>
            {item.content}
          </Tabs.Panel>
        ))}
    </Tabs>
  );
};

export default BaseTabs;
