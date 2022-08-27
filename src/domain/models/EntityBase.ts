import { Temporal } from "@js-temporal/polyfill";

export interface BaseModelData {
  createdAt?: Temporal.Instant;
  updatedAt?: Temporal.Instant;
}

export abstract class BaseModel {
  #createdAt: Temporal.Instant;

  #updatedAt: Temporal.Instant;

  constructor(data: BaseModelData) {
    const timestamp = Temporal.Now.instant();

    this.#createdAt = data.createdAt ?? timestamp;
    this.#updatedAt = data.updatedAt ?? timestamp;
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
