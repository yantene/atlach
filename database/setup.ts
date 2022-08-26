import type { DynamoDB } from "@aws-sdk/client-dynamodb";
import { schemas } from "./schema.js";

export function createTables(client: DynamoDB): void {
  Object.entries(schemas).forEach(async ([logicalTableName, properties]) => {
    await client.createTable({
      ...properties,
      TableName: `${logicalTableName}-${
        process.env["NODE_ENV"] ?? "development"
      }`,
    });
  });
}

export function deleteTables(client: DynamoDB): void {
  Object.keys(schemas).forEach(async (logicalTableName) => {
    await client.deleteTable({
      TableName: `${logicalTableName}-${
        process.env["NODE_ENV"] ?? "development"
      }`,
    });
  });
}
