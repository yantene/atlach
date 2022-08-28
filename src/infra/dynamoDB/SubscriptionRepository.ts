import type { DynamoDB } from "@aws-sdk/client-dynamodb";
import { Temporal } from "@js-temporal/polyfill";
import { Subscription } from "../../domain/models/subscriptions/Subscription.js";
import type { SubscriptionRepositoryInterface } from "../../domain/models/subscriptions/SubscriptionRepositoryInterface.js";
import { client as defaultClient } from "./client.js";

type Item = Record<
  "userName" | "name" | "uri" | "createdAt" | "updatedAt",
  { S: string }
>;

export class SubscriptionRepository implements SubscriptionRepositoryInterface {
  #client: DynamoDB;

  #tableName: string;

  constructor(client?: DynamoDB) {
    this.#client = client ?? defaultClient;
    this.#tableName = `atlach-subscriptions-${
      process.env["NODE_ENV"] ?? "development"
    }`;
  }

  static toItem(subscription: Subscription): Item {
    return {
      userName: { S: subscription.userName },
      name: { S: subscription.name },
      uri: { S: subscription.uri },
      createdAt: { S: subscription.createdAt.epochNanoseconds.toString() },
      updatedAt: { S: subscription.updatedAt.epochNanoseconds.toString() },
    };
  }

  static toSubscription(item: Item): Subscription {
    return new Subscription({
      userName: item.userName.S,
      name: item.name.S,
      uri: item.uri.S,
      createdAt: new Temporal.Instant(BigInt(item.createdAt.S)),
      updatedAt: new Temporal.Instant(BigInt(item.updatedAt.S)),
    });
  }

  async save(subscription: Subscription): Promise<boolean> {
    const result = await this.#client.putItem({
      TableName: this.#tableName,
      Item: SubscriptionRepository.toItem(subscription),
    });

    // cf. https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Programming.Errors.html
    return result.$metadata.httpStatusCode === 200;
  }

  async find(userName: string, name: string): Promise<Subscription | null> {
    const output = await this.#client.getItem({
      TableName: this.#tableName,
      Key: {
        userName: { S: userName },
        name: { S: name },
      },
    });

    if (output.Item == null) return null;

    return SubscriptionRepository.toSubscription(output.Item as Item);
  }

  async findAll(userName: string): Promise<Subscription[]> {
    const output = await this.#client.query({
      ExpressionAttributeValues: {
        ":userName": { S: userName },
      },
      KeyConditionExpression: "userName = :userName",
      TableName: this.#tableName,
    });

    const items = output.Items;

    return (
      items?.map((item) =>
        SubscriptionRepository.toSubscription(item as Item)
      ) ?? []
    );
  }
}
