import UserItem from "components/UserItem/UserItem";
import React, { useState } from "react";
import cs from "classnames";
import "./followList.scss";
import { useEffect } from "react";
import axiosInstance from "common/axios";
import { UserType } from "common/types/user";
import { useNavigate } from "react-router-dom";
type ActiveType = "following" | "follow";
const FollowList = () => {
  const navigator = useNavigate();
  const [active, setActive] = useState<ActiveType>("following");
  const [data, setData] = useState([] as Array<UserType>);
  const handleFolowingClick = () => {
    setActive("following");
  };
  const handleFolowerClick = () => {
    setActive("follow");
  };
  const getUserData = async (active: ActiveType) => {
    let data = [];
    if (active === "following") {
      const dataRes = await axiosInstance.get("/getFollowings");
      if (dataRes.data.code === 500) {
        navigator("/login");
      }
      setData(dataRes.data.followings);
    } else {
      const dataRes = await axiosInstance.get("/getFollowers");
      if (dataRes.data.code === 500) {
        navigator("/login");
      }
      setData(dataRes.data.followers);
    }
  };
  useEffect(() => {
    getUserData(active);
  }, [active]);
  return (
    <div className="follow-list">
      <div className="follow-navbar">
        <div
          className={cs("following-list", { active: active === "following" })}
          onClick={handleFolowingClick}
        >
          <div className="center">关注列表</div>
        </div>
        <div className="line">|</div>
        <div
          className={cs("follower-list", { active: active === "follow" })}
          onClick={handleFolowerClick}
        >
          <div className="center">粉丝列表</div>
        </div>
      </div>
      <div className="follow-list">
        {data.map((item) => {
          return <UserItem key={item._id} {...item} />;
        })}
      </div>
    </div>
  );
};
export default FollowList;
