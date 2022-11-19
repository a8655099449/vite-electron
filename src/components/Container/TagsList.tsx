import { FC, ReactElement } from "react";

type TagsListProps = {
  list?: {
    label: string;
    value: any;
  }[];
  value?: any;
  onChange?(e: any): void;
};
const TagsList: FC<TagsListProps> = ({
  list = [],
  value = "",
  onChange,
}): ReactElement => {
  return (
    <div className={`cates`}>
      <div></div>
      <div>
        {list?.map(({ label, value: _value }) => (
          <span
            key={label}
            className={`${value === _value ? "cates-active" : ""}`}
            onClick={() => {
              if (value === label) {
                return;
              }
              onChange?.(_value);
            }}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TagsList;
