import AWS from "aws-sdk";
import { Table } from "sst/node/table";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const main: APIGatewayProxyHandlerV2 = async (event: any) => {
  const params = {
    TableName: Table.Users.tableName,
    Key: {
      email: event.pathParameters.email,
    },
  };
  await dynamoDb.delete(params).promise();
  return {
    statusCode: 200,
    body: JSON.stringify({ deleted: true }),
  };
};
