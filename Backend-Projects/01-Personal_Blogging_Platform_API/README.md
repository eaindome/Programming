# Personal Blogging Platform API

## Overview
The Personal Blogging Platform API is a RESTful backend service that allows users to **create, read, update, and delete (CRUD)** articles. This API is built using *Fastify* and *PostgreSQL*, and follows a modular architecture to ensure scalability, maintainability, and ease of testing.


## Table of Contents
1. Project Structure
2. Technology Stack
3. Getting Started
4. Environment Configuration
5. API Endpoints
6. Testing
7. Running the Application
8. Contributing
9. License

### Project Structure
``` Project Structure
blogging-platform-api/
│
├── config/
│   └── database.js          # Database connection setup
│
├── controllers/
│   └── articleController.js  # Logic for handling article routes
│
├── models/
│   └── Article.js           # Article model definition
│
├── routes/
│   └── articleRoutes.js     # Article-related routes
│
├── tests/
│   └── articleRoutes.test.js # Unit tests for article routes
│
├── server.js                # Entry point to the application
└── app.js                   # Application setup and configuration
```

### Technology Stack
- **Node.js**: JavaScript runtime environment.
- **Fastify**: Web framework for Node.js focusing on performance and low overhead.
- **Sequelize**: Promise-based ORM for Node.js.
- **PostgreSQL**: Relational database management system.
- **Jest**: Testing framework for JavaScript.
- **Supertest**: HTTP assertions for testing API endpoints.

### Getting Started
#### Prerequisites
- **Node.js**: Ensure you have Node.js installed on your machine.
- **PostgreSQL**: Install PostgreSQL and set up a database for the project.

#### Installation
1. Clone the repositiory:
   1. `git clone https://github.com/yourusername/blogging-platform-api.git`
   2. `cd blogging-platform-api`
2. Install the dependencies:
   1. `npm install`
3. Set up the database
   1. Create a PostgreSQL database
   ``` DatabaseManager
        CREATE DATABASE blogging_platform;
        CREATE USER blog_user WITH ENCRYPTED PASSWORD 'yourpassword';
        GRANT ALL PRIVILEGES ON DATABASE blogging_platform TO blog_user;
    ```
4. Configure environment variables
   1. Create a .env file in the root directory and add your configuration:
   ``` .env
        DATABASE_NAME=blogging_platform
        DATABASE_USER=blog_user
        DATABASE_PASSWORD=yourpassword
        DATABASE_HOST=localhost

   ```

### Environment Configuration
The project supports different environments (development, test, production). You can specify the environment using the ***NODE_ENV*** environment variable.
- **Development Environment**: Uses the *blogging_platform* database.
- **Test Environment**: Uses the *blogging_platform_test* database to run unit tests.

##### Switching Environments
You can switch environments by setting the NODE_ENV variable: `NODE_ENV=test npm test`

### API Endpoints
#### Base URL
The API is accessible at *http://localhost:3000/*.

#### Routes
1. **GET /articles**
Retrieve a list of all articles.

**Response**:
- ***200 OK***: Returns an array of articles.

2. **GET /articles**/
Retrieve a specific article by its ID.

**Response**:
- ***200 OK:*** Returns the article object.
- ***404 Not Found***: If the article does not exist.

3. **POST /articles**
Create a new article.

**Request Body**:
    ```json
        {
        "title": "Sample Article",
        "content": "This is a sample article.",
        "published": true
        }
    ```
**Response**:
- ***201 Created***: Returns the created article object.

4. **PUT /articles**/
Update an existing article by its ID.

**Request Body**:
    ```json
        {
        "title": "Updated Article Title",
        "content": "This is the updated content."
        }
    ```

**Response**:
- ***200 OK:*** Returns the updated article object.
- ***404 Not Found***: If the article does not exist.

5. **DELETE /articles**/
Delete an article by its ID.

**Response**:
- ***204 No Content***: If the deletion is successful.
- ***404 Not Found***: If the article does not exist.

### Testing
Unit tests are written using Jest and Supertest to ensure the functionality of the API. The tests cover CRUD operations for the articles.

#### Running Tests
To run the tests, use the following command:
    ```bash
        npm test
    ```
The tests will run in a separate test environment using the *blogging_platform_test* database.

### Running the Application
#### Start the Development Server
To start the server in development mode:
    ```bash
        node server.js 
    ```
The server will start and listen on http://localhost:3000/.

### Contributing
If you'd like to contribute to this project, please fork the repository, create a new branch, and submit a pull request with your changes. Make sure to write tests for any new features or changes.

<!-- ### License -->
