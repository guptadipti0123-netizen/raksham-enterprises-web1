import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'raksham-super-secret-jwt-key-2026-production';

/**
 * Verify JWT Bearer Token Middleware
 */
export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
        message: 'Authentication token missing or invalid format'
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    // Fetch user and attached customer/technician profiles
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: {
        customer: true,
        technician: true
      }
    });

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
        message: 'User account is inactive or not found'
      });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: 'Invalid Token',
      message: err.name === 'TokenExpiredError' ? 'Token expired. Please login again.' : 'Invalid token signature'
    });
  }
};

/**
 * Role-Based Access Control (RBAC) Middleware
 * @param {Array<string>} allowedRoles e.g. ['ADMIN', 'TECHNICIAN']
 */
export const requireRoles = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: 'Forbidden',
        message: `Access denied. Requires one of roles: ${allowedRoles.join(', ')}`
      });
    }

    next();
  };
};

/**
 * Customer Isolation Guard Middleware
 * Ensures Customer A can NEVER access Customer B's records
 */
export const verifyCustomerOwnership = (paramKey = 'customerId') => {
  return (req, res, next) => {
    if (req.user.role === 'ADMIN' || req.user.role === 'TECHNICIAN') {
      return next(); // Admins and Technicians have authorized access
    }

    const requestedCustomerId = req.params[paramKey] || req.body.customerId || req.query.customerId;
    const userCustomerId = req.user.customer?.id;

    if (!userCustomerId || (requestedCustomerId && requestedCustomerId !== userCustomerId)) {
      return res.status(403).json({
        success: false,
        error: 'Access Denied',
        message: 'You are not authorized to view or modify records belonging to other customers.'
      });
    }

    next();
  };
};
