import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';

// import db connection
import connectToDB from './config/db.js';

// import middlewares
import logger from './middleware/logger.js';

// import routes
import userRoutes from './routes/user.js';
import recipeRoutes from './routes/recipe.js';

// load environment variables
dotenv.config();
const PORT = process.env.PORT || 5003;

// construct the path
const __filename = fileURLToPath(import.meta.url);
const PATH = dirname(__filename);

// connect to database
connectToDB();

// initialize express
const app = express();

// cors allow the server to accept request from different origin
app.use(
    cors({
        origin: ['http://localhost:5173'],
        credentials: true
    })
);

// parses
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// serve static files
app.use(express.static(path.join(PATH, 'dist')));

// use middlewares
app.use(logger);

// use routes
app.use('/api', userRoutes);
app.use('/api', recipeRoutes);

// handle 404
app.use('*', (req, res) => {
    res.status(404).json({ message: '404 - Not Found' });
});

// handle errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: '500 - Internal Server Error' });
});

// listen to port
app.listen(PORT, () => {
    console.log(`server is up and running on port :  http://localhost:${PORT}`);
});
