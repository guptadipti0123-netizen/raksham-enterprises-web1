import rateLimit from 'express-rate-limit';

/**
 * Standard API Rate Limiter (100 requests per 15 minutes per IP)
 */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too Many Requests',
    message: 'Rate limit exceeded. Please try again in a few minutes.'
  }
});

/**
 * Strict Auth Rate Limiter (Brute-force protection for login/register: 15 attempts / 15 mins)
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 25,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too Many Login Attempts',
    message: 'Too many authentication attempts. Please wait 15 minutes before trying again.'
  }
});
