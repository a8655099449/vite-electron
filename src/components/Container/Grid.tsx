import { generateUUID } from "@/common/utils";
import React, { FC, ReactElement, ReactNode, useMemo } from "react";

interface IProps {
  row?: number;
  space?: number;
  children: ReactNode;
}
const GridWrap: FC<IProps> = ({
  row = 3,
  space = 20,
  children,
}): ReactElement => {
  const uuid = useMemo(() => `uuid-` + generateUUID(), []);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
      }}
      className={uuid}
    >
      <style>
        {`.${uuid}> * {
            width: calc((100% - ${(row - 1) * space}px) / ${row});
            margin-right: ${space}px;
            margin-bottom: ${space}px;
          }
          .${uuid}> *:nth-child(${row}n + 1) {
            margin-right: 0px;
          }
          `}
      </style>
      {children}
    </div>
  );
};

export default GridWrap;
