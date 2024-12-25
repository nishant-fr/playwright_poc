import express from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/userController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/me', authenticateToken, (req, res) =>
    getUserProfile(req, res)
);

router.put('/me', authenticateToken, (req, res) =>
    updateUserProfile(req, res)
);

export default router;
