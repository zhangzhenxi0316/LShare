import Feed from "components/Feed/Feed";
import Wrapper from "components/Wrapper/Wrapper";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./home.scss";
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
const Home = () => {
  useEffect(() => {
    const element = document.querySelector(".container");
    element?.scrollTo({ top: 0 });
  }, []);
  return (
    <div>
      <Feed articleGroups={test} />
    </div>
  );
};
export default Home;
