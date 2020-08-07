import axios, { AxiosResponse } from "axios";
import { IActivity } from "../models/activity";
import { IUser, IUserFormValues } from "../models/user";
import { history } from "../..";
import { toast } from "react-toastify";
import { IGroupsEnvelope } from "../models/group";
import { IProfile } from "../models/profile";
import { IPostsEnvelope } from "../models/post";
import { CommentFormValues, ICommentsEnvelope } from "../../common/models/comment";

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("jwt");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(undefined, (error) => {
  if (error.message === "Network Error" && !error.response) {
    toast.error("Network error");
  }
  const { status, data, config } = error.response;
  if (status === 404) {
    history.push("/notfound");
  }
  if (
    status === 400 &&
    config.method === "get" &&
    data.errors.hasOwnProperty("id")
  ) {
    history.push("/notfound");
  }
  if (status === 500) {
    toast.error("Server error");
  }
  throw error.response;
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),
};

const Groups = {
  list: (limit?: number, page?: number): Promise<IGroupsEnvelope> =>
    requests.get(`/groups?limit=${limit}&offset=${page ? page * limit! : 0}`),
  details: (id: string) => requests.get(`/groups/${id}`),
};

const Activities = {
  list: (): Promise<IActivity[]> => requests.get("/activities"),
  details: (id: string) => requests.get(`/activities/${id}`),
  create: (activity: IActivity) => requests.post("/activities", activity),
  update: (activity: IActivity) =>
    requests.put(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.del(`/activities/${id}`),
};

const User = {
  current: (): Promise<IUser> => requests.get("/user"),
  login: (user: IUserFormValues): Promise<IUser> =>
    requests.post(`/user/login`, user),
  register: (user: IUserFormValues): Promise<IUser> =>
    requests.post(`/user/register`, user),
};

const Profiles = {
  get: (username: string): Promise<IProfile> =>
    requests.get(`/profiles/${username}`),
};

const Posts = {
  list: (
    group_id: string,
    limit?: number,
    page?: number
  ): Promise<IPostsEnvelope> =>
    requests.get(
      `posts/${group_id}/posts?limit=${limit}&offset=${
        page ? page * limit! : 0
      }`
    ),
  details: (id: string) => requests.get(`/posts/${id}`),
};

const Comments = {
  list: (
    post_id: string,
    limit?: number,
    page?: number
  ): Promise<ICommentsEnvelope> =>
    requests.get(
      `comments/${post_id}/comments?limit=${limit}&offset=${
        page ? page * limit! : 0
      }`
    ),
  create: (postId: string, commentFormValues: CommentFormValues) =>
    requests.post(`/comments/${postId}/comment`, commentFormValues),
};

export default {
  Groups,
  Activities,
  User,
  Profiles,
  Posts,
  Comments,
};
