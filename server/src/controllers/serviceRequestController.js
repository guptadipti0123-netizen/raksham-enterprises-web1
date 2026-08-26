import { PrismaClient, ServiceRequestType, ServiceRequestStatus } from '@prisma/client';

const prisma = new PrismaClient();

export const serviceRequestController = {
  /**
   * List Service Requests (Scoped for Customers, Global for Admin/Technician)
   * GET /api/service-requests
   */
  async getServiceRequests(req, res) {
    try {
      const { status, serviceType } = req.query;
      const where = {};

      // If Customer, restrict strictly to their own customerId
      if (req.user && req.user.role === 'CUSTOMER') {
        if (!req.user.customer) {
          return res.json({ success: true, serviceRequests: [] });
        }
        where.customerId = req.user.customer.id;
      }

      if (status) where.status = status;
      if (serviceType) where.serviceType = serviceType;

      const requests = await prisma.serviceRequest.findMany({
        where,
        include: {
          customer: true,
          technician: true
        },
        orderBy: { reportedDate: 'desc' }
      });

      return res.json({ success: true, count: requests.length, serviceRequests: requests });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  },

  /**
   * Create New Service Request (AMC Priority or Non-AMC Paid Repair)
   * POST /api/service-requests
   */
  async createServiceRequest(req, res) {
    try {
      const {
        customerId,
        customerName,
        contactPhone,
        location,
        serviceType = 'AMC_PRIORITY',
        issueType,
        priority = 'High (AMC Priority Queue)',
        notes
      } = req.body;

      const today = new Date();
      const dateStr = `${today.getFullYear()}${(today.getMonth() + 1).toString().padStart(2, '0')}${today.getDate().toString().padStart(2, '0')}`;
      const prefix = serviceType === 'NON_AMC_PAID' ? 'NAC' : 'AMC';
      const rand = Math.floor(100 + Math.random() * 900);
      const ticketNo = `${prefix}-${dateStr}-${rand}`;

      const newRequest = await prisma.serviceRequest.create({
        data: {
          ticketNo,
          customerId: customerId || req.user?.customer?.id || null,
          customerName: customerName || req.user?.customer?.name || 'Customer Site',
          contactPhone: contactPhone || req.user?.customer?.contactPhone || '+91 9867890606',
          location: location || req.user?.customer?.location || 'Mumbai',
          serviceType: serviceType === 'NON_AMC_PAID' ? ServiceRequestType.NON_AMC_PAID : ServiceRequestType.AMC_PRIORITY,
          issueType: issueType || 'Camera Video Loss / CCTV Inspection',
          priority,
          status: ServiceRequestStatus.REQUEST_RECEIVED,
          visitCharge: serviceType === 'NON_AMC_PAID' ? 800.00 : 0.00,
          technicianName: 'Rakesh Toraskar',
          technicianPhone: '+91 90291 14205',
          scheduledTime: serviceType === 'NON_AMC_PAID' ? 'Scheduled within 24 Hours' : 'Within 4 Hours (AMC SLA)',
          notes
        }
      });

      return res.status(201).json({
        success: true,
        message: 'Service request created successfully',
        ticketNo: newRequest.ticketNo,
        serviceRequest: newRequest
      });
    } catch (err) {
      console.error('Service request create error:', err);
      return res.status(500).json({ success: false, error: err.message });
    }
  },

  /**
   * Public Complaint Tracker by Ticket Number
   * GET /api/service-requests/track/:ticketNo
   */
  async trackByTicketNo(req, res) {
    try {
      const { ticketNo } = req.params;

      const request = await prisma.serviceRequest.findFirst({
        where: {
          OR: [
            { ticketNo: ticketNo.trim().toUpperCase() },
            { id: ticketNo.trim() }
          ]
        },
        include: {
          customer: true,
          technician: true
        }
      });

      if (!request) {
        return res.status(404).json({
          success: false,
          error: 'Not Found',
          message: `No service ticket found matching '${ticketNo}'. Please check your complaint number.`
        });
      }

      return res.json({ success: true, serviceRequest: request });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  },

  /**
   * Update Ticket Status (Technician / Admin)
   * PUT /api/service-requests/:id/status
   */
  async updateStatus(req, res) {
    try {
      const { id } = req.params;
      const { status, technicianName, technicianPhone, estimateParts, estimateStatus } = req.body;

      const updated = await prisma.serviceRequest.update({
        where: { id },
        data: {
          status,
          ...(technicianName ? { technicianName } : {}),
          ...(technicianPhone ? { technicianPhone } : {}),
          ...(estimateParts ? { estimateParts } : {}),
          ...(estimateStatus ? { estimateStatus } : {})
        }
      });

      return res.json({ success: true, serviceRequest: updated });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  },

  /**
   * Approve / Decline Spare Parts Estimate (Customer)
   * POST /api/service-requests/:id/estimate-approve
   */
  async approveEstimate(req, res) {
    try {
      const { id } = req.params;
      const { approved = true } = req.body;

      const updated = await prisma.serviceRequest.update({
        where: { id },
        data: {
          estimateStatus: approved ? 'Approved' : 'Declined',
          status: approved ? ServiceRequestStatus.IN_PROGRESS : ServiceRequestStatus.CANCELLED
        }
      });

      return res.json({
        success: true,
        message: approved ? 'Estimate approved. Technician will proceed with repair.' : 'Estimate declined.',
        serviceRequest: updated
      });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }
};
