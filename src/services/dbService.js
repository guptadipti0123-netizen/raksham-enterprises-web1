import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { 
  INITIAL_CUSTOMERS, 
  INITIAL_SERVICE_REPORTS, 
  INITIAL_SERVICE_REQUESTS, 
  INITIAL_NON_AMC_REQUESTS,
  INITIAL_ENQUIRIES 
} from '../data/websiteData';

// Helper to get local data safely
const getLocal = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (e) {
    return fallback;
  }
};

// Helper to set local data safely
const setLocal = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('Storage error:', e);
  }
};

export const dbService = {
  // ==========================================
  // 1. CUSTOMERS
  // ==========================================
  async getCustomers() {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('customers').select('*');
        if (!error && data && data.length > 0) {
          setLocal('raksham_customers', data);
          return data;
        }
      } catch (err) {
        console.warn('Falling back to local customers store:', err);
      }
    }
    return getLocal('raksham_customers', INITIAL_CUSTOMERS);
  },

  async createCustomer(customerData) {
    const locPrefix = (customerData.location || 'MUM').slice(0, 3).toUpperCase();
    const rand = Math.floor(1000 + Math.random() * 9000);
    const customerNo = `${locPrefix}${rand}`;

    const newCust = {
      id: `CUST-${Date.now().toString().slice(-4)}`,
      customerNo,
      name: customerData.societyName || customerData.name || 'New Client',
      contactPerson: customerData.contactPerson || customerData.name || 'Manager',
      contactPhone: customerData.mobile || customerData.phone || 'N/A',
      email: customerData.email || 'customer@raksham.com',
      address: customerData.address || `${customerData.location || 'Mumbai'}, Maharashtra`,
      location: customerData.location || 'Mumbai',
      amcStatus: customerData.amcRequired ? 'Active' : 'Registered',
      amcType: customerData.amcPlan || 'Comprehensive Shield AMC',
      amcExpiry: '2027-08-25',
      camerasCount: parseInt(customerData.camerasCount) || 8,
      nvrDetails: 'Hikvision / CP Plus NVR 16CH',
      hdds: '4TB Surveillance HDD',
      createdAt: new Date().toISOString()
    };

    if (isSupabaseConfigured) {
      try {
        await supabase.from('customers').insert([{
          customer_no: newCust.customerNo,
          name: newCust.name,
          contact_person: newCust.contactPerson,
          contact_phone: newCust.contactPhone,
          email: newCust.email,
          address: newCust.address,
          location: newCust.location,
          amc_status: newCust.amcStatus,
          amc_type: newCust.amcType,
          cameras_count: newCust.camerasCount
        }]);
      } catch (err) {
        console.warn('Supabase customer insert warning:', err);
      }
    }

    const current = getLocal('raksham_customers', INITIAL_CUSTOMERS);
    const updated = [newCust, ...current];
    setLocal('raksham_customers', updated);
    return newCust;
  },

  // ==========================================
  // 2. AMC SERVICE REQUESTS
  // ==========================================
  async getServiceRequests() {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('service_requests').select('*');
        if (!error && data && data.length > 0) {
          setLocal('raksham_service_requests', data);
          return data;
        }
      } catch (err) {
        console.warn('Using local service requests:', err);
      }
    }
    return getLocal('raksham_service_requests', INITIAL_SERVICE_REQUESTS);
  },

  async createServiceRequest(reqData) {
    const today = new Date();
    const dateStr = `${today.getFullYear()}${(today.getMonth() + 1).toString().padStart(2, '0')}${today.getDate().toString().padStart(2, '0')}`;
    const randNo = Math.floor(100 + Math.random() * 900);
    const ticketNo = `AMC-${dateStr}-${randNo}`;

    const newReq = {
      id: `REQ-${Date.now().toString().slice(-4)}`,
      ticketNo,
      complaintNo: ticketNo,
      customerNo: reqData.customerNo || 'ULV2601',
      customerName: reqData.customerName || 'Silver Springs Residency',
      serviceType: 'AMC PRIORITY',
      issueType: reqData.issueType || 'Camera Video Loss',
      priority: 'High (AMC Priority Queue)',
      status: 'Request Received (AMC Priority)',
      reportedDate: new Date().toISOString().split('T')[0],
      technician: reqData.technician || 'Rakesh Toraskar',
      technicianPhone: '+91 90291 14205',
      scheduledVisitTime: 'Within 4 Hours (AMC SLA)',
      visitCharge: 0,
      reportRef: null,
      customerConfirmed: false,
      ...reqData
    };

    if (isSupabaseConfigured) {
      try {
        await supabase.from('service_requests').insert([{
          ticket_no: newReq.ticketNo,
          customer_no: newReq.customerNo,
          customer_name: newReq.customerName,
          issue_type: newReq.issueType,
          status: newReq.status
        }]);
      } catch (err) {
        console.warn('Supabase service_request insert warning:', err);
      }
    }

    const current = getLocal('raksham_service_requests', INITIAL_SERVICE_REQUESTS);
    const updated = [newReq, ...current];
    setLocal('raksham_service_requests', updated);
    return newReq;
  },

  // ==========================================
  // 3. NON-AMC SERVICE REQUESTS
  // ==========================================
  async getNonAmcRequests() {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('non_amc_requests').select('*');
        if (!error && data && data.length > 0) {
          setLocal('raksham_non_amc_requests', data);
          return data;
        }
      } catch (err) {
        console.warn('Using local non-amc requests:', err);
      }
    }
    return getLocal('raksham_non_amc_requests', INITIAL_NON_AMC_REQUESTS);
  },

  async createNonAmcRequest(data) {
    const today = new Date();
    const dateStr = `${today.getFullYear()}${(today.getMonth() + 1).toString().padStart(2, '0')}${today.getDate().toString().padStart(2, '0')}`;
    const current = getLocal('raksham_non_amc_requests', INITIAL_NON_AMC_REQUESTS);
    const seq = (current.length + 1).toString().padStart(3, '0');
    const complaintNo = `NAC-${dateStr}-${seq}`;

    const newNonAmc = {
      id: `NAR-${Date.now().toString().slice(-4)}`,
      complaintNo,
      ticketNo: complaintNo,
      serviceType: 'NON-AMC',
      visitCharge: 800,
      status: 'Request Received',
      technician: 'Assigned Soon',
      technicianPhone: '+91 90291 14205',
      scheduledDate: new Date().toISOString().split('T')[0],
      estimateParts: null,
      estimateApproved: false,
      ...data
    };

    if (isSupabaseConfigured) {
      try {
        await supabase.from('non_amc_requests').insert([{
          complaint_no: newNonAmc.complaintNo,
          client_name: newNonAmc.name || 'Valued Customer',
          mobile: newNonAmc.mobile,
          location: newNonAmc.location,
          service_required: newNonAmc.serviceRequired || 'CCTV Inspection'
        }]);
      } catch (err) {
        console.warn('Supabase non_amc insert warning:', err);
      }
    }

    const updated = [newNonAmc, ...current];
    setLocal('raksham_non_amc_requests', updated);
    return newNonAmc;
  },

  // ==========================================
  // 4. DIGITAL SERVICE REPORTS
  // ==========================================
  async getServiceReports() {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('service_reports').select('*');
        if (!error && data && data.length > 0) {
          setLocal('raksham_service_reports', data);
          return data;
        }
      } catch (err) {
        console.warn('Using local service reports:', err);
      }
    }
    return getLocal('raksham_service_reports', INITIAL_SERVICE_REPORTS);
  },

  async createServiceReport(reportData) {
    const newRep = {
      id: `REP-${Date.now().toString().slice(-4)}`,
      reportId: `REP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString().split('T')[0],
      ...reportData
    };

    const current = getLocal('raksham_service_reports', INITIAL_SERVICE_REPORTS);
    const updated = [newRep, ...current];
    setLocal('raksham_service_reports', updated);
    return newRep;
  }
};
