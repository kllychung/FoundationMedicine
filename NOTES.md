
**Assumptions**
1. The application to be tested was a serverless api. There were some references to "Submit the form" in 3 of the 4 test cases which could have been indicative of a front end. Adding a front end stack and described tests is doable. The tests, however,would have been handling a lot(front end + api + dynamo db) which is not good practice.

2. Login and register user endpoints are POST endpoints with content type "application/x-www-form-urlencoded". Assumed that "Submit the form" refers to the form inside a POST request. Used application/x-www-form-urlencoded over form data.

3. Token used is JWT token

**Hurdles encountered**
Figuring out which authorizer to use and integrating it with login to return a token was the hard part of the assignment. 

**Approach**
Creating stack approach
The serverless api is created from a serverless stack template for dynamoDB. Overall sst is a very neat tool which helps bypass a lot of AWS config setup especially around IAM role.  

Test framework approach
* After using sst to provision AWS resources and getting familiar with aws sdk library, writing the tests in javascript made more sense. Mocha was used to fixture tests as it comes with plenty of options for tests runs and accurate reporting. Reporting & tracing was another requirement of this assignment. Chai handles tests assertion. 
* All api tests and all test dependencies are under a separate folder called tests. Dockerfile included for CI/CD integration.


