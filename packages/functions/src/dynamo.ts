import AWS from 'aws-sdk'
import { Table } from "sst/node/table";

AWS.config.update({ region: 'us-east-2' });
const dynamoClient = new AWS.DynamoDB.DocumentClient()
const tableParams = { TableName: Table.Users.tableName }

const addUserToDb = async (user: object) => {
    const params = {
        ...tableParams,
        Item: user
    }
    return await dynamoClient.put(params).promise()
}

const deleteUserFromDb = async (email: string) => {
    const params = {
        ...tableParams,
        Key: {
            email
        }
    }
    return await dynamoClient.delete(params).promise()
}

const getUserFromDb = async (email: string) => {
    const params = {
        ...tableParams,
        Key: {
            email
        }
    }
    return await dynamoClient.get(params).promise()
}

export { addUserToDb, deleteUserFromDb, getUserFromDb }
