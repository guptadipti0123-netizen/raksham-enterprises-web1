import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();

let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({
    log: ['error', 'warn']
  });
} else {
  // Prevent multiple instances in development / hot reload
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error']
    });
  }
  prisma = global.prisma;
}

/**
 * Test & verify database connectivity
 */
export async function connectDB() {
  try {
    await prisma.$connect();
    console.log('✅ MySQL Database Connected Successfully via Prisma ORM');
    return true;
  } catch (error) {
    console.error('❌ Database Connection Failed:');
    console.error(`   Error Message: ${error.message}`);
    console.error('   Please verify that:');
    console.error('   1. MySQL Server is running locally (Port 3306)');
    console.error('   2. Database "raksham_db" exists (`CREATE DATABASE raksham_db;`)');
    console.error('   3. DATABASE_URL in server/.env is correctly configured');
    return false;
  }
}

export default prisma;
export { prisma };
