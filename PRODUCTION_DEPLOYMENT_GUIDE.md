# Raksham Enterprises - Production Deployment, Backend & Cloud Infrastructure Handbook

This comprehensive handbook provides step-by-step instructions for running, testing, and deploying the **Raksham Enterprises Web Application**, **Node.js/Express Backend API**, **AWS RDS MySQL Database (Prisma ORM)**, **AWS S3 File Storage**, **PM2 Process Manager**, **Nginx Reverse Proxy**, **SSL Encryption**, and **GoDaddy DNS Configuration**.

---

## 1. Backend Folder Structure

```
RakshamWEB/
├── server/                           # Production Node.js + Express Backend
│   ├── prisma/
│   │   ├── schema.prisma             # MySQL Schema with 13 Relational Models
│   │   └── seed.js                   # Seed script (Admin, Technicians, Silver Springs CHS)
│   ├── src/
│   │   ├── config/
│   │   │   ├── s3.js                 # AWS S3 Client & S3 Bucket Config
│   │   │   └── db.js                 # Database Configuration
│   │   ├── controllers/
│   │   │   ├── authController.js     # Admin / Tech / Customer Login & Registration
│   │   │   ├── enquiryController.js  # Website Contact & Consultation Forms
│   │   │   ├── customerController.js # Society Customer Profile Management
│   │   │   ├── serviceRequestController.js # AMC Priority & Non-AMC ₹800 Tickets
│   │   │   ├── serviceReportController.js  # Digital CCTV Inspection & PDF Generator
│   │   │   ├── equipmentController.js      # Camera & NVR Hardware Inventory
│   │   │   ├── amcController.js            # AMC Contract Lifecycle & Schedules
│   │   │   └── uploadController.js         # Secure S3 Pre-Signed Upload/Download
│   │   ├── middlewares/
│   │   │   ├── authMiddleware.js     # JWT Verification, RBAC & Customer Scope Isolation
│   │   │   ├── errorMiddleware.js    # Centralized Production Error Handler
│   │   │   └── rateLimiter.js        # DDoS & Brute-force Protection
│   │   ├── routes/
│   │   │   ├── authRoutes.js         # /api/auth
│   │   │   ├── enquiryRoutes.js      # /api/enquiries
│   │   │   ├── customerRoutes.js     # /api/customers
│   │   │   ├── serviceRequestRoutes.js # /api/service-requests
│   │   │   ├── serviceReportRoutes.js  # /api/service-reports
│   │   │   ├── equipmentRoutes.js    # /api/equipment
│   │   │   ├── amcRoutes.js          # /api/amc
│   │   │   └── uploadRoutes.js       # /api/uploads
│   │   ├── services/
│   │   │   ├── pdfService.js         # Branded PDF Service Report Generator (PDFKit)
│   │   │   ├── s3Service.js          # AWS S3 Put/Get Presigned URLs & Local Fallback
│   │   │   └── auditService.js       # Security Audit Logging
│   │   ├── app.js                    # Express App Setup (Helmet, CORS, Morgan)
│   │   └── server.js                 # Server Entrypoint with Graceful Shutdown
│   ├── package.json
│   └── .env.example
├── src/                              # Preserved React Frontend (Vite + Tailwind CSS)
│   └── services/
│       └── api.js                    # Universal API Connector with Bearer Token Injection
├── dist/                             # Compiled Frontend Production Bundle
└── vercel.json                       # Vercel SPA Routing Configuration
```

---

## 2. Complete REST API Specifications

