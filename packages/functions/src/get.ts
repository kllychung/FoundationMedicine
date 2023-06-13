import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { getUserFromDb } from "./dynamo";

export const user: APIGatewayProxyHandlerV2 = async (event: any) => {
  try {
    const result = await getUserFromDb(event.pathParameters.email)
    if (!result.Item) {
      throw new Error("Item not found.");
    }
    return {
      statusCode: 200,
      body: JSON.stringify(result.Item)
    }
  }
  catch (err) {
    return {
      statusCode: 500,
      body: "Internal server error"
    }
  }
};

export const treasure: APIGatewayProxyHandlerV2 = async (event: any) => {
  return {
    statusCode: 200,
    body: JSON.stringify("Private treasure")
  }
};
