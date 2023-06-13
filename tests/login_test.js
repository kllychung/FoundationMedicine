import { expect } from 'chai';
import { addUserToDb, deleteUserFromDb } from './dynamodb.js'
import { USERS } from './Users.js';
import { loginUser } from './api.js'

describe("Login endpoint tests", async () => {
    const registeredUser = USERS['registeredUser']

    //Register use before test can use it for login
    before(async () => {
        await addUserToDb(registeredUser)
    });

    it("Successful login returns valid token", async () => {
        //Fill login form with valid login info
        const postResponse = await loginUser(registeredUser)

        //Verify api returns valid token
        expect(postResponse.data).to.include.keys("access_token")
    })

    it("Unregistered user cannot login", async () => {
        const unregisteredUser = USERS["unregisteredUser"]
        let error, response;

        //Fill login form with valid login info
        try {
            response = await loginUser(unregisteredUser)
        }
        catch (err) {
            error = err
        }
        //Verify unauthorized user cannot login
        expect(error.response.status).to.equal(401)
        expect(error.response.data.error_message).to.equal("unauthorized")
    })

    //Delete user after test run
    after(async () => {
        await deleteUserFromDb(registeredUser.email)
    });
})