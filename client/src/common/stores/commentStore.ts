import { RootStore } from "./rootStore";
import { action, computed, observable, runInAction } from "mobx";
import { CommentFormValues, IComment } from "../models/comment";
import agent from "../api/agent";
import { toast } from "react-toastify";

const LIMIT = 8;

export default class CommentStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable
  commentRegistry = new Map();

  @observable
  comment: IComment | null = null;

  @observable
  initialLoading = false;

  @observable
  commentCount = 0;

  @observable
  page = 0;

  @observable
  submitting = false;

  @computed
  get totalPages() {
    return Math.ceil(this.commentCount / LIMIT);
  }

  @action setPage = (page: number) => {
    this.page = page;
  };

  @computed
  get comments() {
    return Array.from(this.commentRegistry.values());
  }

  @action
  loadComments = async (post_id: string) => {
    this.initialLoading = true;
    try {
      const commentsEnvelope = await agent.Comments.list(
        post_id,
        LIMIT,
        this.page
      );
      const { comments, commentCount } = commentsEnvelope;
      runInAction("loading comments", () => {
        comments.forEach((comment: IComment) => {
          comment.createdAt = new Date(comment.createdAt);
          this.commentRegistry.set(comment.id, comment);
        });
        this.commentCount = commentCount;
        this.initialLoading = false;
      });
    } catch (error) {
      runInAction("loading comments error", () => {
        this.initialLoading = false;
      });
      console.log(error);
    }
  };

  @action
  clearComments = async () => {
    this.commentRegistry.clear();
    this.page = 0;
  };

  @action
  createComment = async (postId: string, comment: CommentFormValues) => {
    this.submitting = true;
    try {
      await agent.Comments.create(postId, comment);
      runInAction("creating comment", () => {
        this.commentRegistry.set(comment.id, comment);
        this.submitting = false;
      });
    } catch (error) {
      runInAction("creating comment error", () => {
        this.submitting = false;
      });
      toast.error("Problem submitting data");
      console.log(error);
    }
  };

  @action
  createReply = async (commentId: string, reply: CommentFormValues) => {
    this.submitting = true;
    try {
      await agent.Comments.create(commentId, reply);
      runInAction("creating reply to comment", () => {
        this.commentRegistry.set(reply.id, reply);
        this.submitting = false;
      });
    } catch (error) {
      runInAction("creating reply to comment error", () => {
        this.submitting = false;
      });
      toast.error("Problem submitting data");
      console.log(error);
    }
  };
}
