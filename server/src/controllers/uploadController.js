import { s3Service } from '../services/s3Service.js';
import path from 'path';
import fs from 'fs';

export const uploadController = {
  /**
   * Request a Pre-signed S3 Upload URL for Direct Secure Client Uploads
   * POST /api/uploads/signed-url
   */
  async getSignedUploadUrl(req, res) {
    try {
      const { folder = 'service-photos', fileName, contentType = 'image/jpeg' } = req.body;

      if (!fileName) {
        return res.status(400).json({ success: false, error: 'fileName is required' });
      }

      const timestamp = Date.now();
      const sanitizedName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
      const key = `raksham/${folder}/${timestamp}_${sanitizedName}`;

      const uploadUrl = await s3Service.getSignedUploadUrl(key, contentType, 900); // 15 mins

      return res.json({
        success: true,
        uploadUrl,
        s3Key: key
      });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  },

  /**
   * Serve Local Fallback Storage File in Development
   * GET /api/uploads/local/:filename
   */
  async serveLocalFile(req, res) {
    try {
      const { filename } = req.params;
      const safeFilename = path.basename(filename);
      const filePath = path.resolve('uploads', safeFilename);

      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ success: false, error: 'File not found' });
      }

      if (safeFilename.endsWith('.pdf')) {
        res.setHeader('Content-Type', 'application/pdf');
      } else if (safeFilename.endsWith('.png')) {
        res.setHeader('Content-Type', 'image/png');
      } else {
        res.setHeader('Content-Type', 'image/jpeg');
      }

      return res.sendFile(filePath);
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }
};
