import { deleteTables } from "../database/setup";
import { client } from "../src/infra/dynamoDB/client";

deleteTables(client);
