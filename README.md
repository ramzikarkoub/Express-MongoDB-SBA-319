# Blog - A Blogging Platform API - Express.js & mongoDB

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

### Clone the repository:

```bash
git clone https://github.com/ramzikarkoub/blog.git
cd blog
npm install
```

### Set up environment variables:

1. Create a .env file in the root directory.
2. Add the following variables:

```bash
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=1h
   PORT=5000
```

### Start the server:

```bash
npm start
```

---

## API Endpoints

#### Authentication

- **POST**: /api/auth/register: Register a new user.
- **POST**: /api/auth/login: Log in a user.
- **POST**: /api/auth/logout: Log out a user.

#### Posts

- **POST**: /api/posts: Create a new post (requires authentication).
- **GET**: /api/posts: Fetch all posts.
- **GET**: /api/posts/:id: Fetch a single post by ID.
- **PUT**: /api/posts/:id: Update a post (requires authentication).
- **DELETE**: /api/posts/:id: Delete a post (requires authentication).

#### Comments

- **POST**: /api/comments: Create a new comment (requires authentication).
- **GET**: /api/comments/post/:postId: Fetch all comments for a specific post.
- **PUT**: /api/comments/:id: Update a comment (requires authentication).
- **DELETE**: /api/comments/:id: Delete a comment (requires authentication).

---

## Models

1.  User

```bash
firstName: String (required)
lastName: String (required)
email: String (required, unique)
password: String (required)
```

2.  Post

```bash
title: String (required)
content: String (required)
author: ObjectId (references User)
```

3.  Comment

```bash
content: String (required)
author: ObjectId (references User)
post: ObjectId (references Post)
```

---

## Middleware

- Authentication Middleware
- Protects routes by verifying the JWT token stored in cookies.
- Attaches the authenticated user to the req.user object.

---

## Indexing

- To improve query performance, it's highly recommended to create indexes on frequently queried fields in MongoDB.

- For the Post model, creating an index on author and title will help in efficient searching of posts by user or title.

```bash
postSchema.index({ author: 1 });
postSchema.index({ title: 1 });
```

Adding index helps MongoDB optimize queries and improves the overall performance of the application, especially as the database grows.
