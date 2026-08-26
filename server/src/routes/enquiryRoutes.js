import express from 'express';
import { enquiryController } from '../controllers/enquiryController.js';
import { verifyToken, requireRoles } from '../middlewares/authMiddleware.js';
import { apiLimiter } from '../middlewares/rateLimiter.js';

const router = express.Router();

// Public: Submit Website Contact Form / Survey Request
router.post('/', apiLimiter, enquiryController.createEnquiry);

// Protected: Admin Enquiry Management
router.get('/', verifyToken, requireRoles(['ADMIN']), enquiryController.getEnquiries);
router.put('/:id', verifyToken, requireRoles(['ADMIN']), enquiryController.updateEnquiryStatus);

export default router;
