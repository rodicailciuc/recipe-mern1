import express from 'express';

import userControllers from '../controllers/user.js';

const { register, login, logout } = userControllers;

const router = express.Router();

// routes
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

export default router;
