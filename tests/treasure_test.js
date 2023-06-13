import { expect } from 'chai';
import { USERS } from './Users.js';
import { loginUser, retrieveTreasure } from './api.js'
import { addUserToDb, deleteUserFromDb } from './dynamodb.js'

describe("Treasure endpoint tests", async () => {
    const registeredUser = USERS['registeredUser']

    before(async () => {
        await addUserToDb(registeredUser)
    });

    it("User can access protected resource using valid token", async () => {
        //Retrieve token from login
        const postResponse = await loginUser(registeredUser)
        const token = postResponse.data.access_token

        //Use token to access protected resource
        const treasureResponse = await retrieveTreasure(token)
        expect(treasureResponse.status).to.equal(200)
        expect(treasureResponse.data).to.include("Private treasure")
    })

    //Delete user after test run
    after(async () => {
        await deleteUserFromDb(registeredUser.email)
    });
})