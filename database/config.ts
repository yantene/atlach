import YAML from "yaml";
import type { DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";
import fs from "fs/promises";

const databaseConfigFile = await fs.readFile("./database/config.yml", "utf-8");
export const databaseConfig = YAML.parse(databaseConfigFile) as {
  [env: string]: {
    connection: DynamoDBClientConfig;
  };
};
