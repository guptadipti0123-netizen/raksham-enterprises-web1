-- =========================================================================
-- RAKSHAM ENTERPRISES - CLOUD DATABASE SCHEMA (PostgreSQL / Supabase)
-- =========================================================================

-- 1. CUSTOMERS TABLE (Housing Societies, Offices, Commercial Clients)
CREATE TABLE IF NOT EXISTS customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_no VARCHAR(50) UNIQUE NOT NULL, -- e.g. 'ULV2601', 'CHE4819'
    name VARCHAR(255) NOT NULL,              -- e.g. 'Silver Springs Residency CHS'
    contact_person VARCHAR(255),             -- e.g. 'Ramesh Patil (Secretary)'
    contact_phone VARCHAR(50) NOT NULL,      -- e.g. '+91 9867890606'
    email VARCHAR(255),
    address TEXT,
    location VARCHAR(100) DEFAULT 'Mumbai',
    amc_status VARCHAR(50) DEFAULT 'Active', -- 'Active', 'Expired', 'Pending'
    amc_type VARCHAR(100) DEFAULT 'Comprehensive Shield AMC',
    amc_expiry DATE DEFAULT (CURRENT_DATE + INTERVAL '1 year'),
    cameras_count INTEGER DEFAULT 8,
    nvr_details VARCHAR(255) DEFAULT 'Hikvision / CP Plus NVR 16CH',
    hdds VARCHAR(255) DEFAULT '4TB Surveillance HDD',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. SERVICE REQUESTS TABLE (AMC Priority Queue)
CREATE TABLE IF NOT EXISTS service_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_no VARCHAR(50) UNIQUE NOT NULL,   -- e.g. 'AMC-20260825-412'
    customer_no VARCHAR(50) REFERENCES customers(customer_no) ON DELETE SET NULL,
    customer_name VARCHAR(255) NOT NULL,
    service_type VARCHAR(100) DEFAULT 'AMC PRIORITY',
    issue_type VARCHAR(255) NOT NULL,
    priority VARCHAR(50) DEFAULT 'High (AMC Priority Queue)',
    status VARCHAR(100) DEFAULT 'Request Received', -- 'Request Received', 'Technician Assigned', 'Visit Scheduled', 'Complaint Resolved', 'Customer Confirmation', 'Closed'
    reported_date DATE DEFAULT CURRENT_DATE,
    technician VARCHAR(255) DEFAULT 'Rakesh Toraskar',
    technician_phone VARCHAR(50) DEFAULT '+91 90291 14205',
    scheduled_visit_time VARCHAR(100) DEFAULT 'Within 4 Hours (AMC SLA)',
    visit_charge NUMERIC DEFAULT 0,
    report_ref VARCHAR(100),
    customer_confirmed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. NON-AMC PAID SERVICE REQUESTS TABLE (₹800 On-Demand Repairs)
CREATE TABLE IF NOT EXISTS non_amc_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    complaint_no VARCHAR(50) UNIQUE NOT NULL, -- e.g. 'NAC-20260825-001'
    client_name VARCHAR(255) NOT NULL,
    mobile VARCHAR(50) NOT NULL,
    location VARCHAR(100) NOT NULL,
    property_type VARCHAR(100) DEFAULT 'Residential Society',
    service_required VARCHAR(255) NOT NULL,
    visit_charge NUMERIC DEFAULT 800,
    status VARCHAR(100) DEFAULT 'Request Received', -- 'Request Received' -> 'Technician Assigned' -> 'In Progress' -> 'Estimate Sent' -> 'Completed' -> 'Closed'
    technician VARCHAR(255) DEFAULT 'Assigned Soon',
    technician_phone VARCHAR(50) DEFAULT '+91 90291 14205',
    scheduled_date DATE DEFAULT CURRENT_DATE,
    estimate_parts JSONB,                    -- e.g. [{"name": "12V 10A Power Supply", "qty": 1, "cost": 1200}]
    estimate_status VARCHAR(50) DEFAULT 'Pending', -- 'Pending', 'Approved', 'Declined'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. DIGITAL SERVICE REPORTS TABLE (Verified PDF 1 Inspection Cards)
CREATE TABLE IF NOT EXISTS service_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    report_id VARCHAR(50) UNIQUE NOT NULL,  -- e.g. 'REP-2026-0824'
    job_no VARCHAR(50) NOT NULL,            -- e.g. 'JOB-9021'
    customer_no VARCHAR(50) REFERENCES customers(customer_no) ON DELETE SET NULL,
    customer_name VARCHAR(255) NOT NULL,
    site_address TEXT NOT NULL,
    service_type VARCHAR(100) DEFAULT 'Quarterly AMC Preventive Checkup',
    visit_date DATE DEFAULT CURRENT_DATE,
    system_health VARCHAR(50) DEFAULT '100% Operational',
    technician_name VARCHAR(255) DEFAULT 'Rakesh Toraskar',
    cameras_status JSONB,                   -- Inspection breakdown for all cameras
    action_taken TEXT,
    recommendations TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. DIRECT ENQUIRIES TABLE (Website Contact & Free Survey Submissions)
CREATE TABLE IF NOT EXISTS enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    enquiry_no VARCHAR(50) UNIQUE NOT NULL, -- e.g. 'ENQ-4821'
    name VARCHAR(255) NOT NULL,
    mobile VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    location VARCHAR(100) DEFAULT 'Mumbai',
    property_type VARCHAR(100) DEFAULT 'Residential Society',
    service_required VARCHAR(255) DEFAULT 'CCTV Installation',
    message TEXT,
    status VARCHAR(50) DEFAULT 'New',       -- 'New', 'Contacted', 'Survey Scheduled', 'Closed'
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. FEEDBACKS TABLE (Client 5-Star Reviews & Ratings)
CREATE TABLE IF NOT EXISTS feedbacks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_no VARCHAR(50),
    customer_name VARCHAR(255) NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    review TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
