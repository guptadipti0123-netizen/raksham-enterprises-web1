import { S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
dotenv.config();

const region = process.env.AWS_REGION || 'ap-south-1'; // Default Mumbai Region
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

export const isS3Configured = Boolean(accessKeyId && secretAccessKey && process.env.AWS_S3_BUCKET);

export const s3Client = new S3Client({
  region,
  credentials: isS3Configured
    ? {
        accessKeyId,
        secretAccessKey
      }
    : undefined
});

export const S3_BUCKET = process.env.AWS_S3_BUCKET || 'raksham-production-storage';
