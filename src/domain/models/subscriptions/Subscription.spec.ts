import { Temporal } from "@js-temporal/polyfill";
import { Subscription, SubscriptionData } from "./Subscription.js";

describe("Subscription", () => {
  const gitHubFeedSubscription: SubscriptionData = {
    userName: "yantene",
    name: "GitHub yantene feed",
    uri: "https://github.com/yantene.atom",
  };

  describe("userName", () => {
    it("should return the value passed in the constructor", () => {
      const subscription = new Subscription(gitHubFeedSubscription);

      expect(subscription.userName).toBe(gitHubFeedSubscription.userName);
    });

    it("should set the received value to the instance variable 'userName'", () => {
      const subscription = new Subscription(gitHubFeedSubscription);

      const newUserName = "mitenaizo";

      subscription.userName = newUserName;

      expect(subscription.userName).toBe(newUserName);
    });
  });

  describe("name", () => {
    it("should return the value passed in the constructor", () => {
      const subscription = new Subscription(gitHubFeedSubscription);

      expect(subscription.name).toBe(gitHubFeedSubscription.name);
    });

    it("should set the received value to the instance variable 'name'", () => {
      const subscription = new Subscription(gitHubFeedSubscription);

      const newName = "YouTube yantene feed";

      subscription.name = newName;

      expect(subscription.name).toBe(newName);
    });
  });

  describe("uri", () => {
    it("should return the value passed in the constructor", () => {
      const subscription = new Subscription(gitHubFeedSubscription);

      expect(subscription.uri).toBe(gitHubFeedSubscription.uri);
    });

    it("should set the received value to the instance variable 'uri'", () => {
      const subscription = new Subscription(gitHubFeedSubscription);

      const newUri =
        "https://www.youtube.com/feeds/videos.xml?channel_id=UC2_DskaA_cJ3T2IB3g1MddA";

      subscription.uri = newUri;

      expect(subscription.uri).toBe(newUri);
    });
  });

  describe("createdAt", () => {
    it("should return the value passed in the constructor", () => {
      const timestamp = Temporal.Instant.fromEpochSeconds(1234567890);

      const subscription = new Subscription({
        ...gitHubFeedSubscription,
        createdAt: timestamp,
      });

      expect(subscription.createdAt).toStrictEqual(timestamp);
    });

    it("should return a default value when no value is given in the constructor", () => {
      const subscription = new Subscription(gitHubFeedSubscription);

      expect(subscription.createdAt).not.toBeUndefined();
    });

    it("should set the received value to the instance variable 'createdAt'", () => {
      const timestamp = Temporal.Instant.fromEpochSeconds(1234567890);

      const subscription = new Subscription(gitHubFeedSubscription);

      subscription.createdAt = timestamp;

      expect(subscription.createdAt).toStrictEqual(timestamp);
    });
  });

  describe("updatedAt", () => {
    it("should return the value passed in the constructor", () => {
      const timestamp = Temporal.Instant.fromEpochSeconds(1234567890);

      const subscription = new Subscription({
        ...gitHubFeedSubscription,
        updatedAt: timestamp,
      });

      expect(subscription.updatedAt).toStrictEqual(timestamp);
    });

    it("should return a default value when no value is given in the constructor", () => {
      const subscription = new Subscription(gitHubFeedSubscription);

      expect(subscription.updatedAt).not.toBeUndefined();
    });

    it("should set the received value to the instance variable 'updatedAt'", () => {
      const timestamp = Temporal.Instant.fromEpochSeconds(1234567890);

      const subscription = new Subscription(gitHubFeedSubscription);

      subscription.updatedAt = timestamp;

      expect(subscription.updatedAt).toStrictEqual(timestamp);
    });
  });
});
