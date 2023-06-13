import AWS from 'aws-sdk'

AWS.config.update({ region: 'us-east-2' });
const dynamoClient = new AWS.DynamoDB.DocumentClient()

const USER_TABLE = 'sst-user-app-Users';

const addUserToDb = async (user) => {
    const params = {
        TableName: USER_TABLE,
        Item: user
    }
    return await dynamoClient.put(params).promise()
}

const deleteUserFromDb = async (email) => {
    const params = {
        TableName: USER_TABLE,
        Key: {
            email
        }
    }
    return await dynamoClient.delete(params).promise()
}

const getUserFromDb = async (email) => {
    const params = {
        TableName: USER_TABLE,
        Key: {
            email
        }
    }
    return await dynamoClient.get(params).promise()
}

export { addUserToDb, deleteUserFromDb, getUserFromDb }
