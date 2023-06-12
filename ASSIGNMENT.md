#Project:

Create an automating project which involves the testing of a simple application that uses a DynamoDB database to store and retrieve user information.

The application has two main functionalities:

1 Registration: allows a user to register by providing their name, email, and password. The registration API creates a new item in the DynamoDB table with the user information.
2 Login: allows a registered user to log in by providing their email and password. The login API queries the DynamoDB table to find the user with the provided email and password and returns a token that the user can use to access protected resources.
Instructions

Your task is to write a suite of automated tests to validate the functionality of the application. You should use Java/Javascript and Rest API to create the tests.

Use a build tool (e.g., Maven or Gradle) to manage your dependencies and run the tests.

##Requirements:

Write a test case and test steps to verify that a new user can register successfully. The test should:

Fill in the registration form with valid user information.
Submit the form.
Verify that the registration was successful by checking that the user's information is now stored in the DynamoDB table.
Write a test to verify that a registered user can log in successfully. The test should:

Fill in the login form with valid user information.
Submit the form.
Verify that the login was successful by checking that the API returns a valid token.
Write a test to verify that an unregistered user cannot log in. The test should:

Fill in the login form with invalid user information (i.e., email and password that do not match any registered user).
Submit the form.
Verify that the login was unsuccessful by checking that the API returns an error message.
Write a test to verify that a registered user can access protected resources with a valid token. The test should:

Log in with valid user information.
Get a protected resource using the API and the token obtained from the login.
Verify that the resource is retrieved successfully and has the expected content.
Submission:

Create git repository and email it to Catherine Barna at cbarna@foundationmedicine.com

Include a README file with any relevant information about the project, such as assumptions you made or difficulties you encountered.

Optionally, include any additional files or documentation that you think might be useful for the hiring manager to understand your approach and your results.

Be sure to provide test cases and any relevant information on datasets you may use.

Goals:

Use Java / Javascript per your preference.
Use Rest API calls to interact with micro-services and capture the response.
Use coding best practices.
Provide a concise report for the coverage and traceability
Objective:

Ability to define Test strategy and test scripts
Comfort level in Java / Javascript
Design and define the scope
Willingness to explore
Drive to think out of the box