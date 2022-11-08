import React, { FC, ReactElement } from "react";
import styles from "./index.module.less";
interface IProps {
  search: any;
  handleSearchChange: any;
}

const Letter = `ABCDEFGHIJKLMNOPQRSTUVWXYZ`;

type FilterItem = {
  label: string;
  children: {
    value: any;
    name: string;
  }[];
};

const ArtistFilter: FC<IProps> = ({
  search,
  handleSearchChange,
}): ReactElement => {
  const data: {
    [k in string]: FilterItem;
  } = {
    area: {
      label: "语种",
      children: [
        {
          value: -1,
          name: "全部",
        },
        {
          value: 7,
          name: "华语",
        },
        {
          value: 96,
          name: "欧美",
        },
        {
          value: 8,
          name: "日本",
        },
        {
          value: 16,
          name: "韩国",
        },
        {
          value: 0,
          name: "其他",
        },
      ],
    },
    type: {
      label: "分类",
      children: [
        {
          value: -1,
          name: "全部",
        },
        {
          value: 1,
          name: "男歌手",
        },
        {
          value: 2,
          name: "女歌手",
        },
        {
          value: 3,
          name: "乐队",
        },
      ],
    },
    initial: {
      label: "筛选",
      children: [
        {
          value: -1,
          name: "热门",
        },
        ...Letter.split("").map((item) => ({
          value: item,
          name: item,
        })),
      ],
    },
  };

  return (
    <div className={`${styles["ArtistFilter"]}`}>
      {Object.keys(data).map((k) => {
        const item = data[k];

        const { label, children } = item;
        return (
          <div key={k} className={`${styles["item"]}`}>
            <div className={`${styles["label"]}`}>{label}:</div>
            <ul>
              {children.map(({ value, name }) => (
                <li
                  key={value}
                  className={value === search[k] ? `${styles["active"]}` : ""}
                  onClick={(e) => {
                    if (value === search[k]) {
                      return;
                    }
                    handleSearchChange(k, value);
                  }}
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default ArtistFilter;
