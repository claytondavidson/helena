import { observable, action, computed, runInAction } from "mobx";
import "mobx-react-lite/batchingForReactDom";
import { SyntheticEvent } from "react";
import { IActivity } from "../models/activity";
import { history } from "../..";
import { toast } from "react-toastify";
import agent from "../api/agent";
import { RootStore } from "./rootStore";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";

export default class ActivityStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable
  activityRegistry = new Map();

  @observable
  activity: IActivity | null = null;

  @observable
  initialLoading = false;

  @observable
  submitting = false;

  @observable
  target = "";

  @observable.ref
  hubConnection: HubConnection | null = null;

  @action
  createHubConnection = () => {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl("http://localhost:5000/chat", {
        accessTokenFactory: () => this.rootStore.commonStore.token!,
      })
      .configureLogging(LogLevel.Information)
      .build();

    this.hubConnection
      .start()
      .then(() => console.log(this.hubConnection!.state))
      .catch((error) => console.log("Error establishing connection", error));

    this.hubConnection.on("ReceiveActivityComment", (comment) => {
      runInAction(() => {
        this.activity!.activityComments.push(comment);
      });
    });
  };

  @action
  stopHubConnection = () => {
    this.hubConnection!.stop();
  };

  @action
  addComment = async (values: any) => {
    values.activityId = this.activity!.id;
    try {
      console.log(values);
      await this.hubConnection!.invoke("SendActivityComment", values);
    } catch (error) {
      console.log(error);
    }
  };

  @computed
  get activitiesByDate() {
    return this.groupActivitiesByDate(
      Array.from(this.activityRegistry.values())
    );
  }

  groupActivitiesByDate(activities: IActivity[]) {
    const sortedByDate = activities.sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );
    return Object.entries(
      sortedByDate.reduce((activities, activity) => {
        const date = activity.date.toISOString().split("T")[0];
        activities[date] = activities[date]
          ? [...activities[date], activity]
          : [activity];
        return activities;
      }, {} as { [key: string]: IActivity[] })
    );
  }

  @action
  loadActivities = async () => {
    this.initialLoading = true;
    try {
      const activities = await agent.Activities.list();
      runInAction("loading activities", () => {
        activities.forEach((activity) => {
          activity.date = new Date(activity.date);
          this.activityRegistry.set(activity.id, activity);
        });
        this.initialLoading = false;
      });
    } catch (error) {
      runInAction("loading activities error", () => {
        this.initialLoading = false;
      });
      console.log(error);
    }
  };

  @action
  loadActivity = async (id: string) => {
    let activity = this.getActivity(id);
    if (activity) {
      this.activity = activity;
      return activity;
    } else {
      this.initialLoading = true;
      try {
        activity = await agent.Activities.details(id);
        runInAction("getting activity", () => {
          activity.date = new Date(activity.date);
          this.activity = activity;
          this.activityRegistry.set(activity.id, activity);
          this.initialLoading = false;
        });
        return activity;
      } catch (error) {
        runInAction("getting activity error", () => {
          this.initialLoading = false;
        });
        console.log(error);
      }
    }
  };

  getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  };

  @action
  clearActivity = () => {
    this.activity = null;
  };

  @action
  createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.create(activity);
      runInAction("creating activity", () => {
        this.activityRegistry.set(activity.id, activity);
        this.submitting = false;
      });
      history.push(`/activities/${activity.id}`);
    } catch (error) {
      runInAction("creating activity error", () => {
        this.submitting = false;
      });
      toast.error("Problem submitting data");
      console.log(error);
    }
  };

  @action
  editActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.update(activity);
      runInAction("editing activity", () => {
        this.activityRegistry.set(activity.id, activity);
        this.activity = activity;
        this.submitting = false;
      });
      history.push(`/activities/${activity.id}`);
    } catch (error) {
      runInAction("editing activity error", () => {
        this.submitting = false;
      });
      console.log(error);
    }
  };

  @action
  deleteActivity = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Activities.delete(id);
      runInAction("deleting activity", () => {
        this.activityRegistry.delete(id);
        this.submitting = false;
        this.target = "";
      });
    } catch (error) {
      runInAction("deleting activity error", () => {
        this.submitting = false;
        this.target = "";
      });
      console.log(error);
    }
  };
}