| Method | Endpoint | Auth Required | Roles Allowed | Description |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/login` | No | Public | Universal Login (Email, Mobile, or Customer ID `ULV2601`) |
| `POST` | `/api/auth/register` | No | Public | New Customer Registration & Instant ID Generation |
| `GET` | `/api/auth/me` | Yes (JWT) | All | Get Current Authenticated Profile & Permissions |
| `POST` | `/api/enquiries` | No | Public | Submit Contact & Free Site Consultation Form |
| `GET` | `/api/enquiries` | Yes (JWT) | `ADMIN` | List all inquiries submitted on website |
| `GET` | `/api/customers` | Yes (JWT) | `ADMIN` | List all customer societies and AMC sites |
| `GET` | `/api/customers/:id` | Yes (JWT) | `ADMIN`, `CUSTOMER` | Get single customer profile (Scoped) |
| `POST` | `/api/service-requests` | No / Yes | Public / All | Create AMC Priority or Non-AMC ₹800 Complaint |
| `GET` | `/api/service-requests` | Yes (JWT) | All | List tickets (Scoped to customer if `CUSTOMER`) |
| `GET` | `/api/service-requests/track/:ticketNo` | No | Public | 8-Stage Live Complaint Tracker by Ticket Number |
| `PUT` | `/api/service-requests/:id/status` | Yes (JWT) | `ADMIN`, `TECHNICIAN` | Update ticket progress & assign technicians |
| `POST` | `/api/service-requests/:id/estimate-approve` | No / Yes | Public / All | Approve/Decline Spare Parts Quotation |
| `GET` | `/api/service-reports` | Yes (JWT) | All | List digital CCTV service reports (Scoped) |
| `GET` | `/api/service-reports/:id` | Yes (JWT) | All | Get single report with inspection breakdown |
| `POST` | `/api/service-reports` | Yes (JWT) | `ADMIN`, `TECHNICIAN` | Create report, generate PDF, upload to S3 |
| `POST` | `/api/service-reports/:id/generate-pdf`| Yes (JWT) | `ADMIN`, `TECHNICIAN` | Re-generate PDF and return fresh S3 Signed URL |
| `GET` | `/api/equipment` | Yes (JWT) | All | List CCTV camera & NVR hardware inventory |
| `GET` | `/api/amc` | Yes (JWT) | All | List CCTV AMC contracts & renewal schedules |
| `POST` | `/api/uploads/signed-url` | Yes (JWT) | All | Request AWS S3 presigned upload URL |
| `GET` | `/api/health` | No | Public | Server uptime & monitoring health check |

---

## 3. Local Development Setup Commands

### Step 1: Install Backend Dependencies
```bash
cd server
npm install
```

### Step 2: Configure Local Database `.env`
Create `server/.env`:
```env
PORT=5000
NODE_ENV=development
DATABASE_URL="mysql://root:password@localhost:3306/raksham_db"
JWT_SECRET="local_development_secret_key_2026"
JWT_EXPIRES_IN="7d"
FRONTEND_URL="http://localhost:5173"
```

### Step 3: Run Prisma Migrations & Seed
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Seed database with Admin, Technicians, Silver Springs CHS
npm run prisma:seed
```

### Step 4: Start Backend & Frontend
```bash
# Terminal 1: Start Backend (Port 5000)
npm run dev

# Terminal 2: Start Frontend (Port 5173)
cd ..
npm run dev
```

---

## 4. Production Cloud Deployment: Step-by-Step

### 🅰️ AWS RDS (Production MySQL Database)
1. In **AWS Console** ➔ **RDS** ➔ **Create database**:
   - Engine: **MySQL 8.0**
   - Templates: **Production** or **Free Tier**
   - DB instance identifier: `raksham-production-db`
   - Master username: `raksham_admin`
   - Master password: `[GENERATE_STRONG_24_CHAR_PASSWORD]`
   - Public access: **No** *(Must remain private)*
   - VPC Security Group: Create `raksham-rds-sg` allowing **Port 3306** *only* from `raksham-ec2-sg`.
   - Initial database name: `raksham_production`
   - Automated backups: **Enabled** (7-day retention).
2. Note your RDS endpoint: `raksham-production-db.c3xyz.ap-south-1.rds.amazonaws.com`.

---

### 🅱️ AWS S3 (Private File Storage for PDFs & Photos)
1. In **AWS Console** ➔ **S3** ➔ **Create bucket**:
   - Bucket name: `raksham-production-storage`
   - Region: `ap-south-1 (Mumbai)`
   - Block all public access: **Enabled** *(All files stay private)*
   - Bucket Versioning: **Enabled**
