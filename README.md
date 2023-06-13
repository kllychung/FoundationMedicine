# Project

This project has 2 main components:

- A serverless api named user-app using serverless-stack in AWS. The stack is made from AWS Lambda, API Gateway, DynamoDB, and Auth0.
- API tests written using mocha, chai and axios.

## Project Layout

1. **stacks/** — App Infrastructure <br />
   This folder contains code describing the infrastructure of the serverless app. SST uses AWS CDK, to create the infrastructure.
2. **packages/functions/** — App Code <br />
   This folder contains the code that gets run when API is invoked
3. **tests/** — Api tests<br />
   This folder contains api tests

## Getting Started

### Prerequisites

- Node installed
- AWS account with AWS CLI configured locally with AWS credentials
- An Auth0 account

### Serverless App Setup

1. Download the starter code

```
git clone git@github.com:kllychung/FoundationMedicine.git
```

2. Install dependencies

```
npm install
```

3. The user-app api is using Auth0 as an authorizer. So we will need to create a [JWT Authorizer in Auth0](https://auth0.com/blog/securing-aws-http-apis-with-jwt-authorizers/#Add-a-JWT-Authorizer-to-Your-API).
   Once the JWT Authorizer is created, prepopulate Auth0 env variables in the .env

```
AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=
AUTH0_URL=
```

> Example: AUTH0_URL="https://<<Your_AUTH0_TENANT>>.us.auth0.com/oauth/token"

4. To create and run the stack<br />

- In a live lambda development environment &#8594;`npm run dev`
- Build your app and synthesize your stacks. &#8594;`npm run build`
- Deploy all your stacks to AWS. Or optionally deploy, a specific stack.. &#8594;`npm run deploy [stack]`
- Remove all your stacks and all of their resources from AWS. Or optionally removes, a specific stack. &#8594; `npm run remove [stack]`

> Note that is the stack is successfully created, the api url will output on the terminal

### API Tests Setup

Navigate to the project directory in your terminal.

```
cd tests
```

Install tests dependencies by running

```
npm install
```

The tests folder has a env variable, make sure to set it to your api variable

```
API_URL=
```

> example API_URL="https://<<YOUR_DOMAIN_EXAMPLE>>.us-east-2.amazonaws.com/"

#### Test run & reporting

To run tests locally

```
npm run test
```

To run tests in docker container

First build image

```
docker build -t "api-tests" .
```

To run tests, the container will need access AWS permissions.
On a linux local machine, tests can be run using docker by mounting aws config file(read only mount)

```
docker run -v ~/.aws:/root/.aws:ro "api-tests"
```

Each test run generates a html report under folder mochawesome-report
<img width="1262" alt="image" src="https://github.com/kllychung/FoundationMedicine/assets/39935361/4a470983-ec4e-4a56-9585-341dc3a8196f">

## Documentation

Learn more about the SST & Auth0.

- [Docs](https://docs.sst.dev/)
- [sst](https://docs.sst.dev/packages/sst)
- [Auth0](https://auth0.com/)
