import app from './src/app.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 RAKSHAM ENTERPRISES BACKEND API SERVER RUNNING`);
  console.log(`📡 Port: ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`====================================================`);
});

// Graceful Shutdown Handling for PM2 / Docker / EC2
const gracefulShutdown = (signal) => {
  console.log(`\n[SHUTDOWN] Received ${signal}. Closing HTTP server gracefully...`);
  server.close(() => {
    console.log('✅ HTTP server closed. Process exiting cleanly.');
    process.exit(0);
  });

  // Force exit if hanging
  setTimeout(() => {
    console.error('⚠️ Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
