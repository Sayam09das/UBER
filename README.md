# User Authentication and Management Backend

This project is a robust backend system for user authentication and management, built with Node.js and Express.js.

The backend provides a secure and scalable solution for user registration, login, profile management, and logout functionality. It utilizes JSON Web Tokens (JWT) for authentication, bcrypt for password hashing, and MongoDB for data storage. The system is designed with security in mind, implementing features such as token blacklisting and middleware-based authentication checks.

Key features include:
- User registration with email and password
- Secure login with JWT token generation
- User profile retrieval
- Logout functionality with token blacklisting
- Middleware for route protection
- MongoDB integration for data persistence
- Password hashing for enhanced security
- Cross-Origin Resource Sharing (CORS) support

This backend is ideal for applications requiring a solid foundation for user management and authentication, providing a RESTful API that can be easily integrated with various frontend technologies.

## Repository Structure

```
Backend/
├── app.js                 # Main application setup
├── server.js              # Server entry point
├── controllers/
│   └── user.controller.js # User-related controller logic
├── db/
│   └── db.js              # Database connection setup
├── middlewares/
│   └── auth.middleware.js # Authentication middleware
├── models/
│   ├── blacklistToken.model.js # Blacklisted token model
│   └── user.Model.js      # User model
├── routes/
│   └── user.routes.js     # User-related route definitions
├── services/
│   └── user.service.js    # User-related business logic
└── package.json           # Project dependencies and scripts
```

## Usage Instructions

### Installation

Prerequisites:
- Node.js (v14 or later)
- MongoDB (v4.4 or later)

Steps:
1. Clone the repository
2. Navigate to the Backend directory
3. Install dependencies:
   ```
   npm install
   ```
4. Create a `.env` file in the Backend directory with the following variables:
   ```
   PORT=3000
   DB_CONNECT=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

### Getting Started

1. Start the server:
   ```
   npm start
   ```
2. The server will be running on `http://localhost:3000` (or the port specified in your .env file)

### API Endpoints

- POST `/users/register`: Register a new user
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

- POST `/users/login`: Login a user
  ```json
  {
    "email": "john.doe@example.com",
    "password": "securepassword"
  }
  ```

- GET `/users/profile`: Get user profile (requires authentication)

- GET `/users/logout`: Logout user (requires authentication)

### Authentication

The API uses JWT for authentication. After successful login, include the token in the `Authorization` header of subsequent requests:

```
Authorization: Bearer <your_token_here>
```

### Error Handling

The API returns appropriate HTTP status codes and error messages:

- 400: Bad Request (e.g., invalid input)
- 401: Unauthorized (authentication failed)
- 500: Internal Server Error

### Testing & Quality

To run tests (if implemented):
```
npm test
```

### Troubleshooting

Common issues:

1. Connection to MongoDB fails
   - Error: "MongoNetworkError: failed to connect to server"
   - Solution: 
     1. Check if MongoDB is running
     2. Verify the connection string in the `.env` file
     3. Ensure network connectivity to the MongoDB server

2. JWT verification fails
   - Error: "JsonWebTokenError: invalid signature"
   - Solution:
     1. Check if the `JWT_SECRET` in the `.env` file matches the one used to sign the token
     2. Ensure the token hasn't expired
     3. Verify the token format in the Authorization header

3. CORS issues
   - Error: "Access to XMLHttpRequest has been blocked by CORS policy"
   - Solution:
     1. Check the CORS configuration in `app.js`
     2. Ensure the client's origin is allowed
     3. Verify that the `cors` middleware is properly configured

For debugging:
- Set `NODE_ENV=development` in your `.env` file for more verbose logging
- Check the console output for error messages and stack traces
- Use a tool like Postman to test API endpoints and examine responses

## Data Flow

The request data flow in this application follows these steps:

1. Client sends a request to an endpoint (e.g., `/users/login`)
2. The request is first processed by Express middleware (CORS, JSON parsing, etc.)
3. It then reaches the appropriate route handler in `user.routes.js`
4. The route handler may apply input validation using `express-validator`
5. The request is then passed to the corresponding controller function in `user.controller.js`
6. The controller interacts with the `user.Model.js` to perform database operations
7. If authentication is required, `auth.middleware.js` verifies the JWT token
8. The response is sent back to the client

```
Client Request
     |
     v
Express Middleware
     |
     v
Route Handler (user.routes.js)
     |
     v
Input Validation
     |
     v
Controller (user.controller.js)
     |
     v
Model (user.Model.js)
     |
     v
Database Operation
     |
     v
Response to Client
```

Note: Authentication middleware may be applied at the route level, checking the JWT token before allowing access to protected routes.

## Contributing

We welcome contributions to improve the User Authentication and Management Backend! Here's how you can contribute:

### Reporting Issues

If you encounter any bugs or have suggestions for improvements:

1. Check the [GitHub Issues](https://github.com/your-repo-url/issues) to see if the issue has already been reported.
2. If not, open a new issue, providing a clear description of the problem or suggestion, along with any relevant code snippets or error messages.

### Suggesting Enhancements

We're always looking for ways to make the backend better:

1. Open a new issue on GitHub.
2. Clearly describe your enhancement idea, explaining why it would be useful and how it should work.

### Submitting Pull Requests

If you'd like to contribute code:

1. Fork the repository and create a new branch for your feature or bug fix.
2. Write your code, following the existing code style and structure.
3. Add or update tests as necessary.
4. Update the documentation to reflect your changes.
5. Submit a pull request with a clear description of your changes.

### Coding Standards

When contributing, please adhere to the following guidelines:

- Follow the existing code style and naming conventions.
- Write clear, commented code.
- Ensure your code passes all existing tests.
- Add new tests for new functionality.
- Update the README or other documentation as needed.

By contributing, you agree that your contributions will be licensed under the project's existing license.

Thank you for helping improve the User Authentication and Management Backend!