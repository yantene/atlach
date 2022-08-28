import type { CreateTableCommandInput } from "@aws-sdk/client-dynamodb";

export const schemas: {
  [logicalTableName: string]: Omit<CreateTableCommandInput, "TableName">;
} = {
  "atlach-subscriptions": {
    AttributeDefinitions: [
      {
        AttributeName: "userName",
        AttributeType: "S",
      },
      {
        AttributeName: "name",
        AttributeType: "S",
      },
    ],
    KeySchema: [
      {
        AttributeName: "userName",
        KeyType: "HASH",
      },
      {
        AttributeName: "name",
        KeyType: "RANGE",
      },
    ],
    BillingMode: "PAY_PER_REQUEST",
  },
};
