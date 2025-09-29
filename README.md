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

- Node.js (v18+ recommended)
- MongoDB (local or Atlas cluster)
- Auth0 account & app (for credentials)

### Installation

1. Clone the repository:

   ```
   git clone https://your-repo-url.git
   cd note-taking-app
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file in the root directory with:

   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   AUTH0_SECRET=your_auth0_secret
   AUTH0_CLIENT_ID=your_auth0_client_id
   AUTH0_DOMAIN=your-tenant.auth0.com
   BASE_URL=http://localhost:5000
   ```

4. Start the development server:

   ```
   npm run dev
   ```

5. Open [http://localhost:5000](http://localhost:5000) in your browser.

---

## Usage

- Log in using Auth0 to access or manage your personal notes.
- View, add, edit, or delete notes on `/notes` after logging in.
- Use the "Logout" button to end your session.
- Access Swagger API docs at [http://localhost:5000/api-docs](http://localhost:5000/api-docs).

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

Interactive API docs and "Try it out" available at [http://localhost:5000/api-docs](http://localhost:5000/api-docs) via Swagger UI.

---

## Folder Structure

note-taking-app/
├── controllers/ # Business logic for notes
├── models/ # Mongoose data schemas
├── routes/ # Express route handlers
├── views/ # EJS templates and layouts
├── public/ # Static JS (Bootstrap, client logic)
├── .env
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

## Contributing

Pull requests and suggestions are welcome! Fork, patch, and send a pull request.

---

## License

MIT License

---

## Author

Tianye Zhao
