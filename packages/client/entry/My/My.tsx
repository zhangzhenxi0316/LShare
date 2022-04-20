import axiosInstance from "common/axios";
import { UserType } from "common/types/user";
import Feed from "components/Feed/Feed";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./my.scss";

const userInfo = {
  name: "zzx",
  avatarUrl:
    "https://p16.topbuzzcdn.com/img/user-avatar-alisg/fda9153a63d648b42edeafb3fefd185c~1200x0.image",
  description: "hi gus im girls",
};
const My = () => {
  const [userInfo, setUserInfo] = useState<UserType>({} as UserType);
  const getUserInfo = async () => {
    const userInfoRes = await axiosInstance.get("/getUserInfo?isSelf=1");
    if (userInfoRes.data.code === 200) {
      console.log("userInfoRes.data", userInfoRes.data);
      setUserInfo(userInfoRes.data.userInfo);
    }
  };
  useEffect(() => {
    getUserInfo();
  }, []);
  console.log("userInfo.posts------", userInfo);
  return (
    <div className="my-container">
      <div className="top-area">
        <div className="user-info">
          <img className="user-avatar" src={userInfo.avatarUrl}></img>
          <div className="user-name">{userInfo.userName}</div>
          <div className="user-desc">{userInfo.description}</div>
        </div>
      </div>
      <div className="tool">
        <div className="editor-user-info">Edit User Info </div>
      </div>
      <div className="user-post">
        {userInfo.posts?.length == 0 ? (
          <div className="empty-text">你还没有发文</div>
        ) : (
          <Feed articleGroups={[userInfo.posts || []]} />
        )}
      </div>
    </div>
  );
};
export default My;
