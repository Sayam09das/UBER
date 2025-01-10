# Express.js Backend for User Registration and Authentication

This project is a backend application built with Express.js that provides user registration and authentication functionality. It uses MongoDB for data storage and includes features such as password hashing, JWT token generation, and input validation.

The backend serves as a foundation for applications requiring user management and secure authentication. It offers a RESTful API for user registration, with built-in security measures to protect user data. The application is designed with a modular structure, making it easy to extend and maintain.

Key features include:
- User registration with email and password
- Password hashing using bcrypt
- JWT token generation for authentication
- Input validation using express-validator
- MongoDB integration using Mongoose
- CORS support for cross-origin requests
- Error handling middleware

## Repository Structure

```
Backend/
├── app.js                 # Main application setup
├── server.js              # Server entry point
├── controllers/
│   └── user.controller.js # User-related request handlers
├── db/
│   └── db.js              # Database connection setup
├── models/
│   └── user.Model.js      # User data model
├── routes/
│   └── user.routes.js     # User-related route definitions
├── services/
│   └── user.service.js    # User-related business logic
└── package.json           # Project dependencies and scripts
```

## Usage Instructions

### Installation

1. Ensure you have Node.js (v14 or later) and npm installed.
2. Clone the repository and navigate to the project directory.
3. Install dependencies:
   ```
   npm install
   ```
4. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   DB_CONNECT=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

### Getting Started

1. Start the server:
   ```
   npm start
   ```
2. The server will be running on `http://localhost:3000` (or the port specified in your `.env` file).

### API Endpoints

- `POST /users/register`: Register a new user
  - Request body:
    ```json
    {
      "name": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "password": "securepassword"
    }
    ```
  - Response:
    ```json
    {
      "token": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "user": {
        "_id": "XXXXXXXXXXXXXXXXXXXXXXXX",
        "name": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com"
      }
    }
    ```

### Configuration

- `PORT`: The port on which the server will run (default: 3000)
- `DB_CONNECT`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation

### Testing & Quality

To run tests (if implemented):
```
npm test
```

### Troubleshooting

1. Connection Issues:
   - Problem: Unable to connect to the database
   - Error message: "Error connecting to DB: ..."
   - Solution: 
     1. Check if MongoDB is running
     2. Verify the `DB_CONNECT` string in your `.env` file
     3. Ensure network connectivity to the database server

2. Registration Failures:
   - Problem: User registration fails
   - Error message: "Invalid JSON format" or validation errors
   - Solution:
     1. Check the request body format
     2. Ensure all required fields are provided
     3. Verify that the email is unique and not already registered

### Debugging

To enable debug mode, set the `DEBUG` environment variable:
```
DEBUG=app:* npm start
```

Log files are typically located in the project root directory or a `logs/` subdirectory.

## Data Flow

The request data flow in this application follows these steps:

1. Client sends a POST request to `/users/register` with user data
2. The request is received by the Express server (app.js)
3. CORS middleware processes the request
4. JSON parsing middleware processes the request body
5. The request is routed to the user registration endpoint (user.routes.js)
6. Input validation middleware checks the request data (user.routes.js)
7. The user controller handles the registration logic (user.controller.js)
8. The user service creates the user in the database (user.service.js)
9. The user model hashes the password and generates a JWT token (user.Model.js)
10. The response with the token and user data is sent back to the client

```
Client -> Server -> CORS -> JSON Parser -> Router -> Validator -> Controller -> Service -> Model -> Database
   ^                                                                                                   |
   |                                                                                                   |
   +--------------------------------------------------------------------------------------------------+
```

Note: Ensure proper error handling at each step of the flow to provide meaningful feedback to the client.