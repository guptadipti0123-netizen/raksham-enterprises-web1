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

export function AuthProvider({ children }) {
  // Current logged in user (null, 'customer', 'admin')
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem('raksham_user_role') || null;
  });

  const [activeCustomer, setActiveCustomer] = useState(() => {
    return INITIAL_CUSTOMERS[0]; // Silver Springs Residency (ULV2601)
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

  const loginAsAdmin = (password = 'admin123') => {
    setUserRole('admin');
    return true;
  };

  const logout = () => {
    setUserRole(null);
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

  const registerCustomer = async (data) => {
    // Attempt backend registration
    try {
      const res = await authApi.register(data);
      if (res && res.token) {
        localStorage.setItem('raksham_jwt_token', res.token);
      }
    } catch (e) {
      console.warn('Backend offline, registered locally:', e.message);
    }

    const locPrefix = (data.location || 'MUM').slice(0, 3).toUpperCase();
    const rand = Math.floor(1000 + Math.random() * 9000);
    const newCustomerNo = `${locPrefix}${rand}`;

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
    return newCust;
  };

  return (
    <AuthContext.Provider
      value={{
        userRole,
        activeCustomer,
        customers,
        serviceReports,
        serviceRequests,
        nonAmcRequests,
        enquiries,
        equipment,
        feedbacks,
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
