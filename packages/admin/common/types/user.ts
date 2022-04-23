import { ArticleType } from "./article";

export type UserType = {
  _id: string;
  userName: string;
  avatarUrl: string;
  description: string;
  followings: Array<string>;
  followers: Array<string>;
  postIds: Array<string>;
  posts: Array<ArticleType>;
  nickName: string;
  ban: boolean;
};
