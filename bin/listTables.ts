import { listTables } from "../database/setup.js";
import { client } from "../src/infra/dynamoDB/client.js";

// eslint-disable-next-line no-restricted-syntax
for await (const tableName of listTables(client)) {
  // eslint-disable-next-line no-console
  console.log(tableName);
}
