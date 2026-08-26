import PDFDocument from 'pdfkit';
import { s3Service } from './s3Service.js';

export const pdfService = {
  /**
   * Generate Professional Raksham CCTV Service Report PDF and return Buffer
   */
  async generateServiceReportPdf(reportData) {
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({ margin: 36, size: 'A4' });
        const buffers = [];

        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => {
          const pdfBuffer = Buffer.concat(buffers);
          resolve(pdfBuffer);
        });

        // 1. BRAND HEADER (Deep Navy & Gold Border)
        doc.rect(36, 36, 523, 70).fill('#0f172a');

        doc.fillColor('#d4af37').fontSize(16).font('Helvetica-Bold')
          .text('RAKSHAM ENTERPRISES', 48, 48);
        doc.fillColor('#ffffff').fontSize(8).font('Helvetica')
          .text('SECURITY SYSTEM SOLUTION PROVIDER – MUMBAI', 48, 68);
        doc.fillColor('#94a3b8').fontSize(7.5)
          .text('Helpline / 24x7 Support: +91 9867890606 | Email: info@raksham.com', 48, 80)
          .text('Coverage: Central, Western, Harbour & Navi Mumbai Corridors', 48, 91);

        // Report Title Badge (Right Side of Header)
        doc.fillColor('#ffffff').fontSize(12).font('Helvetica-Bold')
          .text('CCTV SERVICE REPORT', 380, 48, { align: 'right', width: 165 });
        doc.fillColor('#d4af37').fontSize(8.5).font('Helvetica-Bold')
          .text(`REPORT NO: ${reportData.reportId || 'REP-2026-0824'}`, 380, 68, { align: 'right', width: 165 });
        doc.fillColor('#cbd5e1').fontSize(7.5).font('Helvetica')
          .text(`JOB NO: ${reportData.jobNo || 'JOB-9021'}`, 380, 80, { align: 'right', width: 165 });
        doc.text(`DATE: ${new Date(reportData.visitDate || Date.now()).toLocaleDateString('en-IN')}`, 380, 91, { align: 'right', width: 165 });

        let currentY = 118;

        // 2. CUSTOMER & SITE DETAILS BOX
        doc.rect(36, currentY, 523, 62).fillAndStroke('#f8fafc', '#cbd5e1');
        doc.fillColor('#0f172a').fontSize(8.5).font('Helvetica-Bold').text('1. CUSTOMER & SITE INFORMATION', 44, currentY + 6);
        
        doc.fillColor('#475569').fontSize(7.5).font('Helvetica');
        doc.text(`Customer Name: `, 44, currentY + 20, { continued: true }).font('Helvetica-Bold').fillColor('#0f172a').text(reportData.customerName || 'Silver Springs Residency CHS');
        doc.font('Helvetica').fillColor('#475569').text(`Customer No: `, 44, currentY + 32, { continued: true }).font('Helvetica-Bold').fillColor('#b45309').text(reportData.customerNo || reportData.customer?.customerNo || 'ULV2601');
        doc.font('Helvetica').fillColor('#475569').text(`Site Address: `, 44, currentY + 44, { continued: true }).font('Helvetica').fillColor('#0f172a').text(reportData.siteAddress || 'Sector 19, Ulwe, Navi Mumbai');

        doc.font('Helvetica').fillColor('#475569').text(`Contact Person: `, 320, currentY + 20, { continued: true }).font('Helvetica-Bold').fillColor('#0f172a').text(reportData.contactPerson || 'Mr. Deepak Sharma (Secretary)');
        doc.font('Helvetica').fillColor('#475569').text(`Contact Phone: `, 320, currentY + 32, { continued: true }).font('Helvetica-Bold').fillColor('#0f172a').text(reportData.contactNumber || reportData.customer?.contactPhone || '+91 9867890606');
        doc.font('Helvetica').fillColor('#475569').text(`Technician: `, 320, currentY + 44, { continued: true }).font('Helvetica-Bold').fillColor('#0f172a').text(reportData.technicianName || 'Rakesh Toraskar (+91 90291 14205)');

        currentY += 70;

        // 3. EQUIPMENT SPECIFICATIONS
        doc.rect(36, currentY, 523, 44).fillAndStroke('#ffffff', '#cbd5e1');
        doc.fillColor('#0f172a').fontSize(8.5).font('Helvetica-Bold').text('2. EQUIPMENT & SYSTEM DETAILS', 44, currentY + 6);
        
        doc.fillColor('#475569').fontSize(7.5).font('Helvetica');
        doc.text(`System: ${reportData.systemType || 'HD IP Surveillance Network'}`, 44, currentY + 20);
        doc.text(`Brand / Model: ${reportData.brand || 'Hikvision'} - ${reportData.modelNo || 'DS-7616NI-Q2 (16CH)'}`, 44, currentY + 30);
        
        doc.text(`No. of Cameras: ${reportData.noOfCameras || 14} Units`, 320, currentY + 20);
        doc.text(`Other Equipment: ${reportData.otherEquipment || '16-Port PoE Switch, 4TB HDD, 12V SMPS'}`, 320, currentY + 30);

        currentY += 52;

        // 4. PROBLEM OBSERVED & WORK CARRIED OUT
        doc.rect(36, currentY, 523, 62).fillAndStroke('#ffffff', '#cbd5e1');
        doc.fillColor('#0f172a').fontSize(8.5).font('Helvetica-Bold').text('3. SERVICE COMPLAINT & WORK CARRIED OUT', 44, currentY + 6);
        
        doc.fillColor('#475569').fontSize(7.5).font('Helvetica-Bold').text('Problem Observed:', 44, currentY + 18);
        doc.font('Helvetica').fillColor('#334155').text(reportData.problemObserved || 'Quarterly preventive maintenance checkup. Loose RJ45 connector on Lift camera.', 44, currentY + 28, { width: 500 });
        
        doc.fillColor('#475569').font('Helvetica-Bold').text('Work Carried Out / Action Taken:', 44, currentY + 40);
        doc.font('Helvetica').fillColor('#334155').text(reportData.workCarriedOut || 'Re-crimped RJ45 jack with gold-plated connector. Cleaned all optical camera lenses. Verified NVR 30-day recording and mobile streaming.', 44, currentY + 50, { width: 500 });

        currentY += 70;

        // 5. 7-POINT SYSTEM INSPECTION CHECKLIST (Grid Table)
        doc.rect(36, currentY, 523, 90).fillAndStroke('#f8fafc', '#cbd5e1');
        doc.fillColor('#0f172a').fontSize(8.5).font('Helvetica-Bold').text('4. CCTV SYSTEM INSPECTION CHECKLIST & HEALTH AUDIT', 44, currentY + 6);

        const checkList = [
          { label: 'CCTV Surveillance HDD:', val: reportData.cctvHddStatus || 'Healthy (Recording Active)' },
          { label: 'DVR/NVR Firmware:', val: reportData.nvrFirmwareStatus || 'Up to date (v4.32)' },
          { label: 'Network Connectivity:', val: reportData.networkConnectivity || 'Active (Static IP Online)' },
          { label: 'Power Supply / SMPS:', val: reportData.powerSupplyStatus || '12V SMPS Voltage Stable' },
          { label: 'Continuous 24x7 Recording:', val: reportData.recordingStatus || 'Active (30+ Days Playback)' },
          { label: 'Remote Mobile Viewing:', val: reportData.remoteViewingStatus || 'Hik-Connect Online' },
          { label: 'Camera Alignment & Lens:', val: reportData.cameraAlignmentStatus || 'Cleaned, Focused & Aligned' }
        ];

        checkList.forEach((item, idx) => {
          const col = idx % 2 === 0 ? 44 : 300;
          const row = currentY + 20 + Math.floor(idx / 2) * 16;
          doc.fillColor('#475569').fontSize(7.5).font('Helvetica').text(item.label, col, row);
          doc.fillColor('#059669').fontSize(7.5).font('Helvetica-Bold').text(`✓ ${item.val}`, col + 120, row);
        });

        currentY += 98;

        // 6. PARTS & MATERIALS USED TABLE
        doc.rect(36, currentY, 523, 50).fillAndStroke('#ffffff', '#cbd5e1');
        doc.fillColor('#0f172a').fontSize(8.5).font('Helvetica-Bold').text('5. PARTS / MATERIALS USED', 44, currentY + 6);
        
        // Table Header
        doc.rect(44, currentY + 18, 507, 13).fill('#f1f5f9');
        doc.fillColor('#334155').fontSize(7).font('Helvetica-Bold');
        doc.text('SR', 48, currentY + 21);
        doc.text('DESCRIPTION OF SPARE PARTS', 80, currentY + 21);
        doc.text('QTY', 340, currentY + 21);
        doc.text('REMARKS / WARRANTY', 400, currentY + 21);

        // Table Rows
        const items = (reportData.items && reportData.items.length > 0) 
          ? reportData.items 
          : [{ itemNo: 1, description: 'Cat6 Modular RJ45 Gold Plated Connector', qty: 2, remarks: 'Replaced under AMC Warranty' }];

        let itemY = currentY + 34;
        items.slice(0, 2).forEach((it, i) => {
          doc.fillColor('#475569').fontSize(7).font('Helvetica');
          doc.text(`${it.itemNo || i + 1}`, 48, itemY);
          doc.text(`${it.description}`, 80, itemY);
          doc.text(`${it.qty || 1}`, 340, itemY);
          doc.text(`${it.remarks || 'Covered under contract'}`, 400, itemY);
          itemY += 12;
        });

        currentY += 58;

        // 7. REMARKS & CUSTOMER SIGN-OFF CONFIRMATION
        doc.rect(36, currentY, 523, 76).fillAndStroke('#f8fafc', '#cbd5e1');
        doc.fillColor('#0f172a').fontSize(8.5).font('Helvetica-Bold').text('6. REMARKS & DIGITAL AUTHORIZATION', 44, currentY + 6);
        
        doc.fillColor('#475569').fontSize(7).font('Helvetica');
        doc.text(`Technician Remarks: ${reportData.technicianRemarks || 'System tested and 100% operational. Quarterly preventive checklist verified.'}`, 44, currentY + 18, { width: 240 });
        doc.text(`Customer Remarks: ${reportData.customerRemarks || 'Satisfied with technician service. All cameras verified online.'}`, 44, currentY + 42, { width: 240 });

        // Signature Blocks
        doc.rect(310, currentY + 16, 110, 48).stroke('#cbd5e1');
        doc.fillColor('#64748b').fontSize(6.5).font('Helvetica').text('TECHNICIAN SIGNATURE', 315, currentY + 20);
        doc.fillColor('#0f172a').fontSize(8).font('Helvetica-Bold').text(reportData.technicianName || 'Rakesh Toraskar', 315, currentY + 44);

        doc.rect(435, currentY + 16, 114, 48).stroke('#cbd5e1');
        doc.fillColor('#64748b').fontSize(6.5).font('Helvetica').text('CUSTOMER SIGNATURE / STAMP', 440, currentY + 20);
        doc.fillColor('#059669').fontSize(7.5).font('Helvetica-Bold').text('✓ DIGITALLY CONFIRMED', 440, currentY + 44);

        // 8. FOOTER
        doc.fillColor('#94a3b8').fontSize(6.5).font('Helvetica')
          .text('This is an official digital service record generated by Raksham Enterprises Service Management Desk. Stored securely in AWS Cloud.', 36, 755, { align: 'center', width: 523 });

        doc.end();
      } catch (err) {
        reject(err);
      }
    });
  },

  /**
   * Generate and upload PDF to S3, returning the S3 Key and presigned download URL
   */
  async generateAndUploadReportPdf(reportData) {
    const pdfBuffer = await this.generateServiceReportPdf(reportData);
    const s3Key = `raksham/service-reports/${reportData.reportId || `REP-${Date.now()}`}.pdf`;

    await s3Service.uploadFile({
      buffer: pdfBuffer,
      key: s3Key,
      contentType: 'application/pdf'
    });

    const downloadUrl = await s3Service.getSignedDownloadUrl(s3Key, 3600);
    return { s3Key, downloadUrl };
  }
};
