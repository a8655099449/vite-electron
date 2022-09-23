import React, { FC, ReactElement } from "react";

import styles from "./home.module.less";

interface IProps {
  title: string;
  data: Resource[];
}

const HomeTopic: FC<IProps> = ({ title, data = [] }): ReactElement => {
  return (
    <div className={`${styles["topic"]}`}>
      <h2>{title}</h2>

      <div>
        {data.map((item, index) => (
          <div key={index}></div>
        ))}
      </div>
    </div>
  );
};

export default HomeTopic;
