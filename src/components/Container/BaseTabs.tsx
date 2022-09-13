import { TabProps, Tabs } from "@mantine/core";
import React, { FC, ReactElement } from "react";

type tabItem = {} & TabProps;

interface IProps {
  list: tabItem[];
}
const BaseTabs: FC<IProps> = ({ list }): ReactElement => {
  return (
    <Tabs>
      <Tabs.List>
        {list.map((item) => (
          <Tabs.Tab {...item} key={item.value} />
        ))}
      </Tabs.List>
    </Tabs>
  );
};

export default BaseTabs;



