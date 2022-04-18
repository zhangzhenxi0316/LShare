import UserItem from "components/UserItem/UserItem";
import React from "react";
import "./followList.scss";
const test = [
  {
    name: "zzx",
    avatarUrl:
      "https://p16.topbuzzcdn.com/img/user-avatar-alisg/fda9153a63d648b42edeafb3fefd185c~1200x0.image",
    description: "hi gus im girls",
  },
  {
    name: "zzx",
    avatarUrl:
      "https://p16.topbuzzcdn.com/img/user-avatar-alisg/fda9153a63d648b42edeafb3fefd185c~1200x0.image",
    description: "hi gus im girls",
  },
  {
    name: "zzx",
    avatarUrl:
      "https://p16.topbuzzcdn.com/img/user-avatar-alisg/fda9153a63d648b42edeafb3fefd185c~1200x0.image",
    description: "hi gus im girls",
  },
  {
    name: "zzx",
    avatarUrl:
      "https://p16.topbuzzcdn.com/img/user-avatar-alisg/fda9153a63d648b42edeafb3fefd185c~1200x0.image",
    description: "hi gus im girls",
  },
  {
    name: "zzx",
    avatarUrl:
      "https://p16.topbuzzcdn.com/img/user-avatar-alisg/fda9153a63d648b42edeafb3fefd185c~1200x0.image",
    description: "hi gus im girls",
  },
  {
    name: "zzx",
    avatarUrl:
      "https://p16.topbuzzcdn.com/img/user-avatar-alisg/fda9153a63d648b42edeafb3fefd185c~1200x0.image",
    description: "hi gus im girls",
  },
  {
    name: "zzx",
    avatarUrl:
      "https://p16.topbuzzcdn.com/img/user-avatar-alisg/fda9153a63d648b42edeafb3fefd185c~1200x0.image",
    description: "hi gus im girls",
  },
  {
    name: "zzx",
    avatarUrl:
      "https://p16.topbuzzcdn.com/img/user-avatar-alisg/fda9153a63d648b42edeafb3fefd185c~1200x0.image",
    description: "hi gus im girls",
  },
  {
    name: "zzx",
    avatarUrl:
      "https://p16.topbuzzcdn.com/img/user-avatar-alisg/fda9153a63d648b42edeafb3fefd185c~1200x0.image",
    description: "hi gus im girls",
  },
  {
    name: "zzx",
    avatarUrl:
      "https://p16.topbuzzcdn.com/img/user-avatar-alisg/fda9153a63d648b42edeafb3fefd185c~1200x0.image",
    description: "hi gus im girls",
  },
  {
    name: "zzx",
    avatarUrl:
      "https://p16.topbuzzcdn.com/img/user-avatar-alisg/fda9153a63d648b42edeafb3fefd185c~1200x0.image",
    description: "hi gus im girls",
  },
  {
    name: "zzx",
    avatarUrl:
      "https://p16.topbuzzcdn.com/img/user-avatar-alisg/fda9153a63d648b42edeafb3fefd185c~1200x0.image",
    description: "hi gus im girls",
  },
  {
    name: "zzx",
    avatarUrl:
      "https://p16.topbuzzcdn.com/img/user-avatar-alisg/fda9153a63d648b42edeafb3fefd185c~1200x0.image",
    description: "hi gus im girls",
  },
];
const FollowList = () => {
  return (
    <div className="follow-list">
      {test.map((item) => {
        return <UserItem {...item} key={item.name} />;
      })}
    </div>
  );
};
export default FollowList;
