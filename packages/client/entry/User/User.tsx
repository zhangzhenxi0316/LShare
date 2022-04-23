import axiosInstance from "common/axios";
import { UserType } from "common/types/user";
import Feed from "components/Feed/Feed";
import Titlebar from "components/TitleBar/TitleBar";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./user.scss";

const User = () => {
  const navigator = useNavigate();
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState<UserType>({} as UserType);
  const getUserInfo = async () => {
    const userInfoRes = await axiosInstance.get(`/getUserInfo?user_id=${id}`);
    if (userInfoRes.data.code === 200) {
      console.log("userInfoRes.data", userInfoRes.data);
      setUserInfo(userInfoRes.data.userInfo);
    }
  };
  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <div className="user-container">
      <Titlebar title={userInfo.nickName} />
      <div className="top-area">
        <div className="user-info">
          <img className="user-avatar" src={userInfo.avatarUrl}></img>
          <div className="user-name">{userInfo.nickName}</div>
          <div className="user-desc">{userInfo.description}</div>
        </div>
      </div>
      <div className="user-post">
        {userInfo.posts?.length == 0 ? (
          <div className="empty-text">他还没有发文</div>
        ) : (
          <Feed articleGroups={[userInfo.posts || []]} />
        )}
      </div>
    </div>
  );
};
export default User;
