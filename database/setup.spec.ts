import type { DynamoDB } from "@aws-sdk/client-dynamodb";
import { client } from "../src/infra/dynamoDB/client.js";
import { createTables, deleteTables, listTables } from "./setup.js";

async function listTablesArray(givenClient: DynamoDB): Promise<string[]> {
  const array: string[] = [];

  // eslint-disable-next-line no-restricted-syntax
  for await (const tableName of listTables(givenClient)) {
    array.push(tableName);
  }

  return array;
}

it("Deleting tables will result in zero tables and zero tables and creating tables will result in more tables than zero", async () => {
  await deleteTables(client);

  const tableListAfterDeleteTables1 = await listTablesArray(client);
  expect(tableListAfterDeleteTables1).toHaveLength(0);

  await createTables(client);

  const tableListAfterCreateTables = await listTablesArray(client);
  expect(tableListAfterCreateTables.length).toBeGreaterThan(0);

  await deleteTables(client);

  const tableListAfterDeleteTables2 = await listTablesArray(client);
  expect(tableListAfterDeleteTables2).toHaveLength(0);
});
