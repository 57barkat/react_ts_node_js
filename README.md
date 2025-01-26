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

# eCommerce Application

This is an eCommerce application built with React and Material-UI.

## Features

- Home Page
- Admin Dashboard (Protected)
- Authentication (Login/Signup)
- Sidebar with navigation links
- Navbar with logout functionality
- Footer
- Responsive Design

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/eCommerce.git
   ```
2. Navigate to the project directory:
   ```bash
   cd eCommerce/my-app
   ```
3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Application

1. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```
2. Open your browser and navigate to `http://localhost:3000`.

### Components

- **NavBar**: A responsive navbar with a logout button.
- **SideBar**: A toggleable sidebar with navigation links.
- **Footer**: A simple footer displayed on all pages except login and signup.

### Responsive Design

The application is designed to be mobile responsive. The NavBar, SideBar, and Footer components adjust their layout based on the screen size to provide an optimal user experience on both desktop and mobile devices.

### Routes

- `/`: Home Page
- `/admin`: Admin Dashboard (Protected)
- `/login`: Login Page
- `/signup`: Signup Page

## License

This project is licensed under the MIT License.
