import Feed from "components/Feed/Feed";
import React from "react";
import "./my.scss";
const test = [
  [
    {
      title: "测试问哈那个大的风",
      image: [
        "https://p16.topbuzzcdn.com/img/tos-alisg-i-0000/ecd2c346b475478eabdf1fe6c48ee04a~0x640.image",
      ],
      content: "xxxxxxxxxxxxx",
      diggCount: 1,
      author: {
        name: "zzx",
        avatarUrl:
          "https://p16.topbuzzcdn.com/thumb/user-avatar-alisg/7f6f52da535c76d7ca7c9811b79b6e50",
        description: "xxx",
      },
      isDigg: false,
    },
    {
      title: "测试问哈那个大的风",
      image: [
        "https://p16.topbuzzcdn.com/img/tos-alisg-i-0000/ecd2c346b475478eabdf1fe6c48ee04a~0x640.image",
      ],
      content: "xxxxxxxxxxxxx",
      diggCount: 1,
      author: {
        name: "zzx",
        avatarUrl:
          "https://p16.topbuzzcdn.com/thumb/user-avatar-alisg/7f6f52da535c76d7ca7c9811b79b6e50",
        description: "xxx",
      },
      isDigg: false,
    },
    {
      title: "测试问哈那个大的风",
      image: [
        "https://p16.topbuzzcdn.com/img/tos-alisg-i-0000/ecd2c346b475478eabdf1fe6c48ee04a~0x640.image",
      ],
      content: "xxxxxxxxxxxxx",
      diggCount: 1,
      author: {
        name: "zzx",
        avatarUrl:
          "https://p16.topbuzzcdn.com/thumb/user-avatar-alisg/7f6f52da535c76d7ca7c9811b79b6e50",
        description: "xxx",
      },
      isDigg: false,
    },
    {
      title: "测试问哈那个大的风",
      image: [
        "https://p16.topbuzzcdn.com/img/tos-alisg-i-0000/ecd2c346b475478eabdf1fe6c48ee04a~0x640.image",
      ],
      content: "xxxxxxxxxxxxx",
      diggCount: 1,
      author: {
        name: "zzx",
        avatarUrl:
          "https://p16.topbuzzcdn.com/thumb/user-avatar-alisg/7f6f52da535c76d7ca7c9811b79b6e50",
        description: "xxx",
      },
      isDigg: false,
    },
  ],
];
const userInfo = {
  name: "zzx",
  avatarUrl:
    "https://p16.topbuzzcdn.com/img/user-avatar-alisg/fda9153a63d648b42edeafb3fefd185c~1200x0.image",
  description: "hi gus im girls",
};
const My = () => {
  return (
    <div className="my-container">
      <div className="top-area">
        <div className="user-info">
          <img className="user-avatar" src={userInfo.avatarUrl}></img>
          <div className="user-name">{userInfo.name}</div>
          <div className="user-desc">{userInfo.description}</div>
        </div>
      </div>
      <div className="tool">
        <div className="editor-user-info">Edit User Info </div>
      </div>
      <div className="user-post">
        <Feed articleGroups={test} />
      </div>
    </div>
  );
};
export default My;
