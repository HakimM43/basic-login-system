# Basic Login System

An Express API for user registration and login with MongoDB, bcrypt password hashing, and signed JWTs.

## Setup

1. Run `npm install`.
2. Copy `.env.example` to `.env` and replace `MONGO_URI` with your MongoDB Atlas connection string. Set `JWT_SECRET` to a long random value. Never commit `.env`.
3. Run `npm start`.

## Endpoints

`POST http://localhost:3000/api/users/register`

```json
{ "username": "hakim", "email": "hakim@example.com", "password": "examplePassword123" }
```

Returns status 201 with `_id`, `username`, and `email`. The password is stored as a bcrypt hash and omitted from the response.

`POST http://localhost:3000/api/users/login`

```json
{ "email": "hakim@example.com", "password": "examplePassword123" }
```

Returns a signed `token` and public user data. An incorrect email or password returns status 400.

## Submission

Create a separate GitHub repository named `basic-login-system`, push this folder's contents, and submit its URL in Canvas. Check that `.env` and `node_modules` are absent from GitHub.
