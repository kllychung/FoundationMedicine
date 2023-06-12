import AWS from "aws-sdk";
import { Table } from "sst/node/table";

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const Buffer = require('buffer/').Buffer
import { APIGatewayProxyHandlerV2 } from "aws-lambda";

export const main: APIGatewayProxyHandlerV2 = async (event: any) => {
  let body;
  let statusCode = 201;
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const decodedMsg = Buffer.from(event.body, "base64").toString();
    const userObj = Object.fromEntries(
      new URLSearchParams(decodedMsg)
    )
    const { name, email, password } = userObj;
    const params = {
      TableName: Table.Users.tableName,
      Item: {
        email: email,
        password: password,
        name: name,
      },
    };
    await dynamoDb.put(params).promise();
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
