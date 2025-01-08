import { Post } from "./post";
import User from "./user";

export type SearchItem = 
  | 
    {
      type: 'post';
      item: Post
    }
  |
    {
      type: 'user';
      item: User
    }