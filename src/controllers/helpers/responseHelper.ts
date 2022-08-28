import type { APIGatewayProxyResultV2 } from "aws-lambda";

export function responseOk(body: unknown): APIGatewayProxyResultV2 {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(body),
  };
}

export function responseCreated(
  body: unknown,
  location: string
): APIGatewayProxyResultV2 {
  return {
    statusCode: 201,
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Location: location,
    },
    body: JSON.stringify(body),
  };
}

export function responseNoContent(): APIGatewayProxyResultV2 {
  return {
    statusCode: 204,
  };
}

export function responseNotFound(body: unknown): APIGatewayProxyResultV2 {
  return {
    statusCode: 404,
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(body),
  };
}
