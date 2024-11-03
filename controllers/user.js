import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

import validateEmail from '../utils/validateEmail.js';
import validatePassword from '../utils/validatePassword.js';
import matchPasswords from '../utils/matchPasswords.js';
import hashPassword from '../utils/hashPassword.js';

const userControllers = {
    register: async (req, res) => {
        try {
            const { email, password, rePassword } = req.body;
            const userExist = await User.findOne({ email: email });
            if (userExist) {
                return res.status(400).json({
                    message: 'User already exists, please login!'
                });
            }

            const isValidEmail = validateEmail(email);
            const isValidPassword = validatePassword(password);
            const passwordsMatch = matchPasswords(password, rePassword);

            if (isValidEmail && isValidPassword && passwordsMatch) {
                const hashedPassword = await hashPassword(password);

                const newUser = new User({
                    email,
                    password: hashedPassword
                });
                await newUser.save();
                res.status(201).json(newUser);
            } else {
                return res
                    .status(400)
                    .json({ message: 'Invalid email or password.' });
            }
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const userExist = await User.findOne({ email: email });
            if (!userExist) {
                return res
                    .status(400)
                    .json({ message: 'User does not exists, please register' });
            }
            bcrypt.compare(password, userExist.password, (err, isValid) => {
                if (err) {
                    return res
                        .status(400)
                        .json({ message: 'Internal server error' });
                }

                if (isValid) {
                    const token = jwt.sign(
                        { id: userExist._id },
                        process.env.TOKEN_SECRET
                    );
                    res.cookie('token', token, { httpOnly: true });
                    res.cookie('email', userExist.email);
                    res.status(200).json(userExist);
                } else {
                    return res
                        .status(400)
                        .json({ message: 'Invalid email or password.' });
                }
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    logout: async (req, res) => {
        res.clearCookie('token');
        res.clearCookie('email');
        res.status(200).json({ message: 'Logout successfully' });
    }
};

export default userControllers;
