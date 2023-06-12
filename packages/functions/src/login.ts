import AWS from "aws-sdk";
import { Table } from "sst/node/table";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import 'dotenv/config'

const axios = require("axios").default;
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const auth0Params: any = {
  grant_type: 'client_credentials',
  client_id: process.env.AUTH0_CLIENT_ID,
  client_secret: process.env.AUTH0_CLIENT_SECRET,
  audience: process.env.AUTH0_AUDIENCE
}
const options = {
  method: 'POST',
  url: process.env.AUTH0_URL,
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  data: new URLSearchParams(auth0Params)
};

const headers = {
  "Content-Type": "application/json",
};

const generateAccessToken = async (): Promise<string> => {
  const responseBody: string = await axios.request(options).then(function (response: any) {
    return response.data.access_token;
  }).catch(function (error: any) {
    throw error;
  });
  return responseBody
}

const isAuthenticatedUser = async (email: string, password: string) => {
  const params: any = {
    TableName: Table.Users.tableName,
    Key: {
      email: email
    }
  };
  const results = await dynamoDb.get(params).promise();
  return results.Item ? results.Item.password === password ?
    true : false : false
}

export const main: APIGatewayProxyHandlerV2 = async (event: any) => {
  const decodedMsg = Buffer.from(event.body, "base64").toString();
  const userObj = Object.fromEntries(
    new URLSearchParams(decodedMsg)
  )
  const { email, password } = userObj;
  let statusCode;
  let body;
  try {
    const isAuthorized = await isAuthenticatedUser(email, password)
    if (isAuthorized) {
      statusCode = 200;
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
