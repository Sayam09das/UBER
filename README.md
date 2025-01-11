# Ride-Sharing Application with User and Captain Functionality

This project is a full-stack ride-sharing application that provides separate functionality for users and captains. It features user authentication, captain management, and real-time location tracking.

The application is built using a React frontend and an Express.js backend, with MongoDB as the database. It implements token-based authentication, real-time updates using WebSockets, and follows best practices for security and performance.

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
│   │   ├── App.jsx
│   │   ├── context
│   │   ├── main.jsx
│   │   └── pages
│   ├── index.html
│   └── vite.config.js
└── README.md
```

### Key Files:

- `Backend/app.js`: Main Express application setup
- `Backend/server.js`: HTTP server initialization
- `frontend/src/main.jsx`: React application entry point
- `frontend/src/App.jsx`: Main React component and routing setup

### Important Integration Points:

- API Routes: Defined in `Backend/routes`
- Database Connection: Managed in `Backend/db/db.js`
- Authentication Middleware: Located in `Backend/middlewares/auth.middleware.js`

## Usage Instructions

### Installation

Prerequisites:
- Node.js (v14 or later)
- MongoDB (v4 or later)

Steps:
1. Clone the repository
2. Navigate to the project root directory
3. Install backend dependencies:
   ```
   cd Backend
   npm install
   ```
4. Install frontend dependencies:
   ```
   cd ../frontend
   npm install
   ```

### Configuration

1. Create a `.env` file in the `Backend` directory with the following variables:
   ```
   PORT=3000
   DB_CONNECT=mongodb://localhost:27017/your_database_name
   JWT_SECRET=your_jwt_secret
   ```
2. Adjust the `vite.config.js` file in the `frontend` directory if needed for custom build settings.

### Running the Application

1. Start the backend server:
   ```
   cd Backend
   npm run dev
   ```
2. In a new terminal, start the frontend development server:
   ```
   cd frontend
   npm run dev
   ```

### Common Use Cases

1. User Registration:
   ```javascript
   const response = await axios.post('/api/users/register', {
     email: 'user@example.com',
     password: 'password123',
     name: { firstname: 'John', lastname: 'Doe' }
   });
   ```

2. Captain Login:
   ```javascript
   const response = await axios.post('/api/captains/login', {
     email: 'captain@example.com',
     password: 'password123'
   });
   ```

3. Fetching User Profile:
   ```javascript
   const response = await axios.get('/api/users/profile', {
     headers: { Authorization: `Bearer ${token}` }
   });
   ```

### Testing & Quality

To run the linter:
```
npm run lint
```

### Troubleshooting

1. Issue: Unable to connect to the database
   - Error message: "MongoNetworkError: failed to connect to server"
   - Diagnostic steps:
     1. Check if MongoDB is running: `sudo systemctl status mongodb`
     2. Verify the connection string in the `.env` file
     3. Ensure the MongoDB port is not blocked by a firewall
   - Solution: Start MongoDB if it's not running: `sudo systemctl start mongodb`

2. Issue: JWT authentication fails
   - Error message: "JsonWebTokenError: invalid signature"
   - Diagnostic steps:
     1. Check if the `JWT_SECRET` in the `.env` file matches the one used to generate the token
     2. Verify the token hasn't expired
     3. Ensure the token is being sent correctly in the Authorization header
   - Solution: Regenerate the JWT token and ensure the secret matches the one in the `.env` file

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
- Frontend: Browser console (accessible through Developer Tools)

## Data Flow

The application follows a typical client-server architecture with RESTful API communication. Here's an overview of the data flow:

1. Client (React Frontend) sends HTTP requests to the server
2. Express.js server receives the request
3. Authentication middleware verifies the JWT token (if required)
4. The appropriate controller handles the request
5. Controllers interact with services and models to perform business logic and database operations
6. The server sends a response back to the client
7. React components update based on the received data

```
[Client] <--> [Express Server] <--> [Controllers] <--> [Services/Models] <--> [MongoDB]
   ^                                    ^
   |                                    |
   +------------------------------------+
        WebSocket for real-time updates
```

Note: WebSocket connections are used for real-time updates, such as location tracking for captains.

## Deployment

Prerequisites:
- Node.js (v14 or later)
- MongoDB (v4 or later)
- PM2 (for process management)

Steps:
1. Clone the repository on the server
2. Install dependencies for both backend and frontend
3. Build the frontend:
   ```
   cd frontend
   npm run build
   ```
4. Set up environment variables on the server
5. Use PM2 to start the backend server:
   ```
   pm2 start Backend/server.js --name ride-sharing-app
   ```
6. Configure a reverse proxy (e.g., Nginx) to serve the frontend build and proxy API requests to the backend

Monitoring:
- Use PM2 for basic monitoring: `pm2 monit`
- Set up application-level logging and integrate with a monitoring service like Datadog or New Relic