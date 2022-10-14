import React, { FC, ReactElement, useEffect, useRef } from "react";
import styles from "./Skeleton.module.less";

interface SkeletonProps {
  count?: number;
  loading: boolean;
  children?: any;
  type?: "bar" | "circle" | "rect";
  minHeight?: number;
}
const Skeleton: FC<SkeletonProps> = ({
  count = 1,
  loading = false,
  children = <></>,
  type = "rect",
  minHeight,
}) => {
  if (loading) {
    return (
      <div
        className={`${styles["Skeleton"]} ${styles[type]}`}
        style={{
          minHeight,
        }}
      >
        {Array(count)
          .fill("")
          .map((_, index) => {
            return <SkeletonItem key={index} />;
          })}
      </div>
    );
  }

  return <>{children}</>;
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
