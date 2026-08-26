import { PrismaClient } from '@prisma/client';

let prismaInstance = null;

const getPrisma = () => {
  if (!prismaInstance) {
    prismaInstance = new PrismaClient();
  }
  return prismaInstance;
};

export const auditService = {
  async log({ userId, action, resource, ipAddress, userAgent }) {
    try {
      const prisma = getPrisma();
      await prisma.auditLog.create({
        data: {
          userId: userId || null,
          action,
          resource,
          ipAddress: ipAddress || '127.0.0.1',
          userAgent: userAgent || 'Unknown'
        }
      });
    } catch (err) {
      console.warn('Audit log write warning:', err.message);
    }
  }
};
