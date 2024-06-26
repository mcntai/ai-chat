import { registerAs } from '@nestjs/config';

export default registerAs('minio', () => ({
  bucket:    process.env.MINIO_BUCKET,
  host:      process.env.MINIO_HOST,
  port:      process.env.MINIO_PORT,
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
}));