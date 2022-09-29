import React, { FC, ReactElement } from "react";
import styles from "./Skeleton.module.less";

interface SkeletonProps {
  count?: number;
  loading: boolean;
  children?: any;
  type?: "bar" | "circle" | "rect";
}
const Skeleton: FC<SkeletonProps> = ({
  count = 1,
  loading = false,
  children = <></>,
  type = "rect",
}) => {
  if (loading) {
    return (
      <div className={`${styles["Skeleton"]} ${styles[type]}`}>
        {Array(count)
          .fill("")
          .map((_, index) => {
            return <SkeletonItem key={index} />;
          })}
      </div>
    );
  }
  return children;
};

const SkeletonItem = () => {
  return (
    <div className={`${styles["SkeletonItem"]}`}>
      <div className={`${styles["left"]}`}>
        <div className={`${styles["row-bar"]}`}></div>
      </div>
      <div className={`${styles["right"]}`}>
        <div className={`${styles["row-bar"]}`} />
        <div className={`${styles["row-bar"]}`} />
        <div className={`${styles["row-bar"]}`} />
      </div>
    </div>
  );
};

export default Skeleton;
