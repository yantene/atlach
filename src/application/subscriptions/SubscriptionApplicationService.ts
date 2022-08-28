import type { Subscription } from "../../domain/models/subscriptions/Subscription.js";
import type { SubscriptionRepositoryInterface } from "../../domain/models/subscriptions/SubscriptionRepositoryInterface.js";

export class SubscriptionApplicationService {
  #subscriptionRepository: SubscriptionRepositoryInterface;

  constructor(subscriptionRepository: SubscriptionRepositoryInterface) {
    this.#subscriptionRepository = subscriptionRepository;
  }

  async findAll(userName: string): Promise<Subscription[]> {
    const subscriptions = await this.#subscriptionRepository.findAll(userName);

    return subscriptions;
  }
}
