import express from 'express';
import { equipmentController } from '../controllers/equipmentController.js';
import { verifyToken, requireRoles } from '../middlewares/authMiddleware.js';

const router = express.Router();

// List Equipment (Scoped for Customer, Global for Admin)
router.get('/', verifyToken, equipmentController.getEquipment);

// Add Equipment (Admin Only)
router.post('/', verifyToken, requireRoles(['ADMIN']), equipmentController.createEquipment);

export default router;
