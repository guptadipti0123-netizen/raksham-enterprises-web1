import express from 'express';
import { serviceRequestController } from '../controllers/serviceRequestController.js';
import { verifyToken, requireRoles } from '../middlewares/authMiddleware.js';
import { apiLimiter } from '../middlewares/rateLimiter.js';

const router = express.Router();

// Public: Track Complaint by Ticket Number (8-stage progress tracker)
router.get('/track/:ticketNo', apiLimiter, serviceRequestController.trackByTicketNo);

// Public / Authenticated: Create Service Complaint (AMC Priority or Non-AMC ₹800 Repair)
router.post('/', apiLimiter, serviceRequestController.createServiceRequest);

// Protected: List service requests (Scoped for Customer, Global for Admin/Technician)
router.get('/', verifyToken, serviceRequestController.getServiceRequests);

// Protected: Update Ticket Status (Technician / Admin)
router.put('/:id/status', verifyToken, requireRoles(['ADMIN', 'TECHNICIAN']), serviceRequestController.updateStatus);

// Public / Customer: Approve / Decline Spare Parts Estimate
router.post('/:id/estimate-approve', apiLimiter, serviceRequestController.approveEstimate);

export default router;
