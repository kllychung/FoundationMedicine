# Project

This project has 2 main components:
* A serverless api named user-app using serverless-stack in AWS. The stack is made from AWS Lambda, API Gateway, DynamoDB, and Auth0. 
* API tests written using mocha, chai and axios.

## Project layout
1. **stacks/** — App Infrastructure <br />
This folder contains code describing the infrastructure of the serverless app. SST uses AWS CDK, to create the infrastructure.
2. **packages/functions/** — App Code <br />
This folder contains the code that gets run when API is invoked
4. **api_tests/** — Api tests<br />
This folder contains api tests 

## Getting Started

### Prerequisites
* Node installed
* AWS account with AWS CLI configured locally with AWS credentials
* An Auth0 account

### Setup
The user-app api is using Auth0 as an authorizer. So we will need to create a [JWT Authorizer in Auth0](https://auth0.com/blog/securing-aws-http-apis-with-jwt-authorizers/#Add-a-JWT-Authorizer-to-Your-API).

Once the JWT Authorizer is created, prepopulate Auth0 env variables in the .env 
````
AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=
AUTH0_URL=
````

## Commands

### `npm run dev`

Starts the Live Lambda Development environment.

### `npm run build`

Build your app and synthesize your stacks.

### `npm run deploy [stack]`

Deploy all your stacks to AWS. Or optionally deploy, a specific stack.

### `npm run remove [stack]`

Remove all your stacks and all of their resources from AWS. Or optionally removes, a specific stack.

## Documentation

Learn more about the SST.

- [Docs](https://docs.sst.dev/)
- [sst](https://docs.sst.dev/packages/sst)
    
