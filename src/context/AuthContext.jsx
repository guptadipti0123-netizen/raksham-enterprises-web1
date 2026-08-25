import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  INITIAL_CUSTOMERS, 
  INITIAL_SERVICE_REPORTS, 
  INITIAL_SERVICE_REQUESTS, 
  INITIAL_ENQUIRIES, 
  INITIAL_EQUIPMENT,
  INITIAL_NON_AMC_REQUESTS 
} from '../data/websiteData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Current logged in user (null, 'customer', 'admin')
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem('raksham_user_role') || null;
  });

  const [activeCustomer, setActiveCustomer] = useState(() => {
    return INITIAL_CUSTOMERS[0]; // Silver Springs Residency (ULV2601)
  });

  // State collections persisted in localStorage or memory
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

  useEffect(() => {
    if (userRole) {
      localStorage.setItem('raksham_user_role', userRole);
    } else {
      localStorage.removeItem('raksham_user_role');
    }
  }, [userRole]);

  // Auth Methods
  const loginAsCustomer = (identifier = 'ULV2601') => {
    if (!identifier) return false;
    const clean = identifier.trim().toLowerCase();
    
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
      if (r.complaintNo === complaintNo && r.estimate) {
        return {
          ...r,
          status: approved ? 'In Progress (Estimate Approved)' : 'Estimate Declined',
          estimate: {
            ...r.estimate,
            customerApprovalStatus: approved ? 'Approved by Customer' : 'Declined by Customer',
            approvalTimestamp: new Date().toISOString()
          }
        };
      }
      return r;
    });
    setNonAmcRequests(updated);
    localStorage.setItem('raksham_non_amc_requests', JSON.stringify(updated));
  };

  // ⭐ ONE-TIME TO AMC CONVERSION ENGINE
  const convertToAmc = (sourceData, planName = 'Society & Enterprise Comprehensive Shield') => {
    const locPrefix = (sourceData.location || sourceData.city || 'MUM').slice(0, 3).toUpperCase();
    const custNum = `${locPrefix}${Math.floor(1000 + Math.random() * 9000)}`;
    const nextYear = new Date();
    nextYear.setFullYear(nextYear.getFullYear() + 1);

    const newAmcCustomer = {
      id: `CUST-${Date.now().toString().slice(-4)}`,
      customerNo: custNum,
      name: sourceData.customerName || sourceData.name || 'New AMC Client',
      type: sourceData.customerType || sourceData.propertyType || 'Residential Society',
      address: sourceData.address || sourceData.location || 'Mumbai, Maharashtra',
      contactPerson: sourceData.customerName || sourceData.name || 'Site Incharge',
      contactPhone: sourceData.mobile || sourceData.contactNumber || sourceData.phone || '+91 9867890606',
      contactEmail: sourceData.email || 'client@raksham.com',
      activeAmc: true,
      amcExpiry: nextYear.toISOString().split('T')[0],
      amcPlan: planName,
      cameraCount: sourceData.cameraCount || sourceData.noOfCameras || 8,
      systemType: 'CCTV Surveillance System (AMC Protected)'
    };

    const updatedCustomers = [newAmcCustomer, ...customers];
    setCustomers(updatedCustomers);
    localStorage.setItem('raksham_customers', JSON.stringify(updatedCustomers));

    // If converted from Non-AMC, tag the request
    if (sourceData.complaintNo) {
      updateNonAmcRequest(sourceData.id, {
        amcConverted: true,
        convertedCustomerNo: custNum
      });
    }

    // Set active customer & role
    setActiveCustomer(newAmcCustomer);
    setUserRole('customer');
    return newAmcCustomer;
  };

  // Customer Feedback Logger
  const addFeedback = (complaintId, rating, comment) => {
    const newFb = {
      id: `FB-${Date.now().toString().slice(-4)}`,
      complaintId,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0]
    };
    const updated = [newFb, ...feedbacks];
    setFeedbacks(updated);
    localStorage.setItem('raksham_feedbacks', JSON.stringify(updated));
    return newFb;
  };

  const getComplaintByNo = (complaintNo) => {
    if (!complaintNo) return null;
    const cleanNo = complaintNo.trim().toUpperCase();
    
    // Search in Non-AMC
    const nonAmc = nonAmcRequests.find(r => r.complaintNo?.toUpperCase() === cleanNo || r.id?.toUpperCase() === cleanNo);
    if (nonAmc) return { ...nonAmc, isNonAmc: true };

    // Search in AMC
    const amcReq = serviceRequests.find(r => r.ticketNo?.toUpperCase() === cleanNo || r.complaintNo?.toUpperCase() === cleanNo || r.id?.toUpperCase() === cleanNo);
    if (amcReq) return { ...amcReq, isNonAmc: false };

    return null;
  };

  const addServiceReport = (reportData) => {
    const newRep = {
      id: `REP-${Date.now().toString().slice(-4)}`,
      reportNo: reportData.reportNo || `RE-${Math.floor(10000 + Math.random() * 90000)}-1`,
      date: new Date().toISOString().split('T')[0],
      status: 'Completed & Verified',
      createdAt: new Date().toISOString().split('T')[0],
      ...reportData
    };
    const updated = [newRep, ...serviceReports];
    setServiceReports(updated);
    localStorage.setItem('raksham_service_reports', JSON.stringify(updated));
    return newRep;
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
