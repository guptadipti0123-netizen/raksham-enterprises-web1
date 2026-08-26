import express from 'express';
import { serviceReportController } from '../controllers/serviceReportController.js';
import { verifyToken, requireRoles } from '../middlewares/authMiddleware.js';

const router = express.Router();

// List Service Reports (Scoped for Customer, Global for Admin/Technician)
router.get('/', verifyToken, serviceReportController.getServiceReports);

// Get Single Service Report Details
router.get('/:id', verifyToken, serviceReportController.getServiceReportById);

// Create New Service Report, Generate PDF & Upload to S3 (Technician / Admin)
router.post('/', verifyToken, requireRoles(['ADMIN', 'TECHNICIAN']), serviceReportController.createServiceReport);

// Re-generate PDF and Get S3 Signed Download URL (Technician / Admin)
router.post('/:id/generate-pdf', verifyToken, requireRoles(['ADMIN', 'TECHNICIAN']), serviceReportController.generatePdf);

export default router;
