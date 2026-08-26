import express from 'express';
import { authController } from '../controllers/authController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { authLimiter } from '../middlewares/rateLimiter.js';

const router = express.Router();

// Public Auth Endpoints
router.post('/login', authLimiter, authController.login);
router.post('/register', authLimiter, authController.register);

// Protected Auth Endpoints
router.get('/me', verifyToken, authController.getMe);

export default router;
