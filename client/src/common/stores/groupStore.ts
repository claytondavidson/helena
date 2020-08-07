import { RootStore } from "./rootStore";
import { action, computed, observable, runInAction } from "mobx";
import { IGroup } from "../../common/models/group";
import agent from "../api/agent";

const LIMIT = 5;

export default class GroupStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable
  groupRegistry = new Map();

  @observable
  group: IGroup | null = null;

  @observable
  initialLoading = false;

  @observable
  groupCount = 0;

  @observable
  page = 0;

  @computed
  get totalPages() {
    return Math.ceil(this.groupCount / LIMIT);
  }

  @action setPage = (page: number) => {
    this.page = page;
  };

  @action
  groups() {
    return Array.from(this.groupRegistry.values());
  }

  @computed
  get groupsByDate() {
    return this.groupGroupsByDate(Array.from(this.groupRegistry.values()));
  }

  groupGroupsByDate(groups: IGroup[]) {
    const sortedByDate = groups.sort(
      (a, b) => a.dateCreated.getTime() - b.dateCreated.getTime()
    );
    return Object.entries(
      sortedByDate.reduce((groups, group) => {
        const date = group.dateCreated.toISOString().split("T")[0];
        groups[date] = groups[date] ? [...groups[date], group] : [group];
        return groups;
      }, {} as { [key: string]: IGroup[] })
    );
  }

  @action
  loadGroups = async () => {
    this.initialLoading = true;
    try {
      const groupsEnvelope = await agent.Groups.list(LIMIT, this.page);
      const { groups, groupCount } = groupsEnvelope;
      runInAction("loading groups", () => {
        groups.forEach((group) => {
          group.dateCreated = new Date(group.dateCreated);
          this.groupRegistry.set(group.id, group);
        });
        this.groupCount = groupCount;
        this.initialLoading = false;
      });
    } catch (error) {
      runInAction("loading groups error", () => {
        this.initialLoading = false;
      });
      console.log(error);
    }
  };

  @action
  loadGroup = async (id: string) => {
    let group = this.getGroup(id);
    if (group) {
      this.group = group;
      return group;
    } else {
      this.initialLoading = true;
      try {
        group = await agent.Groups.details(id);
        runInAction("getting group", () => {
          group.dateCreated = new Date(group.dateCreated);
          this.group = group;
          this.groupRegistry.set(group.id, group);
          this.initialLoading = false;
        });
        return group;
      } catch (error) {
        runInAction("getting group error", () => {
          this.initialLoading = false;
        });
        console.log(error);
      }
    }
  };

  getGroup = (id: string) => {
    return this.groupRegistry.get(id);
  };
}
