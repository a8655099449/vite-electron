import { useStore } from "@/store";
import { observer } from "mobx-react";
import React, { FC, ReactElement } from "react";

interface IProps {}
const video: FC<IProps> = (): ReactElement => {

  const { likeListID } = useStore().profile

  return <div>视频页面 {likeListID}</div>;
};

export default observer(video);
