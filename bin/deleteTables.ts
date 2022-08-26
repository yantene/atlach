import { deleteTables } from "../database/setup.js";
import { client } from "../src/infra/dynamoDB/client.js";

deleteTables(client);
