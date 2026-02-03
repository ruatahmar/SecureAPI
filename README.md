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
Folder Structure

```css
src/
├── controllers/
├── models/
├── routes/
├── middleware/
├── utils/
├── scripts/
└── app.js
```

Scalability Considerations

See the section below for scalability notes.

---

## Short Scalability Note (put this in README or a separate `SCALABILITY.md`)

### Scalability Considerations

- **Stateless Authentication**  
  JWT-based authentication allows horizontal scaling since no session data is stored on the server.

- **Caching**  
  Frequently accessed data (e.g., task lists, admin dashboards) can be cached using **Redis** to reduce database load.

- **Database Scaling**  
  MongoDB supports indexing and read replicas for handling increased read traffic.

- **Microservices (Future Scope)**  
  The system can be split into separate services such as:
  - Auth Service
  - Task Service  
    allowing independent scaling and deployment.

- **Load Balancing**  
  Multiple instances of the backend can be run behind a load balancer (e.g., Nginx) to distribute traffic.
