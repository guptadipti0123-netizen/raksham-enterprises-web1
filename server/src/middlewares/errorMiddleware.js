/**
 * Production Centralized Error Middleware
 * Masks internal stack traces in production to prevent security leaks
 */
export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  const isProduction = process.env.NODE_ENV === 'production';

  console.error(`[ERROR] ${req.method} ${req.originalUrl}:`, err.message);

  res.status(statusCode).json({
    success: false,
    error: err.name || 'Internal Server Error',
    message: err.message || 'An unexpected error occurred. Please contact support.',
    ...(isProduction ? {} : { stack: err.stack })
  });
};

/**
 * 404 Route Not Found Middleware
 */
export const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Not Found',
    message: `API Route ${req.method} ${req.originalUrl} does not exist on this server.`
  });
};
