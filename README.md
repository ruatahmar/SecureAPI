# SecureAPI

# Task Management API

A backend REST API for a task/notes management application built as part of an internship assignment.  
The system supports **role-based access control (RBAC)**, **JWT-based authentication**, and a **protected dashboard**.

Admins have elevated privileges to manage all tasks, while regular users can only manage their own tasks.

---

## Features

- User authentication using **JWT (Access + Refresh Tokens)**
- Role-Based Access Control (RBAC)
  - **Admin**
    - View and edit all tasks
    - Create tasks for themselves
  - **User**
    - View, create, update, and delete their own tasks
- Protected routes (JWT required)
- Secure password hashing using **bcrypt**
- HTTP-only cookies for token storage
- Admin bootstrap script (users cannot self-register as admin)
- Clean and modular project structure

---

## Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** with **Mongoose**
- **JWT** for authentication
- **bcrypt / bcryptjs** for password hashing

---

## Project Setup

### 1. Clone the repository

```bash
git clone https://github.com/ruatahmar/SecureAPI.git
cd SecureApi
```

### 2️. Backend Setup

Make sure you make a .env file in `server/`.
You can copy the contents from the `.env.example` file
To start backend:

```
cd server
npm install
npm run dev
```

### 3️. Frontend Setup

Make sure you make a .env file in `client/`.
You can copy the contents from the `.env.example` file
To start frontend:

```
cd client
npm install
npm run dev   # runs frontend on localhost:5173 (Vite)
```

### 4. Create Admin User

Admin accounts cannot be created via public APIs.

Run the admin creation script:

```
cd server
npm run admin
```

This will create a predefined admin user in the database with

```
email: "admin@demo.com"
password: "Admin@123"
```
## Endpoints
[Postman endpoints](https://www.postman.com/payload-specialist-54019853/workspace/public-workspace/collection/40210596-9e342add-f2c4-4d0c-922c-af2c27a2fa16?action=share&creator=40210596&active-environment=40210596-b4473656-15c7-4e84-8594-2975d049dd15)
## Authentication Flow

- Users authenticate using email and password

- On successful login:
  - Access Token (short-lived)

  - Refresh Token (long-lived)

- Tokens are stored in HTTP-only cookies

- Access tokens are refreshed securely using refresh tokens

---

## Access Control

| Role  | Permissions           |
| ----- | --------------------- |
| User  | Manage own tasks      |
| Admin | View & edit all tasks |

**RBAC is enforced at the backend using middleware.**

---

## Folder Structure

**Backend**:

```css
src/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── scripts/
├── utils/
└── index.js
```

**Frontend**:

```css
src/
├── api/
├── auth/
├── pages/
├── routes/
├── utils/
├── App.jsx
├── index.css
└── main.jsx
```

---

## Scalability & System Design Notes

This system is designed as a **stateless REST API** with JWT-based authentication, which allows multiple backend instances to run in parallel without shared session state.

### Auth & RBAC Scaling

- Authentication is handled via short-lived access tokens and rotated refresh tokens, avoiding server-side sessions.

- RBAC checks are enforced at the API layer and scale linearly with request volume, since role information is embedded in the token payload.

- Admin privileges are tightly controlled through a bootstrap script, preventing role escalation via public endpoints.

### Data Access Patterns

- The dominant access pattern is user-scoped task queries filtered by `userId`, which scale well with indexing.
- Admin access reuses the same endpoints but executes broader queries; these paths can be paginated or rate-limited if needed to prevent heavy reads from impacting regular users.
- Using a single schema and endpoint keeps the system simple and avoids duplication while still allowing differentiated behavior through authorization logic.

### Horizontal Scaling

- Because the API is stateless, it can be horizontally scaled behind a load balancer without modification.

- Token verification is CPU-bound and predictable, making it suitable for scale-out rather than scale-up.

### Future Optimizations (If Load Increases)

- Introduce Redis for caching frequently accessed admin dashboards or aggregated task views.

- Add request-level pagination and limits to keep worst-case queries bounded.

- Multiple instances of the backend can be run behind a load balancer (e.g., Nginx) to distribute traffic.
