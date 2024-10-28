# MERN Template

This project is a boilerplate for a MERN (MongoDB, Express, React, Node.js) stack application. It sets up the basic structure and configurations needed to quickly start developing your full-stack web app.

## Getting Started

Follow the instructions below to set up and run the project locally.

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v20.x )
- [MongoDB community server edition](https://www.mongodb.com/)
- [nodemon](https://www.npmjs.com/package/nodemon)
- [Compass](https://www.mongodb.com/products/tools/compass)

### Project Structure

```MARKDOWN
/mern-template
 ├── /backend    # Express.js server-side code
 └── /frontend   # React.js client-side code
```

## Backend Setup

The backend is a Node.js application using Express and connects to a MongoDB database.

1. Navigate to the `backend` directory:

    ```bash
    cd backend
    ```

2. Install the necessary dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the `backend` directory with the following environment variables:

  ```env
  PORT=5004
  TOKEN_SECRET=sdfhsdfjhjbknfewkbnfk75785jfjfjfhjfhjhfhfhffhfh
  CONNECTION_URI=mongodb://localhost:27017/books

  ```

4. Start the development server:

```bash
npm run dev
```

The server will be running at `http://localhost:5004`.

## Frontend Setup

The frontend is a React application.

1. Navigate to the `frontend` directory:

    ```bash
    cd frontend
    ```

2. Install the necessary dependencies:

    ```bash
    npm install
    ```

3. Start the React development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`.

## Running the App

To run the full application, ensure both the backend and frontend servers are running. You can then visit the frontend at `http://localhost:5173`, and the frontend will communicate with the backend API.

### Additional Scripts

- **Backend:**

- `npm run start`: Start the server in production mode.
- `npm run dev`: Start the server in development mode using [nodemon](https://www.npmjs.com/package/nodemon) for automatic restarts on code changes.

- **Frontend:**
- `npm run build`: Build the React application for production.
- `npm run dev`: Start the frontend development server with hot-reloading.

## License

This project is licensed under the MIT License.

---

Feel free to modify it based on any specific configurations or additional setup steps your project may require!
