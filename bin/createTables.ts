import { createTables } from "../database/setup.js";
import { client } from "../src/infra/dynamoDB/client.js";

createTables(client);
