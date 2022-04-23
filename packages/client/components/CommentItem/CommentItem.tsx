import { CommentItemType } from "common/types/comment";
import { UserType } from "common/types/user";
import transformDate from "common/util/transformDate";
import React from "react";
import "./commentItem.scss";
const CommmentItem = (props: CommentItemType) => {
    console.log(props)
  const { content, user = {} as UserType, addTime } = props;
  return (
    <div className="comment-item">
      <img className="avatar" src={user.avatarUrl} />
      <div className="comment-content">{content}</div>
      <div className="time">{transformDate(addTime)}</div>
    </div>
  );
};
export default CommmentItem;
