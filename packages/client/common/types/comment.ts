import { UserType } from "./user";

export type CommentItemType = {
  _id: string;
  content: string;
  addTime: number;
  user: UserType;
};
