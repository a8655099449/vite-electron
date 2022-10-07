import { getComment } from "@/api/songList";
// import { Skeleton } from "@mantine/core";
import { useRequest } from "ahooks";
import dayjs from "dayjs";
import React, { FC, ReactElement, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Empty from "../Container/Empty";
import Skeleton from "../Container/Skeleton";
import Icon from "../icon/Icon";
import Image from "../Image/Image";

import styles from "./index.module.less";

interface IProps {
  id: number | string;
  type: CommentTypes;
}
const Comments: FC<IProps> = ({ id, type }): ReactElement => {
  const {
    data: comment,
    loading: commentLoading,
    run: _getComment,
  } = useRequest(
    () =>
      getComment({
        id,
        type,
      }),
    {
      manual: true,
    }
  );
  const { comments, hotComments } = useMemo(() => {
    const { comments = [], hotComments = [] } = comment || {};

    return {
      comments,
      hotComments,
    };
  }, [comment]);

  console.log("👴2022-10-06 22:50:47 index.tsx line:42", hotComments);

  useEffect(() => {


    _getComment();
  }, [id]);

  const handleLike = (item: Comment) => {
    console.log("👴2022-10-06 22:54:29 index.tsx line:50", item);
  };

  return (
    <Skeleton loading={commentLoading} count={5}>
      {comments.length ? (
        <div className={`${styles["comment"]}`}>
          <div className={`${styles["title"]}`}>精彩评论</div>
          {hotComments.map((item) => (
            <CommentItem
              comment={item}
              key={item.commentId}
              onLike={handleLike}
            />
          ))}
          <div className={`${styles["title"]}`}>全部评论</div>
          {comments.map((item) => (
            <CommentItem
              comment={item}
              key={item.commentId}
              onLike={handleLike}
            />
          ))}
        </div>
      ) : (
        <Empty desc="暂无评论" />
      )}
    </Skeleton>
  );
};

interface ICommentItemProps {
  comment: Comment;
  onLike(item: Comment): void;
}
const CommentItem: FC<ICommentItemProps> = ({
  comment,
  onLike,
}): ReactElement | null => {
  if (!comment) {
    return null;
  }

  const { user, content, time, likedCount, beReplied, liked } = comment;
  return (
    <div className={`${styles["item"]}`}>
      <div className={`${styles["avatar"]}`}>
        <Image src={comment.user.avatarUrl} round />
      </div>
      <div className={`${styles["right"]}`}>
        <div className={`${styles["text1"]}`}>
          <Link to={`/user?id=${user.userId}`} className="link">
            {user.nickname} ：
          </Link>
          <span className={`${styles["content"]}`}>{content}</span>
        </div>
        {beReplied?.length > 0 && (
          <div className={`${styles["beReplied"]}`}>
            {beReplied?.map((item) => (
              <div key={item.beRepliedCommentId}>
                <Link to={`/user?id=${item.user.userId}`} className="link">
                  {item.user.nickname}
                </Link>
                : <span className="text-color-2">{item.content}</span>
              </div>
            ))}
          </div>
        )}

        <div className={`${styles["text2"]}`}>
          <span className={`text-color-2`}>
            {" "}
            {dayjs(time).format(`YYYY年MM月DD日`)}
          </span>
          <span className={`${styles["icon-wrap"]}`}>
            <span>
              <Icon
                type="like2"
                hoverLight
                color={liked ? "var(--primary-color)" : undefined}
                onClick={() => onLike(comment)}
              />
              {likedCount}
            </span>
            <span>
              <Icon type="share" />
            </span>
            <span>
              <Icon type="comment" />
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Comments;
