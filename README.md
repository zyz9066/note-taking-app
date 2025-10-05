# Note Taking App

A secure, full-stack note-taking web application using Node.js, Express, MongoDB, Auth0 authentication, EJS server-side rendering, Bootstrap for responsive UI, and Swagger for interactive API documentation.

---

## Features

- Auth0 authentication (login/logout, only see your own notes)
- Create, read, update, delete (CRUD) your notes
- Responsive Bootstrap UI and EJS templates
- MongoDB/Mongoose persistent backend
- RESTful, documented API with Swagger UI

---

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- Auth0 account

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/zyz9066/note-taking-app.git
   cd note-taking-app
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file in the root directory with:

   ```
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   AUTH0_SECRET=your_auth0_secret
   AUTH0_CLIENT_ID=your_auth0_client_id
   AUTH0_DOMAIN=your-tenant.auth0.com
   BASE_URL=http://localhost:3000
   ```

4. Start the development server:

   ```
   npm run test
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Usage

- Log in using Auth0 to access or manage your personal notes.
- View, add, edit, or delete notes on `/notes` after logging in.
- Use the "Logout" button to end your session.
- Access Swagger API docs at [http://localhost:3000/api-docs](http://localhost:3000/api-docs).

---

## API Endpoints

All endpoints require authentication via Auth0 (`express-openid-connect`). Attach JWT tokens for interactive requests in Swagger UI.

### Notes

| Endpoint         | Method | Description          |
| ---------------- | ------ | -------------------- |
| `/api/notes`     | GET    | List all your notes  |
| `/api/notes`     | POST   | Create a new note    |
| `/api/notes/:id` | GET    | Get a note by its ID |
| `/api/notes/:id` | PUT    | Update a note by ID  |
| `/api/notes/:id` | DELETE | Delete a note by ID  |

### Example Note object

{
"\_id": "noteId",
"auth0Id": "auth0|userId",
"title": "Note Title",
"content": "Note Content",
"createdAt": "ISODate",
"updatedAt": "ISODate"
}

text

### Status Codes

- `200 OK` - Success
- `201 Created` - Successfully created
- `400 Bad Request` - Invalid body or missing data
- `401 Unauthorized` - No/Invalid authentication
- `404 Not Found` - Resource not found

---

## Documentation

Interactive API docs and "Try it out" available at [http://localhost:3000/api-docs](http://localhost:3000/api-docs) via Swagger UI.

---

## Folder Structure

note-taking-app/
├── config/
├── controllers/
├── models/
├── public/
├── routes/
├── views/
├── .env
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── server.js

text

---

## Technologies Used

- **Node.js**, **Express**, **MongoDB/Mongoose**
- **Auth0** (`express-openid-connect`)
- **EJS**
- **Bootstrap 5**
- **Swagger (swagger-ui-express, swagger-jsdoc)**

---

## Challenges Encountered

### Authentication Complexity

Integrating Auth0 with Passport.js for secure authentication can be tricky because it requires careful environment setup, correct callback URLs, session configuration, and handling edge cases such as expired tokens or logout flows.

### API and Front-End Synchronization

Ensuring a smooth flow of data between API endpoints and front-end views is challenging, especially when using client-side JavaScript for asynchronous CRUD operations. Handling errors gracefully and providing instant feedback to users requires thorough implementation and testing.

### Database Modeling and User Isolation

Designing Mongoose schemas that associate each note with a unique user and enforcing access control so users don’t access or modify others’ notes is essential. Overlooking these details can lead to security vulnerabilities and data leaks.

### Validation and Error Handling

Server-side data validation is necessary for a robust app, but distinguishing between different error types (validation, authentication, server) and sending meaningful messages to the front end adds complexity to the codebase.

## Key Takeaways and Lessons Learned

### Importance of Structure and Modularity

Breaking the app into routes, controllers, models, and middleware makes the codebase much easier to navigate, debug, and extend. Proper modularity also enables better team collaboration.

### Critical Role of Environment Variables

Using environment variables for configuration (database URI, Auth0 client info, session secrets) is vital for security and deployment flexibility.

### The Value of Robust Testing

Comprehensive manual and automated testing helps uncover edge cases such as invalid input, unauthorized access, or data integrity issues. This is especially important when handling authentication and user-specific data.

### The Necessity of Clear Documentation

Detailed README instructions and API docs are essential for onboarding new contributors and for personal reference when revisiting a project after some time

## Author

Tianye Zhao
