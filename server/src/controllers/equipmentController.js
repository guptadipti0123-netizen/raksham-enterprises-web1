import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const equipmentController = {
  /**
   * Get Equipment List (Scoped for Customer, Global for Admin)
   * GET /api/equipment
   */
  async getEquipment(req, res) {
    try {
      const where = {};

      if (req.user && req.user.role === 'CUSTOMER') {
        if (!req.user.customer) {
          return res.json({ success: true, equipment: [] });
        }
        where.customerId = req.user.customer.id;
      }

      const equipmentList = await prisma.equipment.findMany({
        where,
        include: { customer: true },
        orderBy: { createdAt: 'desc' }
      });

      return res.json({ success: true, count: equipmentList.length, equipment: equipmentList });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  },

  /**
   * Create Equipment Item (Admin Only)
   * POST /api/equipment
   */
  async createEquipment(req, res) {
    try {
      const { customerId, systemType, brand, model, serialNo, cameraCount, locationTag, installDate, warrantyExpiry } = req.body;

      const newEquipment = await prisma.equipment.create({
        data: {
          customerId,
          systemType,
          brand,
          model,
          serialNo,
          cameraCount: parseInt(cameraCount) || 8,
          locationTag: locationTag || 'Main Entrance & Perimeter',
          installDate: installDate ? new Date(installDate) : new Date(),
          warrantyExpiry: warrantyExpiry ? new Date(warrantyExpiry) : null
        }
      });

      return res.status(201).json({ success: true, equipment: newEquipment });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }
};
