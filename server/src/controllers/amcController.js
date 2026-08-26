import { PrismaClient, AmcStatus } from '@prisma/client';

const prisma = new PrismaClient();

export const amcController = {
  /**
   * Get AMC Contracts (Scoped for Customer, Global for Admin)
   * GET /api/amc
   */
  async getAmcContracts(req, res) {
    try {
      const where = {};

      if (req.user && req.user.role === 'CUSTOMER') {
        if (!req.user.customer) {
          return res.json({ success: true, amcContracts: [] });
        }
        where.customerId = req.user.customer.id;
      }

      const contracts = await prisma.amcContract.findMany({
        where,
        include: {
          customer: true,
          amcServices: {
            orderBy: { scheduledDate: 'asc' }
          }
        },
        orderBy: { startDate: 'desc' }
      });

      return res.json({ success: true, count: contracts.length, amcContracts: contracts });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  },

  /**
   * Create New AMC Contract (Admin Only)
   * POST /api/amc
   */
  async createAmcContract(req, res) {
    try {
      const { customerId, planName, startDate, endDate, frequency, nextServiceDate, notes } = req.body;

      const contract = await prisma.amcContract.create({
        data: {
          customerId,
          planName: planName || 'Comprehensive Shield AMC',
          startDate: new Date(startDate || Date.now()),
          endDate: new Date(endDate || new Date().setFullYear(new Date().getFullYear() + 1)),
          frequency: frequency || 'Quarterly (4 Preventive Visits/Year)',
          nextServiceDate: nextServiceDate ? new Date(nextServiceDate) : null,
          status: AmcStatus.ACTIVE,
          notes
        }
      });

      return res.status(201).json({ success: true, amcContract: contract });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  },

  /**
   * Update AMC Status
   * PUT /api/amc/:id
   */
  async updateAmcContract(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const updated = await prisma.amcContract.update({
        where: { id },
        data: updateData
      });

      return res.json({ success: true, amcContract: updated });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }
};
