import type { DynamoDB } from "@aws-sdk/client-dynamodb";
import { schemas } from "./schema.js";

export function createTables(client: DynamoDB) {
  Object.entries(schemas).forEach(async ([logicalTableName, properties]) => {
    const output = await client.createTable({
      ...properties,
      TableName: `${logicalTableName}-${
        process.env["NODE_ENV"] ?? "development"
      }`,
    });

    console.log(output);
  });
}

export function deleteTables(client: DynamoDB) {
  Object.keys(schemas).forEach(async (logicalTableName) => {
    const output = await client.deleteTable({
      TableName: `${logicalTableName}-${
        process.env["NODE_ENV"] ?? "development"
      }`,
    });

    console.log(output);
  });
}
