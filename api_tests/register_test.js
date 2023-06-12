import axios from 'axios';
import { expect } from 'chai';
import AWS from 'aws-sdk';
import { USERS, REGISTER_ENPOINT_URL, DYNAMO_TABLE_NAME } from './constants.js';

describe("Register post endpoints tests", async () => {
    const userToBeRegsistered = USERS['userToBeRegsistered']
    AWS.config.update({ region: 'us-east-2' });
    const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

    it("user info is created in dynamo db", async () => {

        const postOption = {
            method: 'POST',
            url: REGISTER_ENPOINT_URL,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: new URLSearchParams(userToBeRegsistered)
        };
        //Fill registration with valid info and submit form
        await axios.request(postOption)

        //Make a get request to retrieve user from dynamo db
        const getUserResponse = await dynamoDbClient.get({
            TableName: DYNAMO_TABLE_NAME,
            Key: {
                email: userToBeRegsistered.email,
            }
        }).promise()

        expect(userToBeRegsistered).to.eql(getUserResponse.Item);
    })

    after(async () => {
        await dynamoDbClient.delete({
            TableName: DYNAMO_TABLE_NAME,
            Key: {
                email: userToBeRegsistered.email
            }
        }).promise()
    });
})