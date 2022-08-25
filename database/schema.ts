import type { CreateTableCommandInput } from "@aws-sdk/client-dynamodb";
import YAML from "yaml";
import fs from "fs/promises";

const schemasFile = await fs.readFile("./database/schemas.yml", "utf-8");

export const schemas = YAML.parse(schemasFile) as {
  [logicalTableName: string]: Omit<CreateTableCommandInput, "TableName">;
};
