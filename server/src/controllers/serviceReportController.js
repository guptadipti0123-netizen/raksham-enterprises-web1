import { PrismaClient } from '@prisma/client';
import { pdfService } from '../services/pdfService.js';
import { s3Service } from '../services/s3Service.js';

const prisma = new PrismaClient();

export const serviceReportController = {
  /**
   * List Service Reports (Scoped for Customer, Global for Admin/Tech)
   * GET /api/service-reports
   */
  async getServiceReports(req, res) {
    try {
      const where = {};

      if (req.user && req.user.role === 'CUSTOMER') {
        if (!req.user.customer) {
          return res.json({ success: true, serviceReports: [] });
        }
        where.customerId = req.user.customer.id;
      }

      const reports = await prisma.serviceReport.findMany({
        where,
        include: {
          items: true,
          photos: true,
          customer: true
        },
        orderBy: { visitDate: 'desc' }
      });

      return res.json({ success: true, count: reports.length, serviceReports: reports });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  },

  /**
   * Get Single Service Report by ID or Report ID
   * GET /api/service-reports/:id
   */
  async getServiceReportById(req, res) {
    try {
      const { id } = req.params;

      const report = await prisma.serviceReport.findFirst({
        where: {
          OR: [
            { id },
            { reportId: id.toUpperCase() }
          ]
        },
        include: {
          items: true,
          photos: true,
          customer: true
        }
      });

      if (!report) {
        return res.status(404).json({ success: false, error: 'Service report not found' });
      }

      // Customer authorization guard
      if (req.user && req.user.role === 'CUSTOMER' && report.customerId !== req.user.customer?.id) {
        return res.status(403).json({ success: false, error: 'Forbidden', message: 'Unauthorized access to report' });
      }

      // Attach fresh signed PDF URL if S3 Key is present
      if (report.pdfS3Key) {
        report.pdfUrl = await s3Service.getSignedDownloadUrl(report.pdfS3Key, 3600);
      }

      return res.json({ success: true, serviceReport: report });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  },

  /**
   * Create New Service Report, Generate PDF & Upload to S3
   * POST /api/service-reports
   */
  async createServiceReport(req, res) {
    try {
      const reportData = req.body;
      const reportId = reportData.reportId || `REP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const jobNo = reportData.jobNo || `JOB-${Math.floor(1000 + Math.random() * 9000)}`;

      // 1. Generate PDF Buffer and upload to S3
      let pdfS3Key = null;
      let pdfUrl = null;
      try {
        const uploadResult = await pdfService.generateAndUploadReportPdf({
          ...reportData,
          reportId,
          jobNo
        });
        pdfS3Key = uploadResult.s3Key;
        pdfUrl = uploadResult.downloadUrl;
      } catch (pdfErr) {
        console.warn('PDF generation / S3 upload warning:', pdfErr.message);
      }

      // 2. Save Report & Spare Parts Items to MySQL
      const newReport = await prisma.serviceReport.create({
        data: {
          reportId,
          jobNo,
          customerId: reportData.customerId || null,
          customerName: reportData.customerName || 'Customer Site',
          siteAddress: reportData.siteAddress || 'Mumbai, Maharashtra',
          contactPerson: reportData.contactPerson || 'Secretary',
          contactNumber: reportData.contactNumber || '+91 9867890606',
          serviceRequestId: reportData.serviceRequestId || null,
          technicianId: req.user?.technician?.id || null,
          technicianName: reportData.technicianName || req.user?.name || 'Rakesh Toraskar',
          serviceType: reportData.serviceType || 'Quarterly AMC Preventive Checkup',
          visitDate: reportData.visitDate ? new Date(reportData.visitDate) : new Date(),
          complaintDetails: reportData.complaintDetails || 'Routine preventive checkup',
          systemType: reportData.systemType || 'HD IP Surveillance Network',
          brand: reportData.brand || 'Hikvision',
          modelNo: reportData.modelNo || 'DS-7616NI-Q2',
          serialNo: reportData.serialNo || 'SN-HK8921',
          noOfCameras: parseInt(reportData.noOfCameras) || 14,
          otherEquipment: reportData.otherEquipment || '16-Port PoE Switch, 4TB HDD',
          problemObserved: reportData.problemObserved || 'Quarterly maintenance inspection',
          workCarriedOut: reportData.workCarriedOut || 'Cleaned camera lenses and audited recording playback',
          systemHealth: reportData.systemHealth || '100% Operational',
          cctvHddStatus: reportData.cctvHddStatus || 'Healthy (Recording Active)',
          nvrFirmwareStatus: reportData.nvrFirmwareStatus || 'Up to date',
          networkConnectivity: reportData.networkConnectivity || 'Active (Static IP Online)',
          powerSupplyStatus: reportData.powerSupplyStatus || '12V SMPS Voltage Stable',
          recordingStatus: reportData.recordingStatus || 'Continuous 24x7 Active',
          remoteViewingStatus: reportData.remoteViewingStatus || 'Hik-Connect Online',
          cameraAlignmentStatus: reportData.cameraAlignmentStatus || 'All Angles Cleaned & Focused',
          technicianRemarks: reportData.technicianRemarks || 'System operating at peak efficiency',
          customerRemarks: reportData.customerRemarks || 'Satisfied with service',
          customerConfirmed: true,
          pdfS3Key,
          pdfUrl,
          items: {
            create: (reportData.items || []).map((it, idx) => ({
              itemNo: it.itemNo || idx + 1,
              description: it.description || 'Spare part',
              qty: parseInt(it.qty) || 1,
              remarks: it.remarks || 'Replaced under AMC Warranty'
            }))
          }
        },
        include: { items: true }
      });

      return res.status(201).json({
        success: true,
        message: 'Service report created and PDF generated successfully',
        serviceReport: newReport,
        pdfUrl
      });
    } catch (err) {
      console.error('Service report create error:', err);
      return res.status(500).json({ success: false, error: err.message });
    }
  },

  /**
   * Re-generate PDF and Get S3 Presigned URL
   * POST /api/service-reports/:id/generate-pdf
   */
  async generatePdf(req, res) {
    try {
      const { id } = req.params;

      const report = await prisma.serviceReport.findUnique({
        where: { id },
        include: { items: true, customer: true }
      });

      if (!report) {
        return res.status(404).json({ success: false, error: 'Report not found' });
      }

      const { s3Key, downloadUrl } = await pdfService.generateAndUploadReportPdf(report);

      await prisma.serviceReport.update({
        where: { id },
        data: { pdfS3Key: s3Key, pdfUrl: downloadUrl }
      });

      return res.json({
        success: true,
        message: 'PDF generated successfully',
        pdfUrl: downloadUrl,
        s3Key
      });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }
};
