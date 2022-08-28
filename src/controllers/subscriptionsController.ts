import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
  Context,
} from "aws-lambda";
import { SubscriptionApplicationService } from "../application/subscriptions/SubscriptionApplicationService.js";
import { SubscriptionRepository } from "../infra/dynamoDB/SubscriptionRepository.js";
import { responseNotFound, responseOk } from "./helpers/responseHelper.js";

export async function index(
  event: APIGatewayProxyEventV2,
  _context: Context
): Promise<APIGatewayProxyResultV2> {
  const { userName } = event.pathParameters as { userName: string };

  // TODO: implement user model
  if (userName !== "yantene") {
    return responseNotFound(`User ${userName} is not found.`);
  }

  // TODO: use di container
  const subscriptionRepository = new SubscriptionRepository();

  const subscriptionApplicationService = new SubscriptionApplicationService(
    subscriptionRepository
  );

  const subscriptions = await subscriptionApplicationService.findAll(userName);

  return responseOk({
    subscriptions,
  });
}
