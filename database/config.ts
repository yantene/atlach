import type { DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";

export const databaseConfig: {
  [env: string]: {
    connection: DynamoDBClientConfig;
  };
} = {
  production: {
    connection: {
      region: "ap-northeast-1",
    },
  },
  test: {
    connection: {
      endpoint: "http://scylla:8000",
      region: "DUMMY",
      credentials: {
        accessKeyId: "DUMMY",
        secretAccessKey: "DUMMY",
      },
    },
  },
  development: {
    connection: {
      endpoint: "http://scylla:8000",
      region: "DUMMY",
      credentials: {
        accessKeyId: "DUMMY",
        secretAccessKey: "DUMMY",
      },
    },
  },
};
