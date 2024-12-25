import express from 'express';
import { login, register, resetPassword } from '../controllers/authController';

const router = express.Router();

/**
 * @route POST /login
 * @desc Login user
 */
router.post('/login', login);

/**
 * @route POST /register
 * @desc Register new user
 */
router.post('/register', register);

/**
 * @route POST /reset-password
 * @desc Reset user password
    */
router.post('/reset-password', resetPassword);

export default router;