import { config } from 'dotenv'
import { MinioStorage } from '../adapters/outbound/minio-storage'
import { GCSStorage } from '../adapters/outbound/gcs-storage'
import { S3Storage } from '../adapters/outbound/s3-storage'
import { FileStorage } from '../core/ports/file-storage'

config()

export class StorageFactory {
  static create(): FileStorage {
    switch (Bun.env.STORAGE_DRIVER) {
      case 's3':
        return new S3Storage()
      case 'gcs':
        return new GCSStorage()
      default:
        return new MinioStorage()
    }
  }
}
