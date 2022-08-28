import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { databaseConfig } from "../../../database/config.js";

export const client = new DynamoDB(
  databaseConfig[process.env["NODE_ENV"] ?? "development"]!.connection
);
