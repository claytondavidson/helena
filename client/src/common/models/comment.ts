export interface ICommentsEnvelope {
  comments: IComment[];
  commentCount: number;
}

export interface IComment {
  id: string;
  parentId: string;
  postId: string;
  body: string;
  createdAt: Date;
  username: string;
  displayName: string;
  image: string;
  children: IComment[];
}

export class CommentFormValues {
  id?: string = undefined;
  parentId?: string = undefined;
  postId?: string;
  body: string = "";
  createdAt?: Date;
  username: string = "";
  displayName: string = "";
  image: string = "";

  constructor(init?: any) {
    Object.assign(this, init);
  }
}
