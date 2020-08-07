import ActivityStore from "../stores/activityStore";
import UserStore from "../stores/userStore";
import { createContext } from "react";
import { configure } from "mobx";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import GroupStore from "./groupStore";
import ProfileStore from "./profileStore";
import PostStore from "./postStore";
import CommentStore from "./commentStore";

configure({ enforceActions: "always" });

export class RootStore {
  activityStore: ActivityStore;
  userStore: UserStore;
  commonStore: CommonStore;
  modalStore: ModalStore;
  groupStore: GroupStore;
  profileStore: ProfileStore;
  postStore: PostStore;
  commentStore: CommentStore;

  constructor() {
    this.activityStore = new ActivityStore(this);
    this.userStore = new UserStore(this);
    this.commonStore = new CommonStore(this);
    this.modalStore = new ModalStore(this);
    this.groupStore = new GroupStore(this);
    this.profileStore = new ProfileStore(this);
    this.postStore = new PostStore(this);
    this.commentStore = new CommentStore(this);
  }
}

export const RootStoreContext = createContext(new RootStore());
