import { IActivity } from "./activity";
import { IPost } from "./post";

export interface IGroupsEnvelope {
  groups: IGroup[];
  groupCount: number;
}

export interface IGroup {
  id: string;
  title: string;
  description: string;
  category: string;
  dateCreated: Date;
  coverPhoto?: string;
  members: IGroupMember[];
  posts: IPost[];
  events: IActivity[];
}

export interface IGroupMember {
  username: string;
  displayName: string;
  image: string;
  isOwner: boolean;
}
