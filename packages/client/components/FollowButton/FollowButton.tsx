import axiosInstance from "common/axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import cs from "classnames";
import "./followButton.scss";
import { useNavigate } from "react-router-dom";
type FollowButtonProps = {
  toUid: string;
  followState?: FollowState;
};
type FollowState = "following" | "unfollow" | "loading";
const FollowButton = (props: FollowButtonProps) => {
    const navigator = useNavigate()
  const { toUid, followState = "unfollow" } = props;
  const [state, setState] = useState<FollowState>(followState);
  const getIsFollow = async () => {
    const isFollowRes = await axiosInstance.get(`/isFollow?toUid=${toUid}`);
    if (isFollowRes.data.code === 200) {
      setState(isFollowRes.data.isFollow ? "following" : "unfollow");
    }
  };
  useEffect(() => {
    getIsFollow();
  }, []);
  const renderText = () => {
    console.log("state", state);
    if (state === "following") return "关注中";
    if (state === "unfollow") return "关注";
    if (state === "loading") {
      return <div className="loading-icon"></div>;
    }
  };
  const handleFollow = async () => {
    if (state === "loading") return;
    let temp = state;
    console.log('temp',temp);
    setState("loading");
    const followRes = await axiosInstance.post("/action", {
      type: temp === "following" ? "unfollow" : "follow",
      toUid,
    });
    if(followRes.data.code === 500){
        navigator('/login')
        return;
    }
    console.log(followRes.data);
    if (followRes.data.code === 200) {
      setState(followRes.data.isFollow === "follow" ? "following" : "unfollow");
    }
  };
  return (
    <div className={cs("follow-button", state)} onClick={handleFollow}>
      <div className={cs("follow-button-text", state)}>{renderText()}</div>
    </div>
  );
};
export default FollowButton;
