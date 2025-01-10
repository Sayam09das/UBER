# User Authentication and Management Backend

This project is a robust backend system for user and captain authentication and management, built with Node.js and Express.js.

The backend provides a secure and scalable solution for user and captain registration, login, profile management, and logout functionality. It utilizes JSON Web Tokens (JWT) for authentication, bcrypt for password hashing, and MongoDB for data storage. The system is designed with security in mind, implementing features such as token blacklisting and middleware-based authentication checks.

Key features include:
- User and captain registration with email and password
- Secure login with JWT token generation
- User and captain profile retrieval
- Logout functionality with token blacklisting
- Middleware for route protection
- MongoDB integration for data persistence
- Password hashing for enhanced security
- Cross-Origin Resource Sharing (CORS) support

This backend is ideal for applications requiring a solid foundation for user and captain management and authentication, providing a RESTful API that can be easily integrated with various frontend technologies.

## Repository Structure

```
Backend/
├── app.js                 # Main application setup
├── server.js              # Server entry point
├── controllers/
│   ├── user.controller.js # User-related controller logic
│   └── captain.controller.js # Captain-related controller logic
├── db/
│   └── db.js              # Database connection setup
├── middlewares/
│   └── auth.middleware.js # Authentication middleware
├── models/
│   ├── blacklistToken.model.js # Blacklisted token model
│   ├── user.Model.js      # User model
│   └── captain.model.js   # Captain model
├── routes/
│   ├── user.routes.js     # User-related route definitions
│   └── captain.routes.js  # Captain-related route definitions
├── services/
│   ├── user.service.js    # User-related business logic
│   └── captain.service.js # Captain-related business logic
└── package.json           # Project dependencies and scripts
```

## Usage Instructions

[Usage instructions remain unchanged]

## API Endpoints

### User Endpoints

- POST `/users/register`: Register a new user
- POST `/users/login`: Login a user
- GET `/users/profile`: Get user profile (requires authentication)
- GET `/users/logout`: Logout user (requires authentication)

### Captain Endpoints

- POST `/captains/register`: Register a new captain
- POST `/captains/login`: Login a captain
- GET `/captains/profile`: Get captain profile (requires authentication)
- GET `/captains/logout`: Logout captain (requires authentication)

## Authentication

The API uses JWT for authentication. After successful login, include the token in the `Authorization` header of subsequent requests:

```
Authorization: Bearer <your_token_here>
```

Both users and captains have separate authentication middlewares to protect their respective routes.

## Data Models

### User Model
[User model details remain unchanged]

### Captain Model
The Captain model includes the following fields:
- `name`: Object with `firstname` and `lastname`
- `email`: Unique email address
- `password`: Hashed password
- `vehicle`: Object with `color`, `plate`, `capacity`, and `vehicleType`
- `status`: Captain's status (active/inactive)
- `socketId`: Optional socket ID

## Error Handling

[Error handling section remains unchanged]

## Testing & Quality

[Testing & Quality section remains unchanged]

## Troubleshooting

[Troubleshooting section remains unchanged]

## Data Flow

The request data flow in this application follows these steps:

1. Client sends a request to an endpoint (e.g., `/users/login` or `/captains/login`)
2. The request is first processed by Express middleware (CORS, JSON parsing, etc.)
3. It then reaches the appropriate route handler in `user.routes.js` or `captain.routes.js`
4. The route handler may apply input validation using `express-validator`
5. The request is then passed to the corresponding controller function in `user.controller.js` or `captain.controller.js`
6. The controller interacts with the `user.Model.js` or `captain.model.js` to perform database operations
7. If authentication is required, `auth.middleware.js` verifies the JWT token for users or captains
8. The response is sent back to the client

```
Client Request
     |
     v
Express Middleware
     |
     v
Route Handler (user.routes.js or captain.routes.js)
     |
     v
Input Validation
     |
     v
Controller (user.controller.js or captain.controller.js)
     |
     v
Model (user.Model.js or captain.model.js)
     |
     v
Database Operation
     |
     v
Response to Client
```

Note: Authentication middleware may be applied at the route level, checking the JWT token before allowing access to protected routes.

## Contributing

[Contributing section remains unchanged]