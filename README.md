# eCommerce API

## API Endpoints

### Signup

- **Endpoint:** `/api/auth/signup`
- **Method:** `POST`
- **Description:** Register a new user.

#### Request Body

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### Response

- **Success:** `201 Created`
  - **Body:** `User registered successfully`
- **Error:** `400 Bad Request`
  - **Body:** `Name, email, and password are required`
  - **Body:** `Email is already registered`
- **Error:** `500 Internal Server Error`
  - **Body:** `Error registering user`

### Login

- **Endpoint:** `/api/auth/login`
- **Method:** `POST`
- **Description:** Login an existing user.

#### Request Body

```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### Response

- **Success:** `200 OK`
  - **Body:** `Login successful`
  - **Body:** `{ "token": "your_jwt_token", "role": "user_role" }`
- **Error:** `400 Bad Request`
  - **Body:** `Invalid email or password`
- **Error:** `500 Internal Server Error`
  - **Body:** `Error logging in`

## Environment Variables

- `MONGODB_URI`: MongoDB connection string.
- `PORT`: Port number for the server (default: 5000).
- `JWT_SECRET`: Secret key for JWT.

## Setup

1. Clone the repository.
2. Install dependencies: `npm install`
3. Create a `.env` file with the required environment variables.
4. Start the server: `npm start`

## Dependencies

- Express
- Mongoose
- Bcrypt
- Body-parser
- Dotenv
- Jsonwebtoken

## Frontend Setup

1. Navigate to the `my-app` directory.
2. Install dependencies: `npm install`
3. Create a `.env` file with the required environment variables.
4. Start the frontend server: `npm start`

## Frontend Environment Variables

- `REACT_APP_API_URL`: The base URL for the API.

## Frontend Dependencies

- React
- React Router
- Material-UI
- Axios
