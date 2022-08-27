import { deleteTables } from "../database/setup.js";
import { client } from "../src/infra/dynamoDB/client.js";

const logs = await deleteTables(client);

// eslint-disable-next-line no-console
console.log(logs);
