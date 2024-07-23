**<ins>Authentication Module Documentation</ins>**

This documentation covers the authentication module which handles user registration, login, token refreshing, and logout functionalities in the system. The following files are involved in this module:
- auth.controller.js
- auth.queries.js
- auth.routes.js
- auth.validation.schema.js
- auth.token.jwt_helper.js

1. **auth.controller.js**
This file contains the controllers for handling authentication-related requests.

`Register a new user (registerUser):`
- Validates the request body using authSchema.
- Checks if the user already exists using the confirmUser query.
- Hashes the password using bcrypt.
- Adds the new user to the database using the addUser query.
- Generates an access token and a refresh token.
- Responds with a success message and the tokens.

`Login a user (loginUser):`
- Validates the request body using loginSchema.
- Checks if the user exists using the confirmUser query.
- Compares the provided password with the stored hashed password.
- Generates an access token and a refresh token.
- Responds with the tokens.

`Refresh the access token (refreshToken):`
- Validates the presence of the refresh token in the request body.
- Verifies the refresh token using verifyRefreshToken.
- Generates a new access token and refresh token.
- Responds with the new tokens.

`Logout a user (logout):`
- Validates the presence of the refresh token in the request body.
- Verifies the refresh token using verifyRefreshToken.
- Deletes the refresh token from the Redis cache.
- Responds with a success status.

2. **auth.queries.js**
This file contains the SQL queries used in the authentication module.
- addUser: Inserts a new user into the users table and returns the user's ID.

3. **auth.routes.js**
This file defines the routes for authentication-related requests.
- POST /register: Registers a new user.
- POST /login: Logs in a user.
- POST /refresh-token: Refreshes the access token.
- DELETE /logout: Logs out a user, protected by verifyAccessToken middleware.

4. **auth.validation.schema.js**
This file defines the validation schemas using Joi for request body validation.
- authSchema: Validates the registration request body.

5. **auth.token.jwt_helper.js**
This file contains helper functions for handling JWT operations.
- signAccessToken: Signs an access token.
- verifyAccessToken: Middleware to verify the access token.
- signRefreshToken: Signs a refresh token.
- verifyRefreshToken: Verifies the refresh token.

**Conclusion**
This documentation provides an overview of each component and their functions within the authentication module. Ensure to update the environment variables and database configurations as needed for proper functionality.






