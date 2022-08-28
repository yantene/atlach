import type { Subscription } from "./Subscription";

export interface SubscriptionRepositoryInterface {
  save(subscription: Subscription): Promise<boolean>;

  find(userName: string, name: string): Promise<Subscription | null>;

  findAll(userName: string): Promise<Subscription[]>;
}
