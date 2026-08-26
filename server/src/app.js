import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Import Routes
import authRoutes from './routes/authRoutes.js';
import enquiryRoutes from './routes/enquiryRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import serviceRequestRoutes from './routes/serviceRequestRoutes.js';
import serviceReportRoutes from './routes/serviceReportRoutes.js';
import equipmentRoutes from './routes/equipmentRoutes.js';
import amcRoutes from './routes/amcRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

// Import Middlewares
import { errorHandler, notFoundHandler } from './middlewares/errorMiddleware.js';
import { apiLimiter } from './middlewares/rateLimiter.js';

dotenv.config();

const app = express();

// 1. Security & Header Middlewares
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'http://localhost:3000',
  'https://raksham-enterprises-web1.vercel.app',
  'https://raksham.com',
  'https://www.raksham.com'
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, server-to-server)
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 2. Request Parsing & Logging
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// 3. Health Check (for AWS EC2 / Nginx Monitoring)
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Raksham Enterprises REST API',
    environment: process.env.NODE_ENV || 'development'
  });
});

// 4. API Routes Mounting
app.use('/api/auth', authRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/service-requests', serviceRequestRoutes);
app.use('/api/service-reports', serviceReportRoutes);
app.use('/api/equipment', equipmentRoutes);
app.use('/api/amc', amcRoutes);
app.use('/api/uploads', uploadRoutes);

// 5. 404 & Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
