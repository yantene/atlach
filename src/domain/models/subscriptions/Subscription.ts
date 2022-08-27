import { BaseModel, BaseModelData } from "../EntityBase.js";

export interface SubscriptionData extends BaseModelData {
  userName: string;
  name: string;
  uri: string;
}

export class Subscription extends BaseModel {
  #userName: string;

  #name: string;

  #uri: string;

  constructor(data: SubscriptionData) {
    super(data);

    this.#userName = data.userName;
    this.#name = data.name;
    this.#uri = data.uri;
  }

  get userName(): string {
    return this.#userName;
  }

  set userName(userName: string) {
    this.#userName = userName;
  }

  get name(): string {
    return this.#name;
  }

  set name(name: string) {
    this.#name = name;
  }

  get uri(): string {
    return this.#uri;
  }

  set uri(uri: string) {
    this.#uri = uri;
  }
}
