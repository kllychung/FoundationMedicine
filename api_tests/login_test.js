import axios from 'axios';
import { expect } from 'chai';
import AWS from 'aws-sdk';
import { USERS, LOGIN_POST_OPTIONS, REGISTER_POST_OPTIONS, DYNAMO_TABLE_NAME } from './constants.js';

describe("Login endpoint tests", async () => {
    const registeredUser = USERS['registeredUser']

    const loginPostOption = {
        ...LOGIN_POST_OPTIONS
    };
    AWS.config.update({ region: 'us-east-2' });
    const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

    before(async () => {
        const registerPostOption = {
            ...REGISTER_POST_OPTIONS,
            data: new URLSearchParams(registeredUser)
        };
        //register user
        await axios.request(registerPostOption)
    });

    it("Successful login returns valid token", async () => {
        loginPostOption['data'] = new URLSearchParams(registeredUser)

        //Fill login form with valid login info
        const postResponse = await axios.request(loginPostOption)

        //Verify api returns valid token
        expect(postResponse.data).to.include.keys("access_token")
    })

    it("Unregistered user cannot login", async () => {
        const unregisteredUser = USERS["unregisteredUser"]
        loginPostOption['data'] = new URLSearchParams(unregisteredUser)
        let error, response;
        //Fill login form with valid login info
        try {
            response = await axios.request(loginPostOption)
        }
        catch (err) {
            error = err
        }
        expect(error.response.status).to.equal(401)
        expect(error.response.data.error_message).to.equal("unauthorized")
    })

    after(async () => {
        // const deleteUserEndpoint = DELETE_ENDPOINT_URL + registeredUser.email;
        // const deleteOptions = {
        //     method: 'DELETE',
        //     url: deleteUserEndpoint,
        // };
        // await axios.request(deleteOptions)

        after(async () => {
            await dynamoDbClient.delete({
                TableName: DYNAMO_TABLE_NAME,
                Key: {
                    email: registeredUser.email
                }
            }).promise()
        });
    });
})