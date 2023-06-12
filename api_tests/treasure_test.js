import axios from 'axios';
import { expect } from 'chai';
import AWS from 'aws-sdk';
import {
    USERS, DYNAMO_TABLE_NAME, LOGIN_POST_OPTIONS,
    REGISTER_POST_OPTIONS, TREASURE_ENPOINT_URL
} from './constants.js';

describe("Treasure endpoint tests", async () => {
    const registeredUser = USERS['registeredUser']
    const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

    before(async () => {
        const registerPostOption = {
            ...REGISTER_POST_OPTIONS,
            data: new URLSearchParams(registeredUser)
        };
        //register user
        await axios.request(registerPostOption)
    });

    it("User can access protected resource using valid token", async () => {
        const loginPostOption = {
            ...LOGIN_POST_OPTIONS
        };

        loginPostOption['data'] = new URLSearchParams(registeredUser)

        //Get & store token from login response 
        const postResponse = await axios.request(loginPostOption)
        const token = postResponse.data.access_token

        const getTreasureOption = {
            method: 'GET',
            url: TREASURE_ENPOINT_URL,
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };

        //Access protected resource
        const getTreasureResponse = await axios.request(getTreasureOption)
        expect(getTreasureResponse.status).to.equal(200)
        expect(getTreasureResponse.data).to.include("Private treasure")
    })

    after(async () => {
        await dynamoDbClient.delete({
            TableName: DYNAMO_TABLE_NAME,
            Key: {
                email: registeredUser.email
            }
        }).promise()
    });

})