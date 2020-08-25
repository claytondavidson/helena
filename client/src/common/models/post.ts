import { IComment } from "./comment";

export interface IPostsEnvelope {
  posts: IPost[];
  postCount: number;
}

export interface IPost {
  group_id: string;
  id: string;
  title: string;
  body: string;
  votes: number;
  createdAt: Date;
  username: string;
  displayName: string;
  image: null;
  comments: IComment[];
}
