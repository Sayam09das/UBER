# Ride-Hailing Backend API

This project is a backend API for a ride-hailing application, providing user and captain management functionalities.

## Project Description

This backend API serves as the core of a ride-hailing platform, facilitating user and captain interactions. It provides robust authentication, profile management, and vehicle tracking capabilities. The API is built using Node.js and Express.js, with MongoDB as the database, ensuring scalability and performance.

Key features include:
- User and captain registration and authentication
- Profile management for users and captains
- Vehicle information management for captains
- Token-based authentication with JWT
- Secure password hashing using bcrypt
- MongoDB integration for data persistence
- Express.js middleware for request handling and routing

The API is designed with security in mind, implementing features such as token blacklisting for logout functionality and secure cookie handling for token storage.

## Repository Structure

```
.
├── Backend
│   ├── app.js
│   ├── controllers
│   │   ├── captain.controller.js
│   │   └── user.controller.js
│   ├── db
│   │   └── db.js
│   ├── middlewares
│   │   └── auth.middleware.js
│   ├── models
│   │   ├── blacklistToken.model.js
│   │   ├── captain.model.js
│   │   └── user.Model.js
│   ├── package.json
│   ├── routes
│   │   ├── captain.routes.js
│   │   └── user.routes.js
│   ├── server.js
│   └── services
│       ├── captain.service.js
│       └── user.service.js
└── README.md
```

Key Files:
- `server.js`: Entry point of the application
- `app.js`: Express application setup and middleware configuration
- `db/db.js`: Database connection setup
- `controllers/`: Contains logic for handling requests
- `models/`: Defines database schemas and models
- `routes/`: Defines API routes
- `middlewares/`: Custom middleware functions
- `services/`: Business logic and data processing

## Usage Instructions

### Installation

Prerequisites:
- Node.js (v14 or later)
- MongoDB (v4.4 or later)

Steps:
1. Clone the repository
2. Navigate to the Backend directory: `cd Backend`
3. Install dependencies: `npm install`
4. Create a `.env` file in the Backend directory with the following variables:
   ```
   PORT=3000
   DB_CONNECT=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   ```
5. Start the server: `npm start`

### API Endpoints

1. User Routes:
   - POST `/users/register`: Register a new user
   - POST `/users/login`: Login a user
   - GET `/users/profile`: Get user profile (requires authentication)
   - GET `/users/logout`: Logout user (requires authentication)

2. Captain Routes:
   - POST `/captains/register`: Register a new captain
   - POST `/captains/login`: Login a captain
   - GET `/captains/profile`: Get captain profile (requires authentication)
   - GET `/captains/logout`: Logout captain (requires authentication)

### Authentication

The API uses JWT for authentication. Include the token in the `Authorization` header as a Bearer token for authenticated requests.

### Error Handling

The API returns appropriate HTTP status codes and error messages for different scenarios. Always check the response status and body for error information.

### Testing & Quality

To run tests (assuming tests are set up):
```
npm test
```

### Troubleshooting

Common issues:
1. Connection errors:
   - Ensure MongoDB is running and the connection string in `.env` is correct
   - Check for network issues or firewall settings

2. Authentication failures:
   - Verify the JWT_SECRET in the .env file
   - Ensure the token is not expired or blacklisted

3. Request validation errors:
   - Check the request payload against the expected schema in the routes

For debugging:
- Set `NODE_ENV=development` in the `.env` file for verbose logging
- Check the console output for error messages and stack traces

## Data Flow

1. Client sends a request to the server
2. The request is processed by Express middleware (CORS, body parsing, etc.)
3. The appropriate route handler is invoked based on the URL and HTTP method
4. The route handler may use authentication middleware to verify the user's token
5. The controller associated with the route processes the request
6. If needed, the controller interacts with the database through Mongoose models
7. The response is sent back to the client

```
Client -> Express Middleware -> Route Handler -> Controller -> Model -> Database
       <-                    <-               <-           <-       <-
```

## Infrastructure

The application uses the following key resources:

- Express.js server running on Node.js
- MongoDB database for data storage
- JSON Web Tokens (JWT) for authentication
- bcrypt for password hashing
- Mongoose as an ODM for MongoDB