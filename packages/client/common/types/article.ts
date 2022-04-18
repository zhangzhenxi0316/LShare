import { UserType } from "./user";

export type ArticleType = {
  title: string;
  image: Array<string>;
  content: string;
  diggCount: number;
  author: UserType;
  isDigg: boolean;
};

