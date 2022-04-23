import axiosInstance from "common/axios";
import { ArticleType } from "common/types/article";
import { UserType } from "common/types/user";
import Feed from "components/Feed/Feed";
import React, { useState, useEffect } from "react";
import cs from "classnames";
import { useNavigate } from "react-router-dom";
import "./my.scss";

const userInfo = {
  name: "zzx",
  avatarUrl:
    "https://p16.topbuzzcdn.com/img/user-avatar-alisg/fda9153a63d648b42edeafb3fefd185c~1200x0.image",
  description: "hi gus im girls",
};
type EntryType = "post" | "like";
const My = () => {
  const navigator = useNavigate();
  const [userInfo, setUserInfo] = useState<UserType>({} as UserType);
  const [entry, setEntry] = useState<EntryType>("post");
  const [post, setPost] = useState<Array<ArticleType>>(
    [] as Array<ArticleType>
  );
  const [likeArticle, setLikeArticle] = useState<Array<ArticleType>>(
    [] as Array<ArticleType>
  );
  const getUserInfo = async () => {
    const userInfoRes = await axiosInstance.get("/getUserInfo?isSelf=1");
    if (userInfoRes.data.code === 200) {
      console.log("userInfoRes.data", userInfoRes.data);
      setUserInfo(userInfoRes.data.userInfo);
    }
  };
  const getPost = async () => {
    const userInfoRes = await axiosInstance.get("/getUserInfo?isSelf=1");
    if (userInfoRes.data.code === 200) {
      setPost(userInfoRes.data.userInfo.posts);
    }
  };
  const getLikeArticle = async () => {
    const userInfoRes = await axiosInstance.get("/getUserLikeArticle");
    if (userInfoRes.data.code === 200) {
      setLikeArticle(userInfoRes.data.data);
    }
  };
  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    if (entry === "like") {
      getLikeArticle();
    } else {
      getPost();
    }
  }, [entry]);
  const handleEditor = () => {
    navigator("/editor", { state: userInfo });
  };
  const handleSelect = (entry: EntryType) => {
    setEntry(entry);
  };
  const renderFeed = () => {
    {
      userInfo?.posts?.length == 0 ? (
        <div className="empty-text">你还没有发文</div>
      ) : (
        <Feed articleGroups={entry === "like" ? [likeArticle] : [post]} />
      );
    }
    if (entry === "like") {
      if (likeArticle.length === 0) {
        return <div className="empty-text">还没收藏文章快去浏览吧</div>;
      } else {
        return <Feed articleGroups={[likeArticle]} />;
      }
    } else {
      if (post.length === 0) {
        return <div className="empty-text">你还没有发文</div>;
      } else {
        return <Feed articleGroups={[post]} />;
      }
    }
  };
  return (
    <div className="my-container">
      <div className="top-area">
        <div className="user-info">
          <div className="avatar-container">
            <img className="user-avatar" src={userInfo.avatarUrl}></img>
            <div className="more-info">
              <div className="more-item follower-num">
                粉丝数
                <div className="count">{userInfo.followers?.length} </div>
              </div>
              <div className="line">|</div>
              <div className="more-item following-num">
                关注数量
                <div className="count">{userInfo.followings?.length} </div>
              </div>
            </div>
          </div>
          <div className="user-name">{userInfo.nickName}</div>
          <div className="user-desc">{userInfo.description}</div>
        </div>
      </div>
      <div className="tool">
        <div className="editor-user-info" onClick={handleEditor}>
          Edit User Info{" "}
        </div>
      </div>
      <div className="user-post">
        <div className="select">
          <div className="post" onClick={() => handleSelect("post")}>
            <div className={cs("center", { active: entry === "post" })}>
              投稿
            </div>
          </div>
          <div className="like" onClick={() => handleSelect("like")}>
            <div className={cs("center", { active: entry === "like" })}>
              喜欢收藏
            </div>
          </div>
        </div>
        {renderFeed()}
      </div>
    </div>
  );
};
export default My;
