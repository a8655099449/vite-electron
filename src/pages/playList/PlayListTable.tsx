import LikeButton from "@/components/Container/LikeButton";
import SongTimeBar from "@/components/Container/SongTimeBar";
import React, { FC, ReactElement, useMemo } from "react";
import { Link } from "react-router-dom";


type rowKeys = "歌手" | "专辑" | "index";

interface IProps {
  data: SongItem[];
  hideRowKeys?: rowKeys[]; // 希望隐藏的列
  hideHeader?: boolean; // 是否隐藏表头
}
const PlayListTable: FC<IProps> = ({
  data,
  hideRowKeys = [],
  hideHeader = false,
}): ReactElement => {
  const { showIndex, showSinger, showAl } = useMemo(() => {
    return {
      showIndex: !hideRowKeys?.includes("index"),
      showSinger: !hideRowKeys.includes("歌手"),
      showAl: !hideRowKeys.includes("专辑"),
    };
  }, [hideRowKeys]);

  return (
    <div>
      <table className={`play-list-table`}>
        {!hideHeader && (
          <thead>
            <tr>
              {showIndex && <th></th>}
              <th>操作</th>
              <th>歌名</th>
              {showSinger && <th>歌手</th>}
              {showAl && <th>专辑</th>}
              <th>时长</th>
            </tr>
          </thead>
        )}
        <tbody>
          {data.map((item, index) => (
            <tr
              key={item.id}
              onDoubleClick={(e) => {
                api.emit("PLAY", item.id);
              }}
            >
              {showIndex && <td>{index + 1}</td>}
              <td className="like-row">
                <LikeButton id={item.id as number} />
              </td>
              <td>
                <div className={`song-name text-row-1`}>{item.name}</div>
              </td>
              {showSinger && (
                <td>
                  <Link
                    to={"/"}
                    style={{
                      display: "block",
                      width: 150,
                    }}
                    className="text-row-1"
                  >
                    {item.ar?.[0].name}
                  </Link>
                </td>
              )}
              {showAl && (
                <td
                  style={{
                    width:200
                  }}
                >
                  <div
                    style={{
                      display: "block",
                      width: 150,
                    }}
                    className="text-row-1"
                  >
                    {item.al.name}
                  </div>
                </td>
              )}
              <td>
                <SongTimeBar dt={item.dt} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayListTable;
