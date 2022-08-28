import { Temporal } from "@js-temporal/polyfill";

export interface SubscriptionData {
  userName: string;
  name: string;
  uri: string;

  createdAt?: Temporal.Instant;
  updatedAt?: Temporal.Instant;
}

export class Subscription {
  #userName: string;

  #name: string;

  #uri: string;

  #createdAt: Temporal.Instant;

  #updatedAt: Temporal.Instant;

  constructor(data: SubscriptionData) {
    this.#userName = data.userName;
    this.#name = data.name;
    this.#uri = data.uri;

    const timestamp = Temporal.Now.instant();

    this.#createdAt = data.createdAt ?? timestamp;
    this.#updatedAt = data.updatedAt ?? timestamp;
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

  get createdAt(): Temporal.Instant {
    return this.#createdAt;
  }

  set createdAt(createdAt: Temporal.Instant) {
    this.#createdAt = createdAt;
  }

  get updatedAt(): Temporal.Instant {
    return this.#updatedAt;
  }

  set updatedAt(updatedAt: Temporal.Instant) {
    this.#updatedAt = updatedAt;
  }
}
