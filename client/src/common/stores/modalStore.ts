import { RootStore } from "./rootStore";
import { action, observable } from "mobx";

export default class ModalStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable.shallow modal = {
    open: false,
    body: null,
    size: undefined,
  };

  @action openModal = (content: any, size: any) => {
    this.modal.open = true;
    this.modal.body = content;
    this.modal.size = size;
  };

  @action closeModal = () => {
    this.modal.open = false;
    this.modal.body = null;
  };
}
