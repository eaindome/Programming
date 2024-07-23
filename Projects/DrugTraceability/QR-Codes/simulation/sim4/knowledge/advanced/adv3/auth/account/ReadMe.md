**<ins>Account Module Documentation</ins>**

**Overview**
The account module manages user account operations such as updating account information. It consists of three main components: the controller (account.controller.js), the queries (account.queries.js), and the routes (account.routes.js).

**File Descriptions**

## account.controller.js
This file contains the logic for handling account-related requests. It uses a PostgreSQL connection pool to execute queries.

`updateAccount`
The updateAccount function updates the user account information in the database. It expects a JSON request body containing the new account information and the username retrieved from the request token.

## account.queries.js
This file contains the SQL queries related to account operations.

`createAccount`
The createAccount query updates the account information for a given username in the users table.

## account.routes.js
This file defines the routes for account operations. It uses Express Router to handle HTTP requests and JWT middleware to verify access tokens.

`/add-account`
The /add-account route allows authenticated users to update their account information. It uses the updateAccount controller method and the verifyAccessToken middleware to ensure the user is authenticated.

**Testing**
*route*
http://localhost:8000/account/add-account
*Headers*:
Authorisation: Bearer <AccessToken>


**Conclusion**
The account module provides a robust and secure way to manage user account information. By leveraging Express, PostgreSQL, and JWT, it ensures that only authenticated users can update their account details. This documentation provides an overview of the module's components and demonstrates how to integrate it into an Express application.