2. In **IAM** ➔ Create user `raksham-s3-api-user` with programmatic access and attach this policy:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject"
      ],
      "Resource": "arn:aws:s3:::raksham-production-storage/*"
    }
  ]
}
```
3. Copy the **Access Key ID** and **Secret Access Key** into `server/.env`.

---

### 🅲 AWS EC2 (Node.js Backend Server)
1. Launch an **Ubuntu 24.04 LTS (t3.small or t4g.small)** instance in `ap-south-1 (Mumbai)`.
2. Security Group (`raksham-ec2-sg`):
   - Inbound: Port 22 (SSH), Port 80 (HTTP), Port 443 (HTTPS).
3. Connect via SSH and run initialization:
```bash
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs nginx git
sudo npm install -g pm2
```

4. Clone and configure the backend:
```bash
git clone https://github.com/guptadipti0123-netizen/raksham-enterprises-web1.git /var/www/raksham
cd /var/www/raksham/server
npm install --production

# Create production .env
nano .env
```
Fill in the production environment variables:
```env
NODE_ENV=production
PORT=5000
DATABASE_URL="mysql://raksham_admin:YOUR_PASSWORD@raksham-production-db.c3xyz.ap-south-1.rds.amazonaws.com:3306/raksham_production"
JWT_SECRET="[GENERATE_RANDOM_64_CHAR_HEX_KEY]"
AWS_REGION="ap-south-1"
AWS_ACCESS_KEY_ID="AKIA_YOUR_KEY"
AWS_SECRET_ACCESS_KEY="YOUR_SECRET"
AWS_S3_BUCKET="raksham-production-storage"
FRONTEND_URL="https://raksham.com"
```

5. Deploy migrations & start PM2:
```bash
npx prisma migrate deploy
npm run prisma:seed
pm2 start server.js --name "raksham-api"
pm2 save
pm2 startup
```

6. Configure Nginx Reverse Proxy (`/etc/nginx/sites-available/raksham-backend`):
```nginx
server {
    server_name api.raksham.com;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        client_max_body_size 20M;
    }
}
```
Enable and reload Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/raksham-backend /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

7. Install SSL Certificate (Certbot):
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d api.raksham.com
```

---

### 🅳 Vercel Frontend Deployment
1. In **Vercel Project Settings** ➔ **Environment Variables**:
   - `VITE_API_URL`: `https://api.raksham.com/api`
2. Trigger deployment. The React frontend will communicate directly with `https://api.raksham.com/api`.

---

### 🅴 GoDaddy DNS Configuration

In your **GoDaddy DNS Management** for **`raksham.com`**, add the following records:

| Type | Name / Host | Points to / Value | TTL |
| :--- | :--- | :--- | :--- |
| **`A`** | `@` | **`76.76.21.21`** *(Vercel Frontend IP)* | 1/2 Hour |
| **`CNAME`** | `www` | **`cname.vercel-dns.com`** *(Vercel)* | 1/2 Hour |
| **`A`** | `api` | **`[YOUR_AWS_EC2_ELASTIC_IP]`** *(Backend API Server)* | 1/2 Hour |

---

## 5. Security & Backup Checklist

- [x] **Zero Plaintext Passwords:** Hashed with bcrypt (12 rounds).
- [x] **Private AWS S3:** Direct downloads blocked, accessible only via temporary pre-signed URLs (15-60 min validity).
- [x] **Customer Data Isolation:** Customer A can never query or view Customer B's records via RBAC parameters.
- [x] **DDoS & Rate Limiting:** Brute-force limits (25 login requests / 15 mins).
- [x] **AWS RDS Automated Backups:** Daily automated snapshots with 7-day retention.
- [x] **S3 Versioning:** Protects service reports against accidental deletion.
- [x] **Graceful Shutdown:** PM2 and Node.js process intercepts `SIGTERM` to prevent in-flight request termination.
