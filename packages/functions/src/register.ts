import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { extractParams } from "./helper";
import { addUserToDb } from "./dynamo";

export const main: APIGatewayProxyHandlerV2 = async (event: any) => {
  let body;
  let statusCode = 201;
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const { name, email, password } = extractParams(event.body);
    await addUserToDb({ name, email, password });
    body = `${email} has successfully registered`;
  }
  catch (err: any) {
    statusCode = 500;
    body = err.message;
  }
  return {
    headers,
    statusCode,
    body: body
  };
};
