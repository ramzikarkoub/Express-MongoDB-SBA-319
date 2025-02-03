# Blog - A Simple Blogging Platform API

Blog is a RESTful API built with **Express.js** and **MongoDB** that allows users to create, read, update, and delete posts and comments. It also includes user authentication and authorization features.

---

## Features

- **User Authentication**:

  - Register, login, and logout functionality.
  - Password hashing using **bcryptjs**.
  - JSON Web Tokens (JWT) for secure authentication.
  - Protected routes using middleware.

- **Posts**:

  - Create, read, update, and delete blog posts.
  - Posts are associated with users (authors).
  - Fetch all posts or a single post by ID.

- **Comments**:

  - Add, read, update, and delete comments on posts.
  - Comments are associated with both users (authors) and posts.
  - Fetch all comments for a specific post.

- **Middleware**:
  - Authentication middleware to protect routes.
  - Input validation for user registration and login.

---

## Technologies Used

- **Node.js**: Runtime environment.
- **Express.js**: Web framework for building the API.
- **MongoDB**: Database for storing users, posts, and comments.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.
- **JWT**: JSON Web Tokens for user authentication.
- **Bcryptjs**: Password hashing for secure storage.
- **Dotenv**: Environment variable management.
- **Cookie-parser**: Middleware for parsing cookies.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ramzikarkoub/blog.git
   cd blog
   ```
