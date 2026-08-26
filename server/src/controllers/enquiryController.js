import { PrismaClient, EnquiryStatus } from '@prisma/client';

const prisma = new PrismaClient();

export const enquiryController = {
  /**
   * Submit Website Contact / Free Survey Enquiry
   * POST /api/enquiries
   */
  async createEnquiry(req, res) {
    try {
      const { name, mobile, email, location, propertyType, serviceRequired, message } = req.body;

      if (!name || !mobile) {
        return res.status(400).json({
          success: false,
          error: 'Validation Error',
          message: 'Name and Mobile Number are required.'
        });
      }

      const enquiryNo = `ENQ-${Date.now().toString().slice(-4)}`;

      const enquiry = await prisma.enquiry.create({
        data: {
          enquiryNo,
          name,
          mobile,
          email: email || null,
          location: location || 'Mumbai',
          propertyType: propertyType || 'Residential Society',
          serviceRequired: serviceRequired || 'CCTV Installation',
          message: message || 'Free site consultation requested.',
          status: EnquiryStatus.NEW
        }
      });

      return res.status(201).json({
        success: true,
        message: 'Enquiry received. Our security engineer will call you shortly.',
        enquiry
      });
    } catch (err) {
      console.error('Enquiry create error:', err);
      return res.status(500).json({ success: false, error: err.message });
    }
  },

  /**
   * Get All Enquiries (Admin Only)
   * GET /api/enquiries
   */
  async getEnquiries(req, res) {
    try {
      const { status } = req.query;
      const where = status ? { status: status.toUpperCase() } : {};

      const enquiries = await prisma.enquiry.findMany({
        where,
        orderBy: { createdAt: 'desc' }
      });

      return res.json({ success: true, count: enquiries.length, enquiries });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  },

  /**
   * Update Enquiry Status
   * PUT /api/enquiries/:id
   */
  async updateEnquiryStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const updated = await prisma.enquiry.update({
        where: { id },
        data: { status }
      });

      return res.json({ success: true, enquiry: updated });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }
};
