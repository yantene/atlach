import type {
  APIGatewayProxyEvent,
  Context,
  APIGatewayProxyResultV2,
} from "aws-lambda";

export async function index(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResultV2> {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      event,
      context,
    }),
  };
}
