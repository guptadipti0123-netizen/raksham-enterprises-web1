import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const customerController = {
  /**
   * Get All Customers (Admin Only)
   * GET /api/customers
   */
  async getCustomers(req, res) {
    try {
      const customers = await prisma.customer.findMany({
        include: {
          equipment: true,
          amcContracts: true,
          _count: {
            select: {
              serviceRequests: true,
              serviceReports: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      });

      return res.json({ success: true, count: customers.length, customers });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  },

  /**
   * Get Single Customer by ID or Customer No
   * GET /api/customers/:id
   */
  async getCustomerById(req, res) {
    try {
      const { id } = req.params;

      // Search by UUID or by Customer No (e.g. ULV2601)
      const customer = await prisma.customer.findFirst({
        where: {
          OR: [
            { id },
            { customerNo: id.toUpperCase() }
          ]
        },
        include: {
          equipment: true,
          amcContracts: true,
          serviceRequests: {
            orderBy: { reportedDate: 'desc' },
            take: 10
          },
          serviceReports: {
            orderBy: { visitDate: 'desc' },
            take: 10
          }
        }
      });

      if (!customer) {
        return res.status(404).json({ success: false, error: 'Customer not found' });
      }

      return res.json({ success: true, customer });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  },

  /**
   * Update Customer Profile
   * PUT /api/customers/:id
   */
  async updateCustomer(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const updated = await prisma.customer.update({
        where: { id },
        data: updateData
      });

      return res.json({ success: true, customer: updated });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }
};
