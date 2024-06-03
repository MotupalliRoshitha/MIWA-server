# Movie Library Web Application Backend

## Introduction

This repository contains the backend code for the Movie Library Web Application. The backend is built using Node.js and Express.js, and it uses MongoDB for database management. The application supports user authentication and allows users to create and manage watchlists of movies.

## Features

1. **User Authentication**: Users can sign up and sign in.
2. **Movie Search**: Users can search for movies and view their details.
3. **Watchlists**: Users can create watchlists of movies. These watchlists can be either public or private.
4. **Home Screen**: Displays different movie lists created by the user.

## Prerequisites

- Node.js
- MongoDB
- npm (Node Package Manager)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd movie-library-backend
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and add the following:
   ```
   MONGO_URL=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret>
   ```

## Running the Application

1. Start the MongoDB server.
2. Start the application:
   ```bash
   npm start
   ```
3. The server will be running on `http://localhost:3001`.

## Endpoints

### Authentication

- **POST /api/v1/signup**: Sign up a new user.
- **POST /api/v1/signin**: Sign in an existing user.

### Watchlists

- **GET /api/v1/watchlist**: Get all watchlists for the logged-in user.
- **POST /api/v1/watchlist**: Create a new watchlist.
- **GET /api/v1/watchlist/:id**: Get details of a specific watchlist (based on its privacy settings).

## Middleware

- **verifyToken**: Middleware to verify JWT tokens for protected routes.

## File Structure

```
.
├── index.js
├── package.json
├── .env
├── src
│   ├── Middleware
│   │   └── auth.js
│   ├── Routes
│   │   ├── auth.js
│   │   └── watchList.js
│   └── Models
│       └── User.js
│       └── WatchList.js
```

## Dependencies

- `bcrypt`: For hashing passwords.
- `body-parser`: To parse incoming request bodies.
- `cors`: To enable Cross-Origin Resource Sharing.
- `dotenv`: To load environment variables from a `.env` file.
- `express`: Fast, unopinionated, minimalist web framework for Node.js.
- `jsonwebtoken`: For JSON web token authentication.
- `mongoose`: MongoDB object modeling tool.
- `nodemon`: Utility that monitors for any changes in your source and automatically restarts your server.

## Scripts

- **start**: Starts the application using `nodemon`.

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/new-feature`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/new-feature`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License.

---

This README provides a comprehensive overview of the Movie Library Web Application backend, including its features, installation steps, endpoints, file structure, and more. It should help you get started quickly and understand the project's organization and capabilities.
