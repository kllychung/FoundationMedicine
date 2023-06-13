import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import 'dotenv/config'
import { extractParams } from "./helper";
import { getUserFromDb } from "./dynamo";
import { generateAccessToken } from "./auth0";

const headers = {
  "Content-Type": "application/json",
};

const isAuthenticatedUser = async (email: string, password: string) => {
  const results = await getUserFromDb(email);
  return results.Item ? results.Item.password === password ?
    true : false : false
}

export const main: APIGatewayProxyHandlerV2 = async (event: any) => {
  const { email, password } = extractParams(event.body);
  let statusCode = 200, body;
  try {
    const isAuthorized = await isAuthenticatedUser(email, password)
    if (isAuthorized) {
      const access_token = await generateAccessToken()
      body = { "access_token": access_token }
    }
    else {
      statusCode = 401;
      body = { "error_message": "unauthorized" }
    }
  }
  catch (err) {
    statusCode = 500;
    body = { "error_message": "internal server error" }
  }
  return {
    body: JSON.stringify(body),
    statusCode: statusCode,
    headers: headers
  }
};
