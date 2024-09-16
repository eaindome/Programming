# To-Do List API Documentation
`Version: 1.0`
`Last Updated: September 15, 2024`

## Overview
This is a RESTful API for managing a To-Do List application, supporting functionalities like user registration, login, task creation, task retrieval, task filtering by status, priority management, and OAuth authentication with Google.

The API uses JSON Web Tokens (JWT) for authentication and supports OAuth for third-party login with Google.

## Table of Contents
1. Project Structure
2. Getting Started
3. Authentication
    - Register
    - Login
    - OAuth Authentication
    - Logout
4. Tasks
    - Create Task
    - Get Task
    - Task Filtering
    - Task Prioritization
5. Error Handling
6. Security
7. Testing
8. Tools and Technologies
9. How to Run the Application

### Project Structure
This is a project structure:
to-do-list-api/
│
├── config/
│   ├── database.js          # Database connection setup
│   └── jwt.js               # JWT configuration and secret management
│
├── controllers/
│   ├── authController.js    # Handles authentication logic
│   ├── taskController.js    # Handles task-related operations
│
├── middleware/
│   └── authMiddleware.js    # JWT authentication middleware
│
├── models/
│   ├── User.js              # User model definition
│   └── Task.js              # Task model definition
│
├── routes/
│   ├── authRoutes.js        # Routes for authentication endpoints
│   ├── taskRoutes.js        # Routes for task endpoints
│   └── userRoutes.js        # Routes for user endpoints (optional)
│
├── tests/
│   ├── auth.test.js         # Tests for authentication
│   ├── task.test.js         # Tests for task management
│
├── utils/
│   └── helpers.js           # Utility functions (e.g., password hashing)
│
├── .env                     # Environment variables
├── .gitignore
├── app.js                   # Application setup and configuration
├── package.json
├── README.md
└── server.js                # Entry point of the application

***NOTE:*** Structure not used, this is a proposed structure though.

### Getting Started
#### Prerequisites
* Node.js and npm installed
* Fastify framework
* PostgreSQL or any other relational database supported by Sequelize
* Passport.js for OAuth
* JWT for authentication
* Jest and Supertest for testing

### Installation
1. Clone the repository:
    - git clone https://github.com/your-repo/todo-list-api.git
    - cd todo-list-api

2. Install the dependencies:
    - npm install

3. Set up your environment variables by creating a .env file:
    - JWT_SECRET=your_jwt_secret
    - GOOGLE_CLIENT_ID=your_google_client_id
    - GOOGLE_CLIENT_SECRET=your_google_client_secret
    - DATABASE_URL=your_database_url

4. Run database migrations (if using Sequelize):
    - npx sequelize-cli db:migrate

5. Start the development server:
    - npm run dev

### Authentication
1. **Register**
    * Endpoint: `POST /api/auth/register`

    * Registers a new user with a username and password.

    * Request Body:
        {
            "username": "your_username",
            "password": "your_password"
        }
    * Response:
        - Success (201)
            {
                "id": 1,
                "username": "your_username",
                "createdAt": "2024-09-15T09:25:06.000Z"
            }
        - Error (400):
            {
                "message": "Username and password are required."
            }

2. **Login**
    * Endpoint: `POST /api/auth/login`

    * Logs in a registered user and returns a JWT token.

    * Request Body:
        {
            "username": "your_username",
            "password": "your_password"
        }
    * Response:
        - Success (200):
            {
                "message": "Login successful!",
                "token": "your_jwt_token"
            }
        - Error (401):
            {
                "message": "Invalid username or password."
            }

### OAuth Authentication
3. **Google Login**
    * Endpoint: `GET /api/auth/google`

    * Redirects the user to Google for authentication. After successful authentication, Google redirects back to the callback URL.

    * Google Callback Endpoint: `GET /api/auth/google/callback`
    
    * Response:
        - Success (200):
            {
                "message": "Successfully authenticated with Google"
            }
        - Failure (500):
            {
                "message": "Google Authentication failed"
            }

4. **Logout**
    * Endpoint: `POST /api/auth/logout`

    * Logs the user out by instructing the client to remove the JWT token.

    * Response:
        - Success (200):
            {
                "message": "Logout successful"
            }

### Tasks
5. **Create Task**
    * Endpoint: `POST /api/tasks`

    * Creates a new task for the authenticated user.

    * Request Body:
        {
            "title": "Buy groceries",
            "description": "Pick up milk, bread, and cheese",
            "priority": "medium"
        }
    * Response:
        - Success (201):
            {
                "id": 1,
                "title": "Buy groceries",
                "description": "Pick up milk, bread, and cheese",
                "priority": "medium",
                "status": "pending",
                "createdAt": "2024-09-15T09:25:06.000Z"
            }

6. **Get Task**
    * Endpoint: `GET /api/tasks/:id`

    * Fetches the details of a specific task.

    * Response:
        - Success (200):
            {
                "id": 1,
                "title": "Buy groceries",
                "description": "Pick up milk, bread, and cheese",
                "priority": "medium",
                "status": "pending"
            }

7. **Task Filtering**
    * Endpoint: `GET /api/tasks`

    * Allows filtering tasks by status.

    * Query Parameters:
        - status: pending or completed
    * Response:
        - Success (200):
            [
                {
                    "id": 1,
                    "title": "Buy groceries",
                    "status": "completed"
                },
                {
                    "id": 2,
                    "title": "Clean the house",
                    "status": "pending"
                }
            ]

8. **Task Prioritization**
    * Endpoint: PUT /api/tasks/:id

    * Allows updating task priority (low, medium, high).

    * Request Body:
        {
            "priority": "high"
        }
    * Response:
        - Success (200):
            {
                "id": 1,
                "title": "Buy groceries",
                "priority": "high"
            }

9. **Error Handling**
    * All error responses follow a consistent structure:

    * Example:
        {
            "message": "Error message",
            "details": "Additional error details"
        }

### Security
- **JWT Authentication:** Secure your routes by ensuring the client sends a valid JWT token in the Authorization header for protected endpoints.
- **OAuth**: Google OAuth integration allows users to sign in with their Google accounts.

### Testing
Testing is implemented using Jest and Supertest. To run the test suite:
    - npm run test

### Tools and Technologies
- **Node.js**
- **Fastify**: Fast and low-overhead web framework.
- **Passport.js**: OAuth and session management.
- **Sequelize**: ORM for handling database operations.
- **JWT**: Authentication and security.

### How to Run the Application
1. Clone the repository and navigate to the project directory.
2. Install the dependencies:
    - npm install
3. Set up your environment variables in the .env file.
4. Run the application in development mode:
    - npm run dev
5. Use Postman or curl to test the API endpoints.

This documentation provides a general guide to understanding and using the To-Do List API. For more details, refer to the source code or contact the development team.