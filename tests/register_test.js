import { expect } from 'chai';
import { USERS } from './Users.js';
import { registerUser } from './api.js';
import { getUserFromDb, deleteUserFromDb } from './dynamodb.js';

describe("Register post endpoints tests", async () => {
    const userToBeRegsistered = USERS['userToBeRegsistered']

    it("user info is created in dynamo db after registration", async () => {
        //Fill registration with valid info and submit form
        await registerUser(userToBeRegsistered)

        //Make a get request to retrieve user from dynamo db
        const getUserResponse = await getUserFromDb(userToBeRegsistered.email)

        //verify info passed in equals info retrieved
        expect(userToBeRegsistered).to.eql(getUserResponse.Item);
    })

    after(async () => {
        await deleteUserFromDb(userToBeRegsistered.email)
    });
})