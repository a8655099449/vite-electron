import { likeMusic } from "@/api/song";
import { confirm, message } from "@/common/utils";
import { useStore } from "@/store";
import { observer } from "mobx-react";
import React, { useMemo } from "react";
import Icon from "../icon/Icon";
const LikeButton = ({
  size = undefined,
  id = undefined,
}: {
  id?: number;
  size?: number;
}) => {
  const { currentSong } = useStore().player;
  const { profile } = useStore();
  const { userLikeIds, getUserLikeList } = profile;
  const _id = useMemo(() => {
    if (id) {
      return id;
    }
    return currentSong.id;
  }, [id, currentSong.id]);

  const isLike = useMemo(
    () => userLikeIds.includes(_id as number),
    [userLikeIds, _id]
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
          id: _id,
          like: !isLike,
        });
        if (res) {
          message.success(isLike ? "取消喜欢成功" : `喜欢音乐成功`);
          getUserLikeList();
        }
      }}
      title={isLike ? "取消喜欢" : "喜欢"}
      hoverLight
      size={size}
    />
  );
};

export default observer(LikeButton);
