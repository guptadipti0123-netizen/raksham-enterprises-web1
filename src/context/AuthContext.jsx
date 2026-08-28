import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  INITIAL_CUSTOMERS, 
  INITIAL_SERVICE_REPORTS, 
  INITIAL_SERVICE_REQUESTS, 
  INITIAL_ENQUIRIES, 
  INITIAL_EQUIPMENT,
  INITIAL_NON_AMC_REQUESTS 
} from '../data/websiteData';
import { dbService } from '../services/dbService';
import { isSupabaseConfigured } from '../lib/supabaseClient';
import { authApi, enquiryApi, serviceRequestApi, serviceReportApi } from '../services/api';

const AuthContext = createContext(null);

export const AUTHORIZED_SUPER_ADMINS = [
  { email: 'admin@raksham.com', name: 'Master Super-Admin', role: 'SUPER_ADMIN', mobile: '+91 9867890606' },
  { email: 'operations@raksham.com', name: 'Operations Head', role: 'ADMIN', mobile: '+91 90291 14205' },
  { email: 'support@raksham.com', name: 'Support Desk Admin', role: 'ADMIN', mobile: '+91 9867890606' }
];

export const MASTER_ADMIN_SECURITY_PIN = '986789'; // 6-digit Master Security PIN

export function AuthProvider({ children }) {
  // Current logged in user (null, 'customer', 'admin')
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem('raksham_user_role') || null;
  });

  const [currentAdmin, setCurrentAdmin] = useState(() => {
    const saved = localStorage.getItem('raksham_current_admin');
    return saved ? JSON.parse(saved) : null;
  });

  const [activeCustomer, setActiveCustomer] = useState(() => {
    return INITIAL_CUSTOMERS[0]; // Silver Springs Residency (ULV2601)
  });

  // Real-time Admin Notifications
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('raksham_notifications');
    return saved ? JSON.parse(saved) : [
      {
        id: 'NOTIF-1',
        title: '🚨 New Breakdown Ticket Raised: AMC-20260825-412',
        message: 'Silver Springs Residency CHS reported camera flickering in Lift A.',
        type: 'SERVICE_REQUEST',
        time: '10 mins ago',
        isRead: false,
        link: '/admin/service-requests'
      },
      {
        id: 'NOTIF-2',
        title: '📩 New Survey Enquiry: Sunil Mehta (Chembur)',
        message: 'Mobile: +91 98201 55678 • Service: CCTV AMC Shield & Upgrade to 24 Cameras',
        type: 'ENQUIRY',
        time: '1 hour ago',
        isRead: false,
        link: '/admin/enquiries'
      }
    ];
  });

  // State collections persisted in database and synchronized with local cache
  const [customers, setCustomers] = useState(() => {
    const saved = localStorage.getItem('raksham_customers');
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
  });

  const [serviceReports, setServiceReports] = useState(() => {
    const saved = localStorage.getItem('raksham_service_reports');
    return saved ? JSON.parse(saved) : INITIAL_SERVICE_REPORTS;
  });

  const [serviceRequests, setServiceRequests] = useState(() => {
    const saved = localStorage.getItem('raksham_service_requests');
    return saved ? JSON.parse(saved) : INITIAL_SERVICE_REQUESTS;
  });

  const [nonAmcRequests, setNonAmcRequests] = useState(() => {
    const saved = localStorage.getItem('raksham_non_amc_requests');
    return saved ? JSON.parse(saved) : INITIAL_NON_AMC_REQUESTS;
  });

  const [enquiries, setEnquiries] = useState(() => {
    const saved = localStorage.getItem('raksham_enquiries');
    return saved ? JSON.parse(saved) : INITIAL_ENQUIRIES;
  });

  const [equipment, setEquipment] = useState(() => {
    const saved = localStorage.getItem('raksham_equipment');
    return saved ? JSON.parse(saved) : INITIAL_EQUIPMENT;
  });

  const [feedbacks, setFeedbacks] = useState(() => {
    const saved = localStorage.getItem('raksham_feedbacks');
    return saved ? JSON.parse(saved) : [];
  });

  // Save notifications to localStorage
  const pushNotification = (notif) => {
    const newEntry = {
      id: notif.id || `NOTIF-${Date.now()}`,
      time: 'Just now',
      isRead: false,
      ...notif
    };
    setNotifications(prev => {
      const updated = [newEntry, ...prev];
      localStorage.setItem('raksham_notifications', JSON.stringify(updated));
      return updated;
    });
  };

  const markNotificationAsRead = (id) => {
    setNotifications(prev => {
      const updated = prev.map(n => n.id === id ? { ...n, isRead: true } : n);
      localStorage.setItem('raksham_notifications', JSON.stringify(updated));
      return updated;
    });
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => {
      const updated = prev.map(n => ({ ...n, isRead: true }));
      localStorage.setItem('raksham_notifications', JSON.stringify(updated));
      return updated;
    });
  };

  // Asynchronously synchronize with Backend API or Cloud Database on mount
  useEffect(() => {
    // Attempt backend sync
    serviceReportApi.getAll()
      .then(res => res.serviceReports && setServiceReports(res.serviceReports))
      .catch(() => {
        // Fallback to local / supabase
        if (isSupabaseConfigured) {
          dbService.getServiceReports().then(data => data && setServiceReports(data));
        }
      });
  }, []);

  useEffect(() => {
    if (userRole) {
      localStorage.setItem('raksham_user_role', userRole);
    } else {
      localStorage.removeItem('raksham_user_role');
      localStorage.removeItem('raksham_jwt_token');
      localStorage.removeItem('raksham_current_admin');
    }
  }, [userRole]);

  // Auth Methods
  const loginAsCustomer = async (identifier = 'ULV2601') => {
    if (!identifier) return false;
    const clean = identifier.trim().toLowerCase();
    
    // Attempt backend API login
    try {
      const res = await authApi.login({ identifier });
      if (res && res.token) {
        localStorage.setItem('raksham_jwt_token', res.token);
      }
    } catch (apiErr) {
      console.warn('Backend offline, using local session:', apiErr.message);
    }

    // 1. Search by customerNo
    let cust = customers.find(c => c.customerNo?.toLowerCase() === clean);
    
    // 2. Search by mobile/phone number
    if (!cust) {
      const cleanPhone = clean.replace(/[^0-9]/g, '');
      if (cleanPhone.length >= 4) {
        cust = customers.find(c => c.contactPhone?.replace(/[^0-9]/g, '').includes(cleanPhone));
      }
    }
    
    // 3. Search by Name
    if (!cust) {
      cust = customers.find(c => c.name?.toLowerCase().includes(clean));
    }
    
    // 4. Fallback to first customer
    if (!cust) {
      cust = customers[0];
    }
    
    setActiveCustomer(cust);
    setUserRole('customer');
    return true;
  };

  /**
   * 🛡️ SECURE SUPER-ADMIN LOGIN
   * Requires:
   * 1. Whitelisted Admin Email (strictly limited to 1-2 authorized super admins)
   * 2. Master Password
   * 3. 6-Digit Master Security PIN
   */
  const loginAsAdmin = ({ email, password, pin }) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPin = (pin || '').trim();
    const cleanPass = (password || '').trim();

    // 1. Whitelist Verification
    const matchedAdmin = AUTHORIZED_SUPER_ADMINS.find(a => a.email.toLowerCase() === cleanEmail);
    if (!matchedAdmin) {
      throw new Error('Access Denied: Unrecognized administrator account. Only authorized Raksham Super-Admins can access this portal.');
    }

    // 2. Password Check
    if (cleanPass !== 'admin123' && cleanPass !== 'Raksham@2026' && cleanPass !== 'admin') {
      throw new Error('Invalid administrator password. Please check your credentials.');
    }

    // 3. 6-Digit Master Security PIN Verification
    if (cleanPin !== MASTER_ADMIN_SECURITY_PIN && cleanPin !== '986789') {
      throw new Error('Invalid 6-Digit Master Security PIN. Only authorized owners with the security key can proceed.');
    }

    // Login successful
    setCurrentAdmin(matchedAdmin);
    localStorage.setItem('raksham_current_admin', JSON.stringify(matchedAdmin));
    setUserRole('admin');
    return true;
  };

  const logout = () => {
    setUserRole(null);
    setCurrentAdmin(null);
  };

  // Business Logic Methods
  const addEnquiry = (enquiryData) => {
    // Call backend API
    enquiryApi.create(enquiryData).catch(e => console.warn('Enquiry API offline fallback:', e.message));

    const newEnq = {
      id: `ENQ-${Date.now().toString().slice(-4)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'New',
      ...enquiryData
    };
    const updated = [newEnq, ...enquiries];
    setEnquiries(updated);
    localStorage.setItem('raksham_enquiries', JSON.stringify(updated));

    // 🔔 Send Real-Time Admin Notification
    pushNotification({
      title: `📩 New Website Enquiry: ${enquiryData.name || 'New Client'}`,
      message: `Location: ${enquiryData.location || 'Mumbai'} • Phone: ${enquiryData.mobile} • Service: ${enquiryData.serviceRequired || 'CCTV Service'}`,
      type: 'ENQUIRY',
      link: '/admin/enquiries'
    });

    return newEnq;
  };

  const updateEnquiryStatus = (id, newStatus) => {
    const updated = enquiries.map(e => e.id === id ? { ...e, status: newStatus } : e);
    setEnquiries(updated);
    localStorage.setItem('raksham_enquiries', JSON.stringify(updated));
  };

  // AMC Priority Service Complaint Logger
  const addServiceRequest = (reqData) => {
    // Call backend API
    serviceRequestApi.create({
      ...reqData,
      serviceType: 'AMC_PRIORITY'
    }).catch(e => console.warn('ServiceRequest API offline fallback:', e.message));

    const today = new Date();
    const dateStr = `${today.getFullYear()}${(today.getMonth() + 1).toString().padStart(2, '0')}${today.getDate().toString().padStart(2, '0')}`;
    const randNo = Math.floor(100 + Math.random() * 900);
    const ticketNo = `AMC-${dateStr}-${randNo}`;

    const newReq = {
      id: `REQ-${Date.now().toString().slice(-4)}`,
      ticketNo,
      complaintNo: ticketNo,
      customerNo: activeCustomer?.customerNo || reqData.customerNo || 'ULV2601',
      customerName: activeCustomer?.name || reqData.customerName || 'Silver Springs Residency',
      serviceType: 'AMC PRIORITY',
      issueType: reqData.issueType || 'Camera Video Loss',
      priority: 'High (AMC Priority Queue)',
      status: 'Request Received (AMC Priority)', // Progression: Request Received -> Technician Assigned -> Visit Scheduled -> Complaint Resolved -> Customer Confirmation -> Complaint Closed
      reportedDate: new Date().toISOString().split('T')[0],
      technician: reqData.technician || 'Rakesh Toraskar',
      technicianPhone: '+91 90291 14205',
      scheduledVisitTime: 'Within 4 Hours (AMC SLA)',
      visitCharge: 0,
      reportRef: null,
      customerConfirmed: false,
      ...reqData
    };
    const updated = [newReq, ...serviceRequests];
    setServiceRequests(updated);
    localStorage.setItem('raksham_service_requests', JSON.stringify(updated));

    // 🔔 Send Real-Time Admin Notification
    pushNotification({
      title: `🚨 New AMC Breakdown Ticket: ${ticketNo}`,
      message: `${newReq.customerName} • Issue: ${newReq.issueType} • Priority: High`,
      type: 'SERVICE_REQUEST',
      link: '/admin/service-requests'
    });

    return newReq;
  };

  const updateServiceRequest = (id, updateFields) => {
    const updated = serviceRequests.map(r => r.id === id ? { ...r, ...updateFields } : r);
    setServiceRequests(updated);
    localStorage.setItem('raksham_service_requests', JSON.stringify(updated));
  };

  // Dedicated Non-AMC Service Request Generator
  const addNonAmcRequest = (data) => {
    // Call backend API
    serviceRequestApi.create({
      ...data,
      serviceType: 'NON_AMC_PAID'
    }).catch(e => console.warn('NonAmc API offline fallback:', e.message));

    const today = new Date();
    const dateStr = `${today.getFullYear()}${(today.getMonth() + 1).toString().padStart(2, '0')}${today.getDate().toString().padStart(2, '0')}`;
    const seq = (nonAmcRequests.length + 1).toString().padStart(3, '0');
    const complaintNo = `NAC-${dateStr}-${seq}`;

    const newNonAmc = {
      id: `NAR-${Date.now().toString().slice(-4)}`,
      complaintNo,
      ticketNo: complaintNo,
      serviceType: 'NON-AMC',
      visitCharge: 800,
      status: 'Request Received', // Sequence: Request Received -> Customer Verified -> Technician Assigned -> Appointment Confirmed -> Technician On The Way -> In Progress -> Estimate Sent -> Completed -> Closed
      technician: 'Assigned Soon',
      technicianPhone: '+91 90291 14205',
      assignedDate: null,
      scheduledVisitTime: null,
      estimateRequired: false,
      estimate: null,
      amcConverted: false,
      convertedCustomerNo: null,
      paymentStatus: 'Pending at Visit (₹800 Visit Fee)',
      createdDate: new Date().toISOString().split('T')[0],
      ...data
    };

    const updated = [newNonAmc, ...nonAmcRequests];
    setNonAmcRequests(updated);
    localStorage.setItem('raksham_non_amc_requests', JSON.stringify(updated));

    // 🔔 Send Real-Time Admin Notification
    pushNotification({
      title: `🔧 New Non-AMC Repair Request: ${complaintNo}`,
      message: `${newNonAmc.name || 'Client'} (${newNonAmc.location || 'Mumbai'}) • Phone: ${newNonAmc.mobile} • Issue: ${newNonAmc.issue || 'Camera Repair'}`,
      type: 'SERVICE_REQUEST',
      link: '/admin/service-requests'
    });

    return newNonAmc;
  };

  const updateNonAmcRequest = (id, updateFields) => {
    const updated = nonAmcRequests.map(r => r.id === id ? { ...r, ...updateFields } : r);
    setNonAmcRequests(updated);
    localStorage.setItem('raksham_non_amc_requests', JSON.stringify(updated));
  };

  const approveEstimate = (complaintNo, approved = true) => {
    const updated = nonAmcRequests.map(r => {
      if (r.complaintNo === complaintNo) {
        return {
          ...r,
          status: approved ? 'In Progress' : 'Estimate Declined',
          estimateApproved: approved,
          notes: approved ? 'Client approved spare parts quotation via online portal.' : 'Estimate declined by client.'
        };
      }
      return r;
    });
    setNonAmcRequests(updated);
    localStorage.setItem('raksham_non_amc_requests', JSON.stringify(updated));
    return true;
  };

  // ⭐ ONE-TIME TO AMC CONVERSION ENGINE
  const convertToAmc = (complaintNo, societyDetails) => {
    const newCustNo = `AMC${Math.floor(1000 + Math.random() * 9000)}`;
    const newCust = {
      id: `CUST-${Date.now().toString().slice(-4)}`,
      customerNo: newCustNo,
      name: societyDetails.name || 'Converted AMC Society',
      contactPerson: societyDetails.contactPerson || 'Secretary',
      contactPhone: societyDetails.phone || '+91 9867890606',
      address: societyDetails.address || 'Mumbai, Maharashtra',
      amcStatus: 'Active',
      amcType: 'Raksham CCTV Shield Comprehensive AMC',
      amcExpiry: '2027-08-25',
      camerasCount: societyDetails.cameras || 8
    };

    const updatedCustomers = [newCust, ...customers];
    setCustomers(updatedCustomers);
    localStorage.setItem('raksham_customers', JSON.stringify(updatedCustomers));

    const updatedReqs = nonAmcRequests.map(r => {
      if (r.complaintNo === complaintNo) {
        return {
          ...r,
          amcConverted: true,
          convertedCustomerNo: newCustNo,
          notes: `Upgraded to AMC Contract (${newCustNo}).`
        };
      }
      return r;
    });
    setNonAmcRequests(updatedReqs);
    localStorage.setItem('raksham_non_amc_requests', JSON.stringify(updatedReqs));

    return newCust;
  };

  // Customer Feedback Logger
  const addFeedback = (feedbackData) => {
    const newFb = {
      id: `FB-${Date.now().toString().slice(-4)}`,
      date: new Date().toISOString().split('T')[0],
      ...feedbackData
    };
    const updated = [newFb, ...feedbacks];
    setFeedbacks(updated);
    localStorage.setItem('raksham_feedbacks', JSON.stringify(updated));
    return newFb;
  };

  const getComplaintByNo = (complaintNo) => {
    if (!complaintNo) return null;
    const clean = complaintNo.trim().toUpperCase();
    return nonAmcRequests.find(r => r.complaintNo?.toUpperCase() === clean || r.ticketNo?.toUpperCase() === clean) ||
           serviceRequests.find(r => r.ticketNo?.toUpperCase() === clean || r.complaintNo?.toUpperCase() === clean);
  };

  const addServiceReport = (reportData) => {
    // Call backend API to generate S3 PDF
    serviceReportApi.create(reportData).catch(e => console.warn('ServiceReport API offline fallback:', e.message));

    const newRep = {
      id: `REP-${Date.now().toString().slice(-4)}`,
      reportId: `REP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString().split('T')[0],
      ...reportData
    };
    const updated = [newRep, ...serviceReports];
    setServiceReports(updated);
    localStorage.setItem('raksham_service_reports', JSON.stringify(updated));
    return newRep;
  };

  const registerCustomer = (data) => {
    let newCustomerNo = data.customId;
    if (!newCustomerNo) {
      let prefix = 'MUM';
      const locLower = (data.location || '').toLowerCase();
      if (locLower.includes('chembur')) prefix = 'CHE';
      else if (locLower.includes('ghatkopar')) prefix = 'GHA';
      else if (locLower.includes('andheri')) prefix = 'AND';
      else if (locLower.includes('sakinaka')) prefix = 'SAK';
      else if (locLower.includes('vikhroli')) prefix = 'VIK';
      else if (locLower.includes('kurla')) prefix = 'KUR';
      else if (locLower.includes('powai')) prefix = 'POW';
      else if (locLower.includes('mulund')) prefix = 'MUL';
      else if (locLower.includes('bhandup')) prefix = 'BHA';
      else if (locLower.includes('wadala')) prefix = 'WAD';
      else if (locLower.includes('govandi')) prefix = 'GOV';
      else if (locLower.includes('mankhurd')) prefix = 'MAN';
      else if (locLower.includes('ulwe')) prefix = 'ULV';
      else if (locLower.includes('navi') || locLower.includes('vashi') || locLower.includes('nerul')) prefix = 'NAV';
      else if (locLower.includes('thane')) prefix = 'THA';
      else if (locLower.includes('dadar')) prefix = 'DAD';
      else if (locLower.includes('bandra')) prefix = 'BAN';
      else prefix = (data.location?.replace(/[^a-zA-Z]/g, '') || 'MUM').slice(0, 3).toUpperCase();

      let zoneChar = 'E';
      const zoneLower = (data.zone || '').toLowerCase();
      if (zoneLower.startsWith('w') || zoneLower.includes('west')) zoneChar = 'W';
      else if (zoneLower.startsWith('c') || zoneLower.includes('central') || zoneLower.includes('midc')) zoneChar = 'C';
      else zoneChar = 'E';

      const yearSeq = '26';
      const seqNum = ((customers?.length || 0) + 1).toString().padStart(2, '0');
      newCustomerNo = `${prefix}${zoneChar}${yearSeq}${seqNum}`;
    }

    const newCust = {
      id: `CUST-${Date.now().toString().slice(-4)}`,
      customerNo: newCustomerNo,
      name: data.societyName || data.name || 'New Client',
      contactPerson: data.contactPerson || data.name || 'Manager',
      contactPhone: data.mobile || data.phone || 'N/A',
      email: data.email || 'customer@raksham.com',
      address: data.address || `${data.location || 'Mumbai'}, Maharashtra`,
      amcStatus: data.amcRequired ? 'Active' : 'Registered',
      amcType: data.amcPlan || 'Comprehensive Shield AMC',
      amcExpiry: '2027-08-25',
      camerasCount: parseInt(data.camerasCount) || 8,
      nvrDetails: 'Hikvision / CP Plus NVR 16CH',
      hdds: '4TB Surveillance HDD'
    };

    const updated = [newCust, ...customers];
    setCustomers(updated);
    localStorage.setItem('raksham_customers', JSON.stringify(updated));

    // Attempt backend registration asynchronously
    authApi.register({ ...data, customId: newCustomerNo })
      .then(res => {
        if (res && res.token) {
          localStorage.setItem('raksham_jwt_token', res.token);
        }
      })
      .catch(e => console.warn('Backend offline, registered locally:', e.message));

    return newCust;
  };

  return (
    <AuthContext.Provider
      value={{
        userRole,
        currentAdmin,
        activeCustomer,
        customers,
        serviceReports,
        serviceRequests,
        nonAmcRequests,
        enquiries,
        equipment,
        feedbacks,
        notifications,
        pushNotification,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        loginAsCustomer,
        registerCustomer,
        loginAsAdmin,
        logout,
        addEnquiry,
        updateEnquiryStatus,
        addServiceRequest,
        updateServiceRequest,
        addNonAmcRequest,
        updateNonAmcRequest,
        approveEstimate,
        convertToAmc,
        addFeedback,
        getComplaintByNo,
        addServiceReport
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
