import type {
  CreateTableCommandOutput,
  DeleteTableCommandOutput,
  DynamoDB,
  ListTablesCommandOutput,
} from "@aws-sdk/client-dynamodb";
import { schemas } from "./schemas.js";

const tableSuffix = process.env["NODE_ENV"] ?? "development";

export async function createTables(
  client: DynamoDB
): Promise<CreateTableCommandOutput[]> {
  return Promise.all(
    Object.entries(schemas).map(([logicalTableName, properties]) =>
      client.createTable({
        ...properties,
        TableName: `${logicalTableName}-${tableSuffix}`,
      })
    )
  );
}

export async function* listTables(
  client: DynamoDB
): AsyncGenerator<string, void, undefined> {
  let last;

  while (true) {
    const response: ListTablesCommandOutput =
      // eslint-disable-next-line no-await-in-loop
      await client.listTables(last ? { ExclusiveStartTableName: last } : {});
    last = response.LastEvaluatedTableName;

    yield* response.TableNames?.filter((tableName) =>
      tableName.endsWith(`-${tableSuffix}`)
    ) ?? [];

    if (last == null) {
      break;
    }
  }
}

export async function deleteTables(
  client: DynamoDB
): Promise<DeleteTableCommandOutput[]> {
  const logs: DeleteTableCommandOutput[] = [];

  // eslint-disable-next-line no-restricted-syntax
  for await (const tableName of listTables(client)) {
    logs.push(
      await client.deleteTable({
        TableName: tableName,
      })
    );
  }

  return logs;
}
