import { PrismaClient, UserRole, UserStatus, AmcStatus, ServiceRequestType, PriorityLevel, ServiceRequestStatus, ServiceReportStatus, InspectionStatus, EnquiryStatus, EquipmentType } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Raksham Enterprises Local Database Seed...');

  // 1. Password Hashes (Dummy / Development Test Passwords)
  const adminPasswordHash = await bcrypt.hash('admin123', 12);
  const techPasswordHash = await bcrypt.hash('tech123', 12);
  const customerPasswordHash = await bcrypt.hash('customer123', 12);

  // 2. Seed Admin User
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@raksham.com' },
    update: {},
    create: {
      name: 'Raksham Operations Admin',
      email: 'admin@raksham.com',
      mobile: '+91 9867890606',
      passwordHash: adminPasswordHash,
      role: UserRole.ADMIN,
      status: UserStatus.ACTIVE
    }
  });
  console.log('✅ Admin user created:', adminUser.email);

  // 3. Seed Technician User & Profile
  const techUser = await prisma.user.upsert({
    where: { email: 'tech@raksham.com' },
    update: {},
    create: {
      name: 'Rakesh Toraskar',
      email: 'tech@raksham.com',
      mobile: '+91 90291 14205',
      passwordHash: techPasswordHash,
      role: UserRole.TECHNICIAN,
      status: UserStatus.ACTIVE,
      technician: {
        create: {
          name: 'Rakesh Toraskar',
          phone: '+91 90291 14205',
          email: 'tech@raksham.com',
          specialization: 'Senior CCTV & IP Networking Engineer',
          hub: 'Central Mumbai & Navi Mumbai Hub',
          status: UserStatus.ACTIVE
        }
      }
    },
    include: { technician: true }
  });
  const technician = techUser.technician;
  console.log('✅ Technician user created:', technician.name);

  // 4. Seed Primary Customer User & Profile (Silver Springs Residency CHS)
  const customerUser = await prisma.user.upsert({
    where: { email: 'contact@silversprings.com' },
    update: {},
    create: {
      name: 'Silver Springs Residency CHS',
      email: 'contact@silversprings.com',
      mobile: '+91 9867890606',
      passwordHash: customerPasswordHash,
      role: UserRole.CUSTOMER,
      status: UserStatus.ACTIVE,
      customer: {
        create: {
          customerName: 'Silver Springs Residency CHS',
          customerNumber: 'ULV2601',
          contactPerson: 'Mr. Deepak Sharma (Secretary)',
          contactNumber: '+91 9867890606',
          email: 'contact@silversprings.com',
          siteAddress: 'Plot 42, Sector 19, Ulwe, Navi Mumbai, Maharashtra 410206',
          city: 'Navi Mumbai',
          state: 'Maharashtra',
          pincode: '410206',
          status: AmcStatus.ACTIVE,
          amcType: 'Comprehensive Shield AMC',
          amcExpiry: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
          camerasCount: 14,
          notes: 'Premier housing society with 14 IP CCTV cameras, 16CH NVR and 4TB HDD under comprehensive AMC.'
        }
      }
    },
    include: { customer: true }
  });
  const customer = customerUser.customer;
  console.log('✅ Customer created:', customer.customerName, `(${customer.customerNumber})`);

  // 5. Seed Customer Equipment Inventory
  await prisma.equipment.createMany({
    data: [
      {
        customerId: customer.id,
        systemType: EquipmentType.CCTV_CAMERA,
        brand: 'Hikvision',
        model: 'DS-2CD1023G0E-I (2MP Full HD Bullet)',
        serialNumber: 'HK-CAM-88910',
        quantity: 10,
        status: 'Operational',
        installationDate: new Date('2024-01-15'),
        notes: 'Main Gate, Perimeter Walls, Parking Level 1 & 2'
      },
      {
        customerId: customer.id,
        systemType: EquipmentType.CCTV_CAMERA,
        brand: 'Hikvision',
        model: 'DS-2CD1123G0E-I (2MP Vandal Dome)',
        serialNumber: 'HK-CAM-99214',
        quantity: 4,
        status: 'Operational',
        installationDate: new Date('2024-01-15'),
        notes: 'Building Entrance Lobby, Lift Cabins A & B'
      },
      {
        customerId: customer.id,
        systemType: EquipmentType.NVR,
        brand: 'Hikvision',
        model: 'DS-7616NI-Q2 (16 Channel 4K NVR)',
        serialNumber: 'NVR-HK8921-2024',
        quantity: 1,
        status: 'Operational',
        installationDate: new Date('2024-01-15'),
        notes: 'Society Security Control Room Rack with 4TB SkyHawk HDD'
      }
    ],
    skipDuplicates: true
  });
  console.log('✅ Customer equipment seeded (3 Hardware Records)');

  // 6. Seed AMC Contract
  const amcContract = await prisma.amcContract.upsert({
    where: { contractNumber: 'AMC-2025-081' },
    update: {},
    create: {
      customerId: customer.id,
      contractNumber: 'AMC-2025-081',
      planName: 'Comprehensive Shield AMC (14 Cameras)',
      startDate: new Date('2025-01-01'),
      endDate: new Date('2026-12-31'),
      serviceFrequency: 'Quarterly (4 Preventive Visits / Year)',
      nextServiceDate: new Date(new Date().setDate(new Date().getDate() + 45)),
      status: AmcStatus.ACTIVE,
      notes: 'Includes free emergency breakdown repair within 4 hours, spare parts coverage, quarterly lens cleaning, and HDD health audits.'
    }
  });
  console.log('✅ AMC Contract seeded:', amcContract.contractNumber);

  // 7. Seed Service Request (AMC Priority Ticket)
  const serviceRequest = await prisma.serviceRequest.upsert({
    where: { requestNumber: 'AMC-20260825-412' },
    update: {},
    create: {
      requestNumber: 'AMC-20260825-412',
      customerId: customer.id,
      customerName: customer.customerName,
      contactNumber: customer.contactNumber,
      location: customer.city,
      assignedTechnicianId: technician.id,
      technicianName: technician.name,
      technicianPhone: technician.phone,
      serviceType: ServiceRequestType.AMC_PRIORITY,
      complaint: 'Camera 4 (Lift A) flickering footage reported. Routine quarterly preventive checkup.',
      priority: PriorityLevel.HIGH,
      status: ServiceRequestStatus.COMPLETED,
      scheduledDate: new Date(),
      completedDate: new Date(),
      visitCharge: 0.00,
      customerConfirmed: true,
      notes: 'Technician dispatched from Central Mumbai Hub. SLA response under 2 hours.'
    }
  });
  console.log('✅ Service Request seeded:', serviceRequest.requestNumber);

  // 8. Seed Service Report (Raksham CCTV Service Report - PDF 1 Verification)
  const serviceReport = await prisma.serviceReport.upsert({
    where: { reportNumber: 'REP-2026-0824' },
    update: {},
    create: {
      reportNumber: 'REP-2026-0824',
      jobNo: 'JOB-9021',
      customerId: customer.id,
      customerName: customer.customerName,
      customerNumber: customer.customerNumber,
      siteAddress: customer.siteAddress,
      contactPerson: customer.contactPerson,
      contactNumber: customer.contactNumber,
      serviceRequestId: serviceRequest.id,
      technicianId: technician.id,
      technicianName: technician.name,
      serviceType: 'Quarterly AMC Preventive Checkup & Maintenance',
      serviceDate: new Date(),
      complaint: 'Scheduled Q3 routine preventive checkup. Camera 4 (Lift A) flickering footage reported.',
      systemType: 'HD IP Surveillance Network (14 Cameras)',
      brand: 'Hikvision',
      model: 'DS-7616NI-Q2 (16CH NVR)',
      serialNumber: 'SN-HK8921-2024',
      numberOfCameras: 14,
      otherEquipment: '16-Port Gigabit PoE Switch, 4TB Seagate SkyHawk HDD',
      problemObserved: 'RJ45 connector on Lift A camera loose. Optical dust layer on Main Gate bullet camera.',
      workCarriedOut: 'Re-crimped RJ45 connector with gold-plated jack. Cleaned all 14 optical camera lenses. Cleaned NVR cooling fan. Audited 30-day continuous video playback and verified remote mobile streaming.',
      
      // 8-Point Inspection Checklist
      cctvHdd: InspectionStatus.OK,
      dvrFirmware: InspectionStatus.OK,
      networkConnectivity: InspectionStatus.OK,
      powerSupply: InspectionStatus.OK,
      recording: InspectionStatus.OK,
      remoteViewing: InspectionStatus.OK,
      cameraAlignment: InspectionStatus.OK,
      cameraLensCleaning: InspectionStatus.OK,
      inspectionRemarks: 'All 8 CCTV health checks verified and operating at 100% efficiency.',
      
      technicianRemarks: 'System operating at peak performance. UPS backup runtime verified (35 minutes).',
      customerRemarks: 'Technician arrived on time. Lift camera issue resolved immediately. Satisfied with maintenance work.',
      customerConfirmed: true,
      customerSignature: 'DIGITALLY_CONFIRMED_BY_SOCIETY_SECRETARY',
      technicianSignature: 'DIGITALLY_SIGNED_BY_RAKESH_TORASKAR',
      pdfFilePath: 'uploads/service-reports/REP-2026-0824.pdf',
      status: ServiceReportStatus.COMPLETED,
      
      items: {
        create: [
          { itemNumber: 1, description: 'Cat6 RJ45 Modular Connector (Gold Plated)', quantity: 2, remarks: 'Replaced under AMC Warranty' },
          { itemNumber: 2, description: 'Camera Lens Optical Cleaning Solution & Microfiber', quantity: 1, remarks: 'Quarterly Maintenance' }
        ]
      }
    }
  });
  console.log('✅ Service Report seeded:', serviceReport.reportNumber);

  // 9. Seed AMC Service Record Linked to Report
  await prisma.amcService.create({
    data: {
      amcContractId: amcContract.id,
      serviceReportId: serviceReport.id,
      serviceDate: new Date(),
      technicianId: technician.id,
      workPerformed: 'Q3 Preventive Checkup, Lens Cleaning & NVR Health Audit',
      inspectionResult: 'All 8 Points Passed (100% Operational)',
      remarks: 'Quarterly routine check completed smoothly.',
      nextServiceDate: new Date(new Date().setDate(new Date().getDate() + 90)),
      status: 'Completed'
    }
  });
  console.log('✅ AMC Service visit history seeded');

  // 10. Seed Sample Website Contact Enquiry
  await prisma.enquiry.upsert({
    where: { enquiryNumber: 'ENQ-4821' },
    update: {},
    create: {
      enquiryNumber: 'ENQ-4821',
      name: 'Sunil Mehta (Chairman)',
      mobile: '+91 98201 55678',
      email: 'sunil@greenmeadows.org',
      location: 'Chembur East, Mumbai',
      serviceRequired: 'CCTV AMC Shield & Upgrade to 24 Cameras',
      message: 'Need urgent on-site survey for replacing old analog cameras with IP surveillance.',
      status: EnquiryStatus.NEW
    }
  });
  console.log('✅ Sample Enquiry seeded: ENQ-4821');

  // 11. Seed Audit Log Record
  await prisma.auditLog.create({
    data: {
      userId: adminUser.id,
      action: 'ADMIN_CREATED_CUSTOMER',
      entity: 'customers',
      entityId: customer.id,
      description: 'Seeded initial housing society Silver Springs Residency CHS (ULV2601)',
      ipAddress: '127.0.0.1'
    }
  });
  console.log('✅ Audit Log seeded');

  console.log('🎉 Local Database Seed Completed Successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
