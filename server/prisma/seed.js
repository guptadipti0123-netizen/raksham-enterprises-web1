import { PrismaClient, UserRole, AmcStatus, ServiceRequestType, ServiceRequestStatus, EnquiryStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Raksham Enterprises database seed...');

  // 1. Password Hashes
  const adminPasswordHash = await bcrypt.hash('admin123', 12);
  const techPasswordHash = await bcrypt.hash('tech123', 12);
  const customerPasswordHash = await bcrypt.hash('customer123', 12);

  // 2. Seed Admin User
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@raksham.com' },
    update: {},
    create: {
      email: 'admin@raksham.com',
      phone: '+91 9867890606',
      passwordHash: adminPasswordHash,
      role: UserRole.ADMIN,
      name: 'Raksham Operations Admin',
      isActive: true
    }
  });
  console.log('✅ Admin user created:', adminUser.email);

  // 3. Seed Technician User & Profile
  const techUser = await prisma.user.upsert({
    where: { email: 'tech@raksham.com' },
    update: {},
    create: {
      email: 'tech@raksham.com',
      phone: '+91 90291 14205',
      passwordHash: techPasswordHash,
      role: UserRole.TECHNICIAN,
      name: 'Rakesh Toraskar',
      isActive: true,
      technician: {
        create: {
          name: 'Rakesh Toraskar',
          phone: '+91 90291 14205',
          email: 'tech@raksham.com',
          specialization: 'Senior CCTV & IP Networking Engineer',
          hub: 'Central Mumbai & Navi Mumbai Hub',
          isActive: true
        }
      }
    },
    include: { technician: true }
  });
  console.log('✅ Technician user created:', techUser.name);

  // 4. Seed Primary Customer User & Profile (Silver Springs Residency)
  const customerUser = await prisma.user.upsert({
    where: { email: 'contact@silversprings.com' },
    update: {},
    create: {
      email: 'contact@silversprings.com',
      phone: '+91 9867890606',
      passwordHash: customerPasswordHash,
      role: UserRole.CUSTOMER,
      name: 'Silver Springs Residency CHS',
      isActive: true,
      customer: {
        create: {
          customerNo: 'ULV2601',
          name: 'Silver Springs Residency CHS',
          contactPerson: 'Mr. Deepak Sharma (Secretary)',
          contactPhone: '+91 9867890606',
          email: 'contact@silversprings.com',
          address: 'Plot 42, Sector 19, Ulwe, Navi Mumbai, Maharashtra 410206',
          location: 'Ulwe (Navi Mumbai)',
          amcStatus: AmcStatus.ACTIVE,
          amcType: 'Comprehensive Shield AMC',
          amcExpiry: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
          camerasCount: 14,
          nvrDetails: 'Hikvision 16-Channel 4K NVR (DS-7616NI-Q2)',
          hddsDetails: 'Seagate SkyHawk 4TB Surveillance HDD'
        }
      }
    },
    include: { customer: true }
  });
  const customer = customerUser.customer;
  console.log('✅ Customer created:', customer.name, `(${customer.customerNo})`);

  // 5. Seed Customer Equipment
  await prisma.equipment.createMany({
    data: [
      {
        customerId: customer.id,
        systemType: 'IP CCTV Cameras (Bullet)',
        brand: 'Hikvision',
        model: 'DS-2CD1023G0E-I (2MP Full HD)',
        serialNo: 'HK-CAM-88910',
        cameraCount: 10,
        locationTag: 'Main Gate, Perimeter Walls, Parking Level 1 & 2',
        installDate: new Date('2024-01-15'),
        warrantyExpiry: new Date('2026-01-15')
      },
      {
        customerId: customer.id,
        systemType: 'IP CCTV Cameras (Dome)',
        brand: 'Hikvision',
        model: 'DS-2CD1123G0E-I (2MP Vandal Dome)',
        serialNo: 'HK-CAM-99214',
        cameraCount: 4,
        locationTag: 'Building Entrance Lobby, Lift Cabins A & B',
        installDate: new Date('2024-01-15'),
        warrantyExpiry: new Date('2026-01-15')
      },
      {
        customerId: customer.id,
        systemType: 'Network Video Recorder (NVR)',
        brand: 'Hikvision',
        model: 'DS-7616NI-Q2 (16 Channel 4K)',
        serialNo: 'NVR-HK8921-2024',
        cameraCount: 16,
        locationTag: 'Society Security Control Room Rack',
        installDate: new Date('2024-01-15'),
        warrantyExpiry: new Date('2027-01-15')
      }
    ],
    skipDuplicates: true
  });
  console.log('✅ Customer equipment seeded');

  // 6. Seed AMC Contract & Schedule
  const amcContract = await prisma.amcContract.create({
    data: {
      customerId: customer.id,
      planName: 'Comprehensive Shield AMC (14 Cameras)',
      startDate: new Date('2025-01-01'),
      endDate: new Date('2026-12-31'),
      frequency: 'Quarterly (4 Preventive Checkups / Year)',
      nextServiceDate: new Date(new Date().setDate(new Date().getDate() + 45)),
      status: AmcStatus.ACTIVE,
      notes: 'Includes free emergency breakdown repair within 4 hours, spare parts coverage, quarterly lens cleaning, and HDD health audits.'
    }
  });

  // 7. Seed Sample Service Report (Matching PDF 1 Requirements)
  await prisma.serviceReport.upsert({
    where: { reportId: 'REP-2026-0824' },
    update: {},
    create: {
      reportId: 'REP-2026-0824',
      jobNo: 'JOB-9021',
      customerId: customer.id,
      customerName: customer.name,
      siteAddress: customer.address,
      contactPerson: customer.contactPerson,
      contactNumber: customer.contactPhone,
      technicianName: 'Rakesh Toraskar',
      serviceType: 'Quarterly AMC Preventive Checkup & Maintenance',
      visitDate: new Date(),
      complaintDetails: 'Scheduled Q3 routine preventive checkup. Camera 4 (Lift A) flickering footage reported.',
      systemType: 'HD IP Surveillance Network (14 Cameras)',
      brand: 'Hikvision',
      modelNo: 'DS-7616NI-Q2 (16CH NVR)',
      serialNo: 'SN-HK8921-2024',
      noOfCameras: 14,
      otherEquipment: '16-Port Gigabit PoE Switch, 4TB Seagate SkyHawk HDD',
      problemObserved: 'RJ45 connector on Lift A camera loose. Lens surface accumulated dust on Main Gate bullet camera.',
      workCarriedOut: 'Re-crimped RJ45 connector with gold-plated jack. Cleaned all 14 optical lenses. Cleaned NVR cooling fan. Audited 30-day continuous video playback and verified remote mobile streaming.',
      systemHealth: '100% Operational',
      cctvHddStatus: 'Healthy (Recording Active)',
      nvrFirmwareStatus: 'Up to date (v4.32.115)',
      networkConnectivity: 'Active (Static IP 192.168.1.100 Online)',
      powerSupplyStatus: '12V 10A Central SMPS Voltage 12.2V Stable',
      recordingStatus: 'Continuous 24x7 Active (32 Days Playback available)',
      remoteViewingStatus: 'Hik-Connect Cloud Online (3 Society Admins Connected)',
      cameraAlignmentStatus: 'All 14 Angles Cleaned, Focused & Aligned',
      technicianRemarks: 'System operating at peak efficiency. Backup power UPS health verified (35 minutes runtime).',
      customerRemarks: 'Technician arrived on time. Lift camera issue resolved immediately. Satisfied with maintenance work.',
      customerConfirmed: true,
      pdfS3Key: 'raksham/service-reports/REP-2026-0824.pdf',
      items: {
        create: [
          { itemNo: 1, description: 'Cat6 RJ45 Modular Connector (Gold Plated)', qty: 2, remarks: 'Replaced under AMC Warranty' },
          { itemNo: 2, description: 'Camera Lens Optical Cleaning Solution & Microfiber', qty: 1, remarks: 'Quarterly Maintenance' }
        ]
      }
    }
  });
  console.log('✅ Sample Service Report seeded (REP-2026-0824)');

  // 8. Seed Service Request (AMC Priority)
  await prisma.serviceRequest.upsert({
    where: { ticketNo: 'AMC-20260824-001' },
    update: {},
    create: {
      ticketNo: 'AMC-20260824-001',
      customerId: customer.id,
      customerName: customer.name,
      contactPhone: customer.contactPhone,
      location: customer.location,
      serviceType: ServiceRequestType.AMC_PRIORITY,
      issueType: 'Camera Video Loss (Lift A)',
      priority: 'High (AMC Priority Queue)',
      status: ServiceRequestStatus.COMPLETED,
      technicianName: 'Rakesh Toraskar',
      technicianPhone: '+91 90291 14205',
      scheduledTime: 'Within 4 Hours (AMC SLA)',
      visitCharge: 0.00,
      customerConfirmed: true
    }
  });

  // 9. Seed Non-AMC Request (₹800 Paid Repair)
  await prisma.serviceRequest.upsert({
    where: { ticketNo: 'NAC-20260825-001' },
    update: {},
    create: {
      ticketNo: 'NAC-20260825-001',
      customerName: 'Ghatkopar Electronics Plaza',
      contactPhone: '+91 98200 44123',
      location: 'Ghatkopar East, Mumbai',
      serviceType: ServiceRequestType.NON_AMC_PAID,
      issueType: 'Blank Screen / DVR Not Powering On',
      priority: 'Standard (₹800 Paid Visit)',
      status: ServiceRequestStatus.ESTIMATE_SENT,
      technicianName: 'Rakesh Toraskar',
      technicianPhone: '+91 90291 14205',
      visitCharge: 800.00,
      estimateParts: [
        { name: '12V 10A CCTV Power Supply SMPS', qty: 1, cost: 1200 },
        { name: 'HDMI 4K Display Cable 3 Meter', qty: 1, cost: 450 }
      ],
      estimateStatus: 'Pending'
    }
  });

  // 10. Seed Sample Enquiries
  await prisma.enquiry.upsert({
    where: { enquiryNo: 'ENQ-2026-101' },
    update: {},
    create: {
      enquiryNo: 'ENQ-2026-101',
      name: 'Sunil Mehta (Chairman)',
      mobile: '+91 98201 55678',
      email: 'sunil@greenmeadows.org',
      location: 'Chembur East, Mumbai',
      propertyType: 'Residential Society (120 Flats)',
      serviceRequired: 'CCTV AMC Shield & Upgrade to 24 Cameras',
      message: 'Need urgent on-site survey for replacing old analog cameras with IP surveillance.',
      status: EnquiryStatus.NEW
    }
  });

  console.log('🎉 Raksham Database Seed Completed Successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
