import { UserType } from "./user";

export type ArticleType = {
  _id: string;
  title: string;
  covers: Array<string>;
  content: string;
  diggCount: number;
  author: UserType;
  isDigg: boolean;
};

