# Raksham Enterprises - Local MySQL Database & Prisma ORM Setup Guide

This guide explains how to set up, migrate, seed, and manage the **Local MySQL Database (`raksham_db`)** for **Raksham Enterprises** using **Prisma ORM** and the **Node.js + Express Backend**.

> [!IMPORTANT]
> **Zero Cost / 100% Local Setup:**
> - No AWS RDS, no paid cloud services, and no external subscriptions are required.
> - Everything runs on your local computer (`localhost:3306`).
> - The existing Frontend UI is **100% preserved** without any alterations.

---

## 1. Relational Database Architecture (14 Models)

| Model / Table | Primary Responsibility | Key Fields & Relationships |
| :--- | :--- | :--- |
| **`users`** | Authentication & RBAC | `id`, `name`, `email`, `mobile`, `passwordHash` (bcrypt), `role` (`ADMIN`, `TECHNICIAN`, `CUSTOMER`), `status` |
| **`customers`** | Housing Societies & Clients | `id`, `customerName`, `customerNumber` (e.g. `ULV2601`, `CHEE2601`), `contactPerson`, `contactNumber`, `siteAddress`, `city`, `pincode`, `status`, `notes` |
| **`technicians`** | Field Security Engineers | `id`, `userId`, `name`, `phone`, `email`, `specialization`, `hub`, `status` |
| **`enquiries`** | Website Contact & Surveys | `id`, `enquiryNumber` (`ENQ-4821`), `name`, `mobile`, `email`, `location`, `serviceRequired`, `message`, `status` |
| **`service_requests`**| AMC & Non-AMC Complaints | `id`, `requestNumber` (`AMC-20260825-412`), `customerId`, `serviceType`, `complaint`, `priority`, `status`, `visitCharge`, `scheduledDate` |
| **`service_reports`** | CCTV Service Reports | `id`, `reportNumber` (`REP-2026-0824`), `jobNo`, `customerId`, `serviceDate`, `systemType`, `problemObserved`, `workCarriedOut`, 8-Point Inspection Checklist, Signatures |
| **`service_report_items`** | Parts / Materials Used | `id`, `serviceReportId`, `itemNumber`, `description`, `quantity`, `remarks` |
| **`service_report_photos`** | Site Inspection Photos | `id`, `serviceReportId`, `fileName`, `filePath`, `fileType`, `uploadedBy`, `caption` |
| **`equipment`** | Hardware Inventory | `id`, `customerId`, `systemType` (CCTV, DVR, NVR, Biometric, VDP, Intercom), `brand`, `model`, `serialNumber`, `quantity`, `status` |
| **`amc_contracts`** | CCTV AMC Contracts | `id`, `customerId`, `contractNumber` (`AMC-2025-081`), `planName`, `startDate`, `endDate`, `serviceFrequency`, `nextServiceDate`, `status` |
| **`amc_services`** | AMC Preventive History | `id`, `amcContractId`, `serviceReportId`, `serviceDate`, `workPerformed`, `inspectionResult`, `remarks`, `status` |
| **`notifications`** | Alerts & Updates | `id`, `userId`, `title`, `message`, `isRead`, `type`, `createdAt` |
| **`audit_logs`** | Security Audit Trail | `id`, `userId`, `action` (`ADMIN_CREATED_CUSTOMER`, etc.), `entity`, `entityId`, `description`, `ipAddress`, `timestamp` |

---

## 2. Step-by-Step Local Setup Instructions

### Step 1: Install & Start MySQL
If not already installed, download [MySQL Community Server](https://dev.mysql.com/downloads/mysql/) or use [XAMPP](https://www.apachefriends.org/):
- Ensure MySQL is running on default port **`3306`**.

### Step 2: Create the Local Database
Open **MySQL Workbench**, **DBeaver**, or MySQL Command Line and run:
```sql
CREATE DATABASE raksham_db;
```

### Step 3: Configure `server/.env`
In the `server` folder, create a file named `.env` (copied from `.env.example`):
```env
PORT=5000
NODE_ENV=development
DATABASE_URL="mysql://root:YOUR_MYSQL_PASSWORD@localhost:3306/raksham_db"
JWT_SECRET="raksham_local_development_jwt_secret_2026"
JWT_EXPIRES_IN="7d"
FRONTEND_URL="http://localhost:5173"
LOCAL_UPLOAD_DIR="./uploads"
```
*(Replace `YOUR_MYSQL_PASSWORD` with your local MySQL root password)*

### Step 4: Install Dependencies & Generate Prisma Client
```bash
cd server
npm install
npx prisma generate
```

### Step 5: Run Database Migrations
Run the initial migration to create all 14 tables in your local MySQL database:
```bash
npx prisma migrate dev --name init
```

### Step 6: Seed Dummy Development Data
Populate realistic development records (Admin, Technician, Silver Springs Society, Service Reports, Equipment, and AMC contract):
```bash
npm run prisma:seed
```

---

## 3. How to View & Manage Database Visually (Prisma Studio)

Prisma includes an interactive web spreadsheet UI:
```bash
cd server
npx prisma studio
```
This will open your browser at **`http://localhost:5555`**:
- View all 14 tables.
- Filter, search, add, edit, or delete records visually with zero SQL required!

---

## 4. Test Development Accounts & Credentials

| Role | Name | Email / Identifier | Password | Access Level |
| :--- | :--- | :--- | :--- | :--- |
| **ADMIN** | Operations Admin | `admin@raksham.com` | `admin123` | Full Operations Desk (`/admin/dashboard`) |
| **TECHNICIAN** | Rakesh Toraskar | `tech@raksham.com` | `tech123` | Assigned Tickets & Service Reports |
| **CUSTOMER** | Silver Springs CHS | `ULV2601` or `contact@silversprings.com` | `customer123` | Customer Society Dashboard (`/customer/dashboard`) |

---

## 5. Running the Complete Application Locally

```bash
# Terminal 1: Start Backend API (Port 5000)
cd server
npm run dev

# Terminal 2: Start Frontend UI (Port 5173)
npm run dev
```

- **Frontend Website:** `http://localhost:5173`
- **Backend API Health Check:** `http://localhost:5000/api/health`
- **Prisma Visual Studio:** `http://localhost:5555`
