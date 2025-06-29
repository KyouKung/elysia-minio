import { Client } from 'minio'
import type { FileStorage, UploadedFile } from '../../core/ports/file-storage'
import { generateRandomFromDateTime } from '../../libs/utils/generate-random-from-date-time'

export class MinioStorage implements FileStorage {
  private client: Client

  private bucket: string

  constructor(config: {
    endpoint: string
    port: number
    useSSL: boolean
    accessKey: string
    secretKey: string
    bucket: string
  }) {
    this.client = new Client({
      endPoint: config.endpoint,
      port: config.port,
      useSSL: config.useSSL,
      accessKey: config.accessKey,
      secretKey: config.secretKey,
    })

    this.bucket = config.bucket
  }

  async uploadOne(
    file: File,
    organizationId: string,
    subFolder?: string,
  ): Promise<UploadedFile> {
    const subFolderName = subFolder || 'uploads'
    const newFileName = generateRandomFromDateTime()
    const buffer = Buffer.from(await file.arrayBuffer())
    const filePath = `${organizationId}/${subFolderName}/${newFileName}`

    await this.client.putObject(this.bucket, filePath, buffer, buffer.length, {
      'Content-Type': file.type,
    })

    const url = await this.client.presignedGetObject(
      this.bucket,
      filePath,
      3600,
    ) // 1 hour expiration

    return {
      originalName: file.name,
      fileUrl: url,
      fileType: file.type,
      filePath: filePath,
    }
  }

  async uploadMany(
    files: File[],
    organizationId: string,
    subFolder?: string,
  ): Promise<UploadedFile[]> {
    return Promise.all(
      files.map((file) => this.uploadOne(file, organizationId, subFolder)),
    )
  }

  async getPresignedUrl(filePath: string, expiration: number): Promise<string> {
    const url = await this.client.presignedGetObject(
      this.bucket,
      filePath,
      expiration,
    )
    return url
  }
}
