import express from 'express';
import { customerController } from '../controllers/customerController.js';
import { verifyToken, requireRoles, verifyCustomerOwnership } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Admin: View all customers
router.get('/', verifyToken, requireRoles(['ADMIN']), customerController.getCustomers);

// Customer / Admin: View single customer
router.get('/:id', verifyToken, verifyCustomerOwnership('id'), customerController.getCustomerById);

// Customer / Admin: Update customer profile
router.put('/:id', verifyToken, verifyCustomerOwnership('id'), customerController.updateCustomer);

export default router;
