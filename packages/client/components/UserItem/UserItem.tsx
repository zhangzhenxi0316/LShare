import { UserType } from "common/types/user";
import React from "react";
import "./userItem.scss";

const UserItem = (props: UserType) => {
  const { avatarUrl, userName, description } = props;
  return (
    <div className="user-item-container">
      <img className="user-avatar" src={avatarUrl} />
      <div className="user-main">
        <div className="user-name">{userName}</div>
        <div className="user-description">{description}</div>
      </div>
    </div>
  );
};
export default UserItem;
