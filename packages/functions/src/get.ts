import AWS from "aws-sdk";
import { Table } from "sst/node/table";

import { APIGatewayProxyHandlerV2, APIGatewayProxyHandlerV2WithJWTAuthorizer } from "aws-lambda";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const user: APIGatewayProxyHandlerV2 = async (event: any) => {
  const params: any = {
    TableName: Table.Users.tableName,
    Key: {
      email: event.pathParameters.email, // The id of the note from the path
    },
  };

  try {
    const result = await dynamoDb.get(params).promise();
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
