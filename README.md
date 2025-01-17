# Uber-like Ride-Sharing Application

This project is a full-stack ride-sharing application with separate user and captain (driver) interfaces, featuring real-time location tracking and ride management.

## Project Description

This Uber-like application provides a platform for users to request rides and for captains (drivers) to accept and manage these rides. The application is built using a modern tech stack with a React frontend and a Node.js backend, offering real-time updates and location-based services.

Key features include:
- User and captain authentication
- Real-time ride requests and acceptance
- Location search and mapping
- Ride status tracking
- Payment integration (simulated)

The application leverages technologies such as React for the frontend, Express.js for the backend API, MongoDB for data storage, and various libraries for mapping and real-time updates. It demonstrates a comprehensive approach to building a complex, real-world application with multiple user roles and real-time interactions.

## Repository Structure

```
.
├── Backend
│   ├── app.js
│   ├── controllers
│   ├── db
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── server.js
│   └── services
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── context
│   │   ├── pages
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── vite.config.js
└── README.md
```

### Key Files:
- `Backend/app.js`: Main Express application setup
- `Backend/server.js`: Server entry point
- `frontend/src/main.jsx`: React application entry point
- `frontend/src/App.jsx`: Main React component and routing setup

### Important Integration Points:
- `Backend/routes`: API endpoints for user, captain, and maps functionality
- `frontend/src/context`: React context for global state management
- `Backend/db/db.js`: Database connection setup

## Usage Instructions

### Installation

Prerequisites:
- Node.js (v14 or later)
- MongoDB (v4 or later)

Steps:
1. Clone the repository
2. Install backend dependencies:
   ```
   cd Backend
   npm install
   ```
3. Install frontend dependencies:
   ```
   cd frontend
   npm install
   ```

### Getting Started

1. Start the backend server:
   ```
   cd Backend
   npm start
   ```
2. Start the frontend development server:
   ```
   cd frontend
   npm run dev
   ```

### Configuration

1. Create a `.env` file in the `Backend` directory with the following variables:
   ```
   PORT=3000
   DB_CONNECT=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
2. Update the API base URL in the frontend if necessary (usually in a config file or environment variable)

### Common Use Cases

1. User Registration:
   ```javascript
   // POST /users/register
   {
     "email": "user@example.com",
     "password": "securepassword",
     "name": {
       "firstname": "John",
       "lastname": "Doe"
     }
   }
   ```

2. Captain Login:
   ```javascript
   // POST /captains/login
   {
     "email": "captain@example.com",
     "password": "securepassword"
   }
   ```

3. Request a Ride:
   ```javascript
   // POST /rides/request
   {
     "pickup": "123 Main St",
     "destination": "456 Elm St",
     "userId": "user_id_here"
   }
   ```

### Testing & Quality

- Run backend tests: `cd Backend && npm test`
- Run frontend tests: `cd frontend && npm test`

### Troubleshooting

1. Issue: Unable to connect to the database
   - Error message: "MongoNetworkError: failed to connect to server"
   - Diagnostic steps:
     1. Check if MongoDB is running: `sudo systemctl status mongodb`
     2. Verify the connection string in the `.env` file
     3. Ensure network connectivity to the database server
   - Expected outcome: Successful connection to the database

2. Issue: JWT authentication failing
   - Error message: "JsonWebTokenError: invalid signature"
   - Diagnostic steps:
     1. Check if the `JWT_SECRET` in the `.env` file matches the one used to sign the token
     2. Verify the token expiration
     3. Enable debug logging: Set `DEBUG=jwt:*` environment variable
   - Expected outcome: Successful token verification and user authentication

### Debugging

To enable debug mode:
1. Set the `DEBUG` environment variable:
   ```
   export DEBUG=app:*
   ```
2. Restart the server
3. Check the console for detailed debug output

Log files are located at:
- Backend: `/Backend/logs/app.log`
- Frontend: Browser console (open developer tools)

### Performance Optimization

- Monitor API response times using tools like `artillery` or `ab`
- Profile the Node.js application using `node --prof`
- Optimize database queries by adding appropriate indexes
- Implement caching for frequently accessed data using Redis

## Data Flow

The request data flow in this application follows these steps:

1. User initiates a ride request from the frontend
2. Request is sent to the backend API
3. Backend validates the request and user authentication
4. If valid, the request is stored in the database
5. Nearby captains are notified of the new ride request
6. When a captain accepts, the ride status is updated
7. Real-time updates are sent to both the user and captain
8. Upon ride completion, payment is processed and ride status is finalized

```
[User] -> [Frontend] -> [Backend API] -> [Database]
                                      -> [Captain Notification]
                                      -> [Real-time Updates]
[Captain] <- [Frontend] <- [Backend API] <- [Database]
```

Note: Ensure proper error handling and validation at each step of the data flow.