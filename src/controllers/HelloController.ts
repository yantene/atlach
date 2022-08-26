import type {
  APIGatewayProxyEvent,
  Context,
  APIGatewayProxyResultV2,
} from "aws-lambda";
import { HelloService } from "../services/HelloService.js";

export async function index(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResultV2> {
  const helloService = new HelloService("Sakura");

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      event,
      context,
      hello: helloService.hello(),
    }),
  };
}
