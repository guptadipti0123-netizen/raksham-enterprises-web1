import express from 'express';
import { uploadController } from '../controllers/uploadController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Request Presigned S3 Upload URL (Authenticated Users)
router.post('/signed-url', verifyToken, uploadController.getSignedUploadUrl);

// Serve Local Fallback Storage File in Development
router.get('/local/:filename', uploadController.serveLocalFile);

export default router;
