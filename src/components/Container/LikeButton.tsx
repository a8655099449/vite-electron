import { likeMusic } from "@/api/song";
import { confirm, message } from "@/common/utils";
import { useBaseContext } from "@/context/useBaseContent";
import React, { useMemo } from "react";
import Icon from "../icon/Icon";
const LikeButton = ({ size = undefined }) => {
  const { userLikeIds, currentSong, getUserLikeList } = useBaseContext();

  const isLike = useMemo(
    () => userLikeIds.includes(currentSong.id),
    [userLikeIds, currentSong]
  );

  return (
    <Icon
      type="like"
      style={{
        color: isLike ? "var(--primary-color)" : undefined,
      }}
      onClick={async (e) => {
        if (isLike) {
          await confirm({
            children: "是否取消喜欢此音乐？",
          });
        }

        const res = await likeMusic({
          id: currentSong.id,
          like: !isLike,
        });
        if (res) {
          message.success(isLike ? "取消喜欢成功" : `喜欢音乐成功`);
          getUserLikeList();
        }
      }}
      title={isLike ? "取消喜欢" : "喜欢"}
      hoverLight
    />
  );
};

export default LikeButton;
