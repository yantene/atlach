import { createTables, deleteTables } from "../../../database/setup.js";
import {
  Subscription,
  SubscriptionData,
} from "../../domain/models/subscriptions/Subscription.js";
import { client } from "./client.js";
import { SubscriptionRepository } from "./SubscriptionRepository.js";

describe("SubscriptionRepository", () => {
  beforeEach(async () => {
    await deleteTables(client);
    await createTables(client);
  });

  afterEach(async () => {
    await deleteTables(client);
  });

  const gitHubFeedSubscriptionData: SubscriptionData = {
    userName: "yantene",
    name: "GitHub yantene feed",
    uri: "https://github.com/yantene.atom",
  };

  const youTubeFeedSubscriptionData: SubscriptionData = {
    userName: "yantene",
    uri: "https://www.youtube.com/feeds/videos.xml?channel_id=UC2_DskaA_cJ3T2IB3g1MddA",
    name: "YouTube yantene feed",
  };

  describe("static toItem()", () => {});

  describe("static toSubscription()", () => {});

  describe("save()", () => {
    it("should return a true value", async () => {
      const subscriptionRepository = new SubscriptionRepository();

      const createdSubscription = new Subscription(gitHubFeedSubscriptionData);

      const result = await subscriptionRepository.save(createdSubscription);

      expect(result).toBeTruthy();
    });
  });

  describe("find()", () => {
    it("should return what saved", async () => {
      const subscriptionRepository = new SubscriptionRepository();

      const createdSubscription = new Subscription(gitHubFeedSubscriptionData);

      await subscriptionRepository.save(createdSubscription);

      const foundSubscription = await subscriptionRepository.find(
        gitHubFeedSubscriptionData.userName,
        gitHubFeedSubscriptionData.name
      );

      expect(createdSubscription).toStrictEqual(foundSubscription);
    });

    it("should return null when no item matching the condition exists", async () => {
      const subscriptionRepository = new SubscriptionRepository();

      const foundSubscription = await subscriptionRepository.find(
        gitHubFeedSubscriptionData.userName,
        gitHubFeedSubscriptionData.name
      );

      expect(foundSubscription).toBeNull();
    });
  });

  describe("findAll()", () => {
    it("should return what saved", async () => {
      const subscriptionRepository = new SubscriptionRepository();

      const userName = "john";

      const gitHubFeedSubscription = new Subscription({
        ...gitHubFeedSubscriptionData,
        userName,
      });
      const youTubeFeedSubscription = new Subscription({
        ...youTubeFeedSubscriptionData,
        userName,
      });

      await subscriptionRepository.save(gitHubFeedSubscription);
      await subscriptionRepository.save(youTubeFeedSubscription);

      const foundSubscriptions = await subscriptionRepository.findAll(userName);

      expect(foundSubscriptions.sort()).toStrictEqual(
        [gitHubFeedSubscription, youTubeFeedSubscription].sort()
      );
    });
  });
});
