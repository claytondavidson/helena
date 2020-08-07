import { RootStore } from "./rootStore";
import { action, computed, observable, runInAction } from "mobx";
import { IPost } from "../models/post";
import agent from "../api/agent";

const LIMIT = 5;

export default class PostStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable
  postRegistry = new Map();

  @observable
  post: IPost | null = null;

  @observable
  initialLoading = false;

  @observable
  postCount = 0;

  @observable
  page = 0;

  @computed
  get totalPages() {
    return Math.ceil(this.postCount / LIMIT);
  }

  @action setPage = (page: number) => {
    this.page = page;
  };

  @computed
  get posts() {
    return Array.from(this.postRegistry.values());
  }

  @action
  loadPosts = async (group_id: string) => {
    this.initialLoading = true;
    try {
      const postsEnvelope = await agent.Posts.list(group_id, LIMIT, this.page);
      const { posts, postCount } = postsEnvelope;
      runInAction("loading posts", () => {
        posts.forEach((post: IPost) => {
          post.createdAt = new Date(post.createdAt);
          this.postRegistry.set(post.id, post);
        });
        this.postCount = postCount;
        this.initialLoading = false;
      });
    } catch (error) {
      runInAction("loading posts error", () => {
        this.initialLoading = false;
      });
      console.log(error);
    }
  };

  @action
  clearPosts = async () => {
    this.postRegistry.clear();
    this.page = 0;
  };

  @action
  loadPost = async (id: string) => {
    let post = this.getPost(id);
    if (post) {
      this.post = post;
      return post;
    } else {
      this.initialLoading = true;
      try {
        post = await agent.Posts.details(id);
        runInAction("getting post", () => {
          post.dateCreated = new Date(post.dateCreated);
          this.post = post;
          this.postRegistry.set(post.id, post);
          this.initialLoading = false;
        });
        return post;
      } catch (error) {
        runInAction("getting post error", () => {
          this.initialLoading = false;
        });
        console.log(error);
      }
    }
  };

  getPost = (id: string) => {
    return this.postRegistry.get(id);
  };
}
