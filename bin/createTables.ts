import { createTables } from "../database/setup";
import { client } from "../src/infra/dynamoDB/client";

createTables(client);
