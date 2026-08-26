// Frontend API Integration Layer for Raksham Enterprises Node.js / Express Backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Universal Fetch Wrapper with Bearer Token Injection & Error Handling
 */
async function request(endpoint, options = {}) {
  const token = localStorage.getItem('raksham_jwt_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.error || 'Server error');
    }

    return data;
  } catch (err) {
    console.warn(`[API ERROR] ${endpoint}:`, err.message);
    throw err;
  }
}

// 1. Auth API
export const authApi = {
  login: (credentials) => request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  register: (userData) => request('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
  getMe: () => request('/auth/me')
};

// 2. Enquiry API
export const enquiryApi = {
  create: (enquiryData) => request('/enquiries', { method: 'POST', body: JSON.stringify(enquiryData) }),
  getAll: () => request('/enquiries')
};

// 3. Service Requests & Complaints API
export const serviceRequestApi = {
  getAll: () => request('/service-requests'),
  create: (reqData) => request('/service-requests', { method: 'POST', body: JSON.stringify(reqData) }),
  track: (ticketNo) => request(`/service-requests/track/${ticketNo}`),
  updateStatus: (id, statusData) => request(`/service-requests/${id}/status`, { method: 'PUT', body: JSON.stringify(statusData) }),
  approveEstimate: (id, approved = true) => request(`/service-requests/${id}/estimate-approve`, { method: 'POST', body: JSON.stringify({ approved }) })
};

// 4. CCTV Service Reports & PDF API
export const serviceReportApi = {
  getAll: () => request('/service-reports'),
  getById: (id) => request(`/service-reports/${id}`),
  create: (reportData) => request('/service-reports', { method: 'POST', body: JSON.stringify(reportData) }),
  generatePdf: (id) => request(`/service-reports/${id}/generate-pdf`, { method: 'POST' })
};

// 5. Equipment Inventory API
export const equipmentApi = {
  getAll: () => request('/equipment'),
  create: (equipmentData) => request('/equipment', { method: 'POST', body: JSON.stringify(equipmentData) })
};

// 6. CCTV AMC Contracts API
export const amcApi = {
  getAll: () => request('/amc'),
  create: (amcData) => request('/amc', { method: 'POST', body: JSON.stringify(amcData) }),
  update: (id, updateData) => request(`/amc/${id}`, { method: 'PUT', body: JSON.stringify(updateData) })
};
