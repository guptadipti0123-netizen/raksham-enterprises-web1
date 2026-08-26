import { PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3Client, S3_BUCKET, isS3Configured } from '../config/s3.js';
import fs from 'fs';
import path from 'path';

const LOCAL_STORAGE_DIR = path.resolve('uploads');

// Ensure local storage directory exists for offline / local development
if (!fs.existsSync(LOCAL_STORAGE_DIR)) {
  fs.mkdirSync(LOCAL_STORAGE_DIR, { recursive: true });
}

export const s3Service = {
  /**
   * Upload Buffer or File to AWS S3 (with local fallback if S3 not yet configured)
   */
  async uploadFile({ buffer, key, contentType = 'application/octet-stream' }) {
    if (isS3Configured) {
      const command = new PutObjectCommand({
        Bucket: S3_BUCKET,
        Key: key,
        Body: buffer,
        ContentType: contentType
      });
      await s3Client.send(command);
      return { s3Key: key, storageType: 'S3' };
    } else {
      // Local fallback for development
      const localFilePath = path.join(LOCAL_STORAGE_DIR, key.replace(/\//g, '_'));
      fs.writeFileSync(localFilePath, buffer);
      return { s3Key: key, localPath: localFilePath, storageType: 'LOCAL' };
    }
  },

  /**
   * Generate Secure Pre-Signed Download URL (Expires in 15-60 mins)
   */
  async getSignedDownloadUrl(key, expiresInSeconds = 3600) {
    if (!key) return null;

    if (isS3Configured) {
      const command = new GetObjectCommand({
        Bucket: S3_BUCKET,
        Key: key
      });
      return await getSignedUrl(s3Client, command, { expiresIn: expiresInSeconds });
    } else {
      // Local dev URL
      return `/api/uploads/local/${encodeURIComponent(key.replace(/\//g, '_'))}`;
    }
  },

  /**
   * Generate Secure Pre-Signed Upload URL for Direct Client Uploads
   */
  async getSignedUploadUrl(key, contentType, expiresInSeconds = 900) {
    if (isS3Configured) {
      const command = new PutObjectCommand({
        Bucket: S3_BUCKET,
        Key: key,
        ContentType: contentType
      });
      return await getSignedUrl(s3Client, command, { expiresIn: expiresInSeconds });
    } else {
      return `/api/uploads/direct?key=${encodeURIComponent(key)}`;
    }
  },

  /**
   * Delete an object from S3
   */
  async deleteFile(key) {
    if (isS3Configured) {
      const command = new DeleteObjectCommand({
        Bucket: S3_BUCKET,
        Key: key
      });
      await s3Client.send(command);
    } else {
      const localFilePath = path.join(LOCAL_STORAGE_DIR, key.replace(/\//g, '_'));
      if (fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath);
      }
    }
    return true;
  }
};
