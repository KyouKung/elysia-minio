import { GCSStorage } from '../adapters/storage/gcs-storage'
import { MinioStorage } from '../adapters/storage/minio-storage'
import { S3Storage } from '../adapters/storage/s3-storage'
import { FileStorage } from '../core/ports/file-storage'

export function createStorageFromEnv(): FileStorage {
  const provider = Bun.env.STORAGE_DRIVER || 'minio'

  switch (provider) {
    case 'minio':
      return new MinioStorage({
        endpoint: Bun.env.MINIO_ENDPOINT!,
        port: parseInt(Bun.env.MINIO_PORT!),
        useSSL: Bun.env.MINIO_USE_SSL === 'true',
        accessKey: Bun.env.MINIO_ACCESS_KEY_ID!,
        secretKey: Bun.env.MINIO_SECRET_KEY!,
        bucket: Bun.env.MINIO_BUCKET!,
      })

    case 's3':
      return new S3Storage({
        region: Bun.env.AWS_REGION!,
        accessKeyId: Bun.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: Bun.env.AWS_SECRET_ACCESS_KEY!,
        bucket: Bun.env.AWS_S3_BUCKET!,
      })

    case 'gcs':
      return new GCSStorage({
        bucket: Bun.env.GCS_BUCKET_NAME!,
        projectId: Bun.env.GCS_PROJECT_ID!,
        credentials: {
          client_email: Bun.env.GCS_SERVICE_ACCOUNT_CLIENT_EMAIL!,
          private_key: Bun.env.GCS_SERVICE_ACCOUNT_PRIVATE_KEY!,
        },
      })

    default:
      throw new Error(`Unsupported storage provider: ${provider}`)
  }
}
