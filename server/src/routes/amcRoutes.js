import express from 'express';
import { amcController } from '../controllers/amcController.js';
import { verifyToken, requireRoles } from '../middlewares/authMiddleware.js';

const router = express.Router();

// List AMC Contracts (Scoped for Customer, Global for Admin)
router.get('/', verifyToken, amcController.getAmcContracts);

// Create New AMC Contract (Admin Only)
router.post('/', verifyToken, requireRoles(['ADMIN']), amcController.createAmcContract);

// Update AMC Contract (Admin Only)
router.put('/:id', verifyToken, requireRoles(['ADMIN']), amcController.updateAmcContract);

export default router;
