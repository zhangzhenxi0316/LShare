import { UserType } from "common/types/user";
import FollowButton from "components/FollowButton/FollowButton";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./userItem.scss";

const UserItem = (props: UserType) => {
  const navigator = useNavigate();
  const { avatarUrl, nickName, description, _id } = props;
  const handleGotoUser = (e: any) => {
    e.stopPropagation();
    navigator(`/user/${_id}`);
  };
  return (
    <div className="user-item-container">
      <img
        className="user-avatar"
        src={avatarUrl}
        onClick={(e: any) => handleGotoUser(e)}
      />
      <div className="user-main">
        <div className="user-name">{nickName}</div>
        <div className="user-description">{description}</div>
      </div>
      <FollowButton toUid={_id}/>
    </div>
  );
};
export default UserItem;
